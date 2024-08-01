# Contacts-JXA
This is a simple automation script that runs in the MacOS script editor. It will read your Apple contacts and create a text file on the desktop that lists these contacts in alphabetical order based on a contact's first name.

# Setting Up
The MacOS Script Editor is used here to run this script. The Script Editor app is located in the /Applications/Utilities folder and comes built-in on MacOS. To get this code to run on your mac, you will first need to open the Script Editor app on your mac and then copy this code into a new blank script window that you create. Unfortunately, the Script Editor can't open plain javascript or text files. So you can't just download the contacts-jxa.js file here and try to open it in the editor directly. You will have to create a new script file in the editor and paste the code here into that editor window.  Annoying, but it's the easiest way to do this.

For this situation, open the Script Editor first and select File>New to create a new script. Copy the raw text from the contacts-jxa.js file and paste it into that script editor window manually. Now you can save and run this code in your script editor. Make sure that you select "JavaScript" and not "AppleScript" for the script type, as shown below (AppleScript is the default).

![image](https://github.com/jsscribe1/Contacts-JXA/assets/81885417/c7a36edb-2c7d-4500-a977-3261240c1658)

# Running the App
After pasting the contacts-jxa.js code into the Script Editor window for the first time, read through the code and make sure you understand what it does.  The script simply reads your Apple contacts and lists them on a text file. To run the script, click on the Run icon (triangle) at the top right corner of the Script Editor.

When running the script for the first time, you will be prompted to let the script have access to your Apple contacts. You may see prompts (shown below). Click OK as needed to allow the script to access your contacts. Depending on how many contacts you have, it may take 30 seconds or more for the script to read your contact list and write the list to the text file which will appear on your desktop. When finished, the result pane below the editor should say "script has been run" and a file should appear on the desktop called contacts-list.txt.  If you make any changes to the script, click on the Compile icon (hammer) near the Run icon before attempting to run the script again (this will prevent a compile error).

![script-warn1](https://github.com/jsscribe1/Contacts-JXA/assets/81885417/1033a218-3453-4a35-b0f3-dfa42c239493)
![script-warn2](https://github.com/jsscribe1/Contacts-JXA/assets/81885417/98ba55cb-348a-4c21-a1b9-6ed7a6b9d3a2)
![script-warn3](https://github.com/jsscribe1/Contacts-JXA/assets/81885417/af49b54a-cb44-49c0-99b9-114598f2fbf5)


# Things to keep in mind
The Apple Script Editor has a few quirks.  First, the Script Editor only fully compiles code after you make some change to a script, or if you click the compile button before clicking the run button.  If you click the run button for the same script a second time without making any changes, you will see an error that tells you that you can't duplicate your variable names. If you don't make changes, you have to compile (e.g., click compile) the script each time before running it.

Second, even when the script runs properly, it is extremely slow for some reason. As mentioned before, the above script may take more than a minute to run when there are a lot of contacts, or if your mac is older. Considering that all the resources for the script are local (not over a network), I can't say why this is.

Third, if the Apple Script Editor encounters an error while running a script, it may not alert you properly or exit gracefully. You may have to force-quit the app, or in some cases reboot your mac in order for the Script Editor app to work properly again. You can of course manually try to kill the processes and close the open file-handles that the app is using, but mostly it's just easier to reboot (as bad as that sounds). 

Fourth, The Apple Script Editor is not a good tool for doing complex JavaScript development.  There is no built-in debugging, and though you can connect your script to Safari's Web Inspector, it shows you only basic debug info and you have to be careful about stepping into certain native JavaScript functions (the debugger may hang up).

Lastly, the JavaScript for OSX Automation platform is not well supported or even well documented by Apple. There also isn't a lot of good documentation by people outside of Apple on the web.  Consequently, finding code examples is difficult, and creating your own new code requires a lot of experimentation.

All in all, the JXA platform and the Script Editor quirks make serious development tedious.  But for simple scripts and simple tasks, it's good enough. 


