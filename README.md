
# OctoPi UI

A UI to display information about your 3d prints on stream/video overlays

## Prerequisites

To get started, you'll need a few softwares, and some information about your Pi

 - [Octoprint](https://octoprint.org/download/) installed on a Raspberry Pi
 - [DisplayLayerProgress Plugin](https://plugins.octoprint.org/plugins/DisplayLayerProgress/) for OctoPrint
 - The IP address of the Pi on your local network (remote should work, but hasn't been tested)
 - [NPM](https://www.npmjs.com/get-npm)


## Installing

**Step 1:**
You can either clone the repository, or download a ZIP and extract to any directory


**Step 2:**
Navigate to the directory you extracted/cloned to in Terminal/CMD/Powershell and install the packages with 
`npm install`

**Step 3:**
Once the packages are installed, create a file named `.env` in the root directory and either copy the content from `.env.sample` or below and replace the values as needed:

    # Create a file named '.env' and copy the contents of this file over and replace with the proper values
    REACT_APP_API_KEY="AC503FG3PL2MFZL004LS"      # Replace with your octoprint API key (http://docs.octoprint.org/en/master/api/general.html) for more info
    REACT_APP_OCTO_URL="http://192.168.1.43:5000"      # Replace with your octoprint's IP (When you boot the pi with a monitor attached, it'll show it's IP)
    REACT_APP_FOREGROUND_COLOR="#f7bf4a"          # Border, progress bar, and header color
    REACT_APP_BACKGROUND_COLOR="#141517"          # Background color

You'll need to know the API key and IP address the Raspberry Pi is running Octoprint on and replace the values on line 2 and 3.

**Step 4:**
Cross your fingers and see if everything worked by running `npm run start` in the terminal. If a window pops up and is stuck saying 'Loading...' something went wrong. Submit an issue and we'll figure it out together (error handling is planned in the future)

## Changing Model Preview & Sizes, Filament Type
For now, changing models, preview sizes, and filament type requires editing source files. You can change them at the following locations:

 - Model STL Preview - Upload the STL file to `/public/models/` and change the file name in `\src\components\STLViewer.tsx` on line 11
 - Two lower preview boxes  - `\src\components\PreviewBar.tsx` file on lines 8 & 9. 
 - Filament Type - Changed in `\src\components\StatBox.tsx` on line 107

Saving after changes should automatically refresh the display on stream/browser, but you may need to manually refresh.

## Something not working?
This project is still in the early stages, so some error reporting and such is missing. If you run into any issues, get in touch and we can figure it out!

**'Loading...' the only thing you're seeing?**
If you're only seeing the loading screen, chances are the app is unable to contact the Octoprint server. Double check the IP address is correct (test in browser) and make sure the port is included similarly to the example env file. Default port is usually 5000.
