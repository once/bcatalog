ProductCatalogue App Template

Installation
=================================================

Prerequisites
------------------------------------------------
1. Install node.js if not installed
2. Install NPM
3. Install Cordova CLI (if you're not going to use Phonegap Build)
4. Install Android SDK (if you're going to locally build for Android)
5. You'll need MacOS with X-code if you're going to use Cordova CLI to locally build for iOS (alternatively, you may use Phonegap Build)
6. Application uses Framework7 Mobile UI Framework, but you won't need download it separately, it's included in the bundle.


Installing app template
-------------------------------------------------
1. Unzip the archive to a work folder
2. Go to work folder and execute in console:  npm install
(this will fetch all required dependencies to /node_modules)


Starting application in web-browser (for development/debugging/testing):
-------------------------------------------------
1. Go to root of work folder (where files gulpfile.js and package.json are) and run in console:

gulp serve

App is built to /debug folder, a local server is started and it serves an app to your browser. Then, if you make any changes to files in /src,  gulp-browser-sync automatically rebuilds everything and you see changes in browser immediately.

In your browser choose mobile view. For example in Google Chrome do it according to this: https://developers.google.com/web/tools/chrome-devtools/device-mode/



Developing/Configuring on top of template
=================================================

Most of configuration of app goes from:
www/js/config/constants.js  - see comments inside for details
www/js/modules/navigation/leftnav.js - Left side-menu with main navigation
www/js/modules/navigation/sections.js - Sections configuration

Application is deisgned to fetch it's data from server in JSON format.
A bunch of demo-data is included out-of-the-box with this template  (in www/js/services/demodata/).
You should implement your server logic, responding with the same format of data, then in 
www/js/services/serverapi.js:

1. Remove 
  "request = require('services/request_demo');
(it returns only demo-data)

2. Uncomment: 
        //request = require('services/request'); 
(it will fetch data from your server)

3. Dont' forget to set URI-path to your sever API in www/js/config/constants.js:

Warning! Application uses Framework7 Mobile UI Framework. It's included in this package, so you won't need download it separately. But take note, that the app uses customized version of Framework 7 (see, in index.html file there is a script link to customized version of framework). So, if you'll want to update framework , check, maybe you'll need to apply the same customization.


Building application for publishing
=================================================
1. Prepare CONFIG.XML
Edit build configuration of your project in file /src/config.xml  according to this documentation: https://cordova.apache.org/docs/en/latest/config_ref/index.html
Note, that settings, already included in config.xml are required for proper functioning of all features, included in this app template. If you modify or delete something, you MUST UNDERSTAND, WHAT YOU ARE DOING!

2. Prepare resources.
All resources in src/res, that come out-of-the-box with this app template, are for demo-use only, so you'll need to provide your own resources  with proper dimensions.
Place them in src/res

3. Go to root of work folder (where files gulpfile.js and package.json are) and run in console:

gulp build

App is built to /build folder. This build will be a source for Cordova platform-specific build. 
You build it according to this instruction: https://cordova.apache.org/docs/en/latest/guide/cli/index.html


