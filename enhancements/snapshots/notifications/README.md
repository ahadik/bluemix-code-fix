#Snapshot Notifications
##Receive feedback for Snapshot creation

###Assets
Visual assets can be found in the `/process` folder. These assets include visual comps and short videos demonstrating interaction.

Source code is found in the `/src` directory. Gulp is used to compile the source code into public facing code.

###Use
This notifications prototype is presented as Chrome plugin that layers this improved functionality directly on top of Public Bluemix. Included in this repository is the Chrome Extension Package for the most recent build of the plugin. This is the `notifications.crx` plugin located in the `enhancements/snapshots/` directory.

You can install this packaged extension in Google Chrome by going to `Preferences > Extensions` in Chrome, and then dragging and dropping the `notifications.crx` file onto the Extensions page. This will create a small icon in your URL bar that looks like a puzzle piece. The extension has permissions to operate on the Block Storage page of Bluemix only. It will run automatically.

###Modifying
You may be interested in the source code, to make modifications, or to see how styling or front-end logic was implemented. The source code can all be found in the `src/` directory. However, if you wish to run a modified version of the plugin on your own browser, some installation and configuration is requred.

###Source Code
All code to be modified is contained in the `src/` directory. This code is them compiled into the `public` directory. You should _never_ modify code found in the `public/` directory. All changes should be made to files in the `src/` directory and then compiled to `public/`. The following section details how to do this.

###Installing and Compiling
Code is compiled using [Node Package Manager (NPM)](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/). NPM must be installed first. Instructions for installing NPM can be found here: [How to Install NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm "How to Install NPM")

With NPM installed, the remainder of the depencies can be installed with NPM using the command `npm install`. This will take a few minutes.

After NPM installation has completed, run the `gulp` command to compile the source code from `/src` to `/public`. If the `gulp` command is not found, install it using the command `npm install -g gulp`. This installs it globally.

The `gulp` command compiles all code from `src/` to the `public/` directory. If you want to load your modifications into Chrome, you can "Load an Unpacked Extension". This will draw from the `public/` folder. If you leave Gulp running, it will watch for changes in any file and immediately compile them into the `public/` folder at save time. The `public/` folder will not be present until Gulp is run at least once.

###Making Modifications
The notification extension is built entirely from CSS and JS injection. The Chrome Extension injects compiled CSS/JS into the live Bluemix page, enabling the notifications feature. If you want to make changes to the Notifications, you can modify either the JS or CSS source from the `src/` directory. Take note that the source CSS is written in SASS and compiled at save time into CSS by Gulp. Here's a list of files you might want to take note of:

* `src/sass/`: All SASS files for styling the notifications.
	* `src/sass/objects/` : Discrete objects for notifications. In this case, this is just the notification itself. Most all styling changes can and should be made in `src/sass/objects/_notifications.scss`.
	* `src/sass/views/_notification_frame.scss` : The wrapper for the notifications.
* `src/js/content_script.js` : All logic for the notifications. Injection of DOM elements is handled here as well.

###Loading Modifications
Once you've made modifications in the `src/` files, you must make sure they have been compiled into `public/`. Once again, this is handled with Gulp. So long as Gulp is running in a shell, any changes you make will be compiled. Check your terminal often to see that your changes are being compiled without error.

You can "Load an Unpacked Extension" in Chrome from the Preferences > Extensions tab. At the top of the page, select "Load unpacked extensions". Select the `notifications/` directory to load. This will create a new Extension in your Chrome extension list. If you make further modifications after you've loaded the extension once, take care to select "Reload (⌘R)" from the Extensions tab. This reloads changes from the `public/` directory.