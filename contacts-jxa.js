 /** List-Contacts-JXA
 *
 * Simple script that reads the information in Apple Contacts and
 * creates a text file list on the desktop.
 * The contacts are sorted aphabetically by name and
 * the following info for each contact is included, if available:
 *
 * 1) contact name first, and if available, last
 * 2) contact organization
 * 3) phone numbers
 * 4) email addresss
 * 5) physical address
 * 6) notes
 *
 * Running this script creates a file called contact-list.txt on the desktop that
 * lists each contact and contact info. This script only reads the contact info and
 * does not modify it in any way.  However, care should be taken when
 * running any script. Please understand the code before running the script.
 *
 * @author jsscribe.com
 * @licnese MIT
 */

"use strict";

// create reference to Contacts application
let contactsApp = Application("Contacts");

// create reference to Script Editor application
let scriptEditorApp = Application.currentApplication();
scriptEditorApp.includeStandardAdditions = true;

// create reference to file "contact-list.txt" on the desktop
let desktopLocation = scriptEditorApp.pathTo("desktop").toString();
let desktopFile = `${desktopLocation}/contact-list.txt`;

// create a regex variable for use later in removing unnecesary characters "_$!<" and ">!$_" from a string later
let regexp = /_\$!<|>!\$_/g;

// get object specifier for ALL the people in contacts
let objSpecPeople = contactsApp.people;

// length property works to show number of items in array of specifiers
// as well as in normal JavaScript arrays
let numOfContacts = objSpecPeople.length;

// get JS array of people names (first + last) from the ArraySpecifier
// by invoking the name property on the specifier
let jsArrayOfNames = objSpecPeople.name();


// sort JS array ignoring upper or lower case
jsArrayOfNames.sort(function(a, b) {
	try{
		let nameA = a.toUpperCase(); 
		let nameB = b.toUpperCase(); 
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names are equal
		return 0;
	}catch(err){
		console.log(err);
	}
});

// create a string containing the info for a contact from an array index
function createContactString(contactNumber){
	try{
		// check that a name exists at this index (should always be true)
		if (jsArrayOfNames[contactNumber]){
			
			// get an object specifier for a person with a name value at this index
			let objSpecPerson = objSpecPeople.byName(jsArrayOfNames[contactNumber]);
			
			let strInfo = `${objSpecPerson.name()}  (${contactNumber + 1})` + "\n";
			
			// organization info only appears if it exists
			if (objSpecPerson.organization()) {strInfo += "Company:\n\t" + objSpecPerson.organization() + "\n";}

			let aPhones = objSpecPerson.phones();
			strInfo += "Phones:\n";
			aPhones.forEach(function(sPhone){
				strInfo += "\t" + `${sPhone.label()}: ${sPhone.value()}` + "\n";
			});

			let aEmails = objSpecPerson.emails();
			strInfo += "Emails:\n"; 
			aEmails.forEach(function(sEmailAddress){
				strInfo += "\t" + `${sEmailAddress.label()}: ${sEmailAddress.value()}` + "\n" ;
			});

			let aAddresses = objSpecPerson.addresses();
			strInfo += "Addresses:\n";
			aAddresses.forEach(function(sLocation){//forEach WILL NOT work on arraySpecs, only Arrays!
				strInfo += "\t" + `${sLocation.label()}: ${sLocation.street()}, ${sLocation.city()}, ${sLocation.state()}, ${sLocation.zip()}` + "\n";
			});

			// note info only appears if it exists
			if (objSpecPerson.note()) {strInfo += "Notes:\n\t" + `${objSpecPerson.note()}`;}

			// separator between each contact
			strInfo += "\n\n-----------------------------------------------------\n\n\n";

			// remove characters that don't render properly in the contact string.
			// replaceAll() function effectively removes these characters "_$!<"
			strInfo = strInfo.replaceAll(regexp, "");

			// return the newly created string
			return strInfo;
        } else {
			// return an error string (this should never happen)
			let strError = "\n\n Info not available for " + `(${contactNumber + 1})` + "\n\n-------------\n\n";
			return strError;
		}
	}catch(err){
		console.log(err);
	}
}

// open a file I/O reference for writing to a file
function openFileAccess(filename){
	try{
		let openedFileRef = scriptEditorApp.openForAccess(Path(filename), { writePermission: true });
	    return openedFileRef;
	}catch(err){
		let ans = scriptEditorApp.displayDialog(
		"There is an error in trying to create the file on the desktop.\n" +
		"Make sure that you gave the script permission to run earlier.\n" + 
		"You may have to start over and copy/paste to a new script.\n" +
		"Click OK to exit the Script Editor and try it again."
		 );
		if(ans.buttonReturned === "OK"){
		// quit the Script Editor (which should close all open file refferences)
		scriptEditorApp.quit(); 
		}
	}
}
// write contact info for all contacts one after another to desktop file "contact-list.txt"
function writeToFile(file){
    try{ 
		// open I/O access to a desktop file
		let openedFile = openFileAccess(file);

		// loop over JS Array of Contacts, create a string, and write it to the desktop file
		for(let i = 0;i<numOfContacts;i++){
			// get string for contact
			let str = createContactString(i);

			// get the current EOF location
			let locEOF = scriptEditorApp.getEof(openedFile);

			// write to the file at the EOF		
			scriptEditorApp.write(str, { to: openedFile, startingAt: locEOF });
		} 

	// close the file I/O reference after all contact strings have been writen to the file
	scriptEditorApp.closeAccess(openedFile);

	}catch(err){
		try {
			// try to close the file
			scriptEditorApp.closeAccess(openedFile);
		}catch{
			console.log(err);
		}
	}
// this message should appear on the Script Editor console pane
// below the editing pane
return "script has been run";
} 

// execution of script begins here
writeToFile(desktopFile);


