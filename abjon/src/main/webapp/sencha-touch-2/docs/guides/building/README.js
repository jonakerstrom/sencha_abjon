Ext.data.JsonP.building({"title":"Using and Creating Builds","guide":"<h1>Using and Creating Builds</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/building-section-1'>Choosing a Build</a></li>\n<li><a href='#!/guide/building-section-2'>Creating your own Build</a></li>\n</ol>\n</div>\n\n<p>Sencha Touch 2 comes with a brand new class system that features an ability to dynamically load classes when they are needed. This has many benefits in both development and production.</p>\n\n<p>In development, dynamic loading means you get a file-by-file stack trace, which makes it much easier to debug problems with your application. For production, we provide a build tool that enables you to easily create a minified custom build that only includes the classes your app actually uses, meaning loading times are often reduced for your users.</p>\n\n<h2 id='building-section-1'>Choosing a Build</h2>\n\n<p>Sencha Touch 2 ships with 5 builds out of the box. If you just want to get up and running as quickly as possible it's best to simply use sencha-touch-debug.js while developing your app locally then switch to sencha-touch.js in production. The other three builds are good for debugging in production, running in production without a custom build, and migrating your 1.x app to 2.x.</p>\n\n<p>Because each build is good for a different purpose an created using a different set of build options we've created a simple table below that shows how each one is configured:</p>\n\n\n\n\n\n<table class=\"info\">\n    <tr>\n        <th>Name</th>\n        <th>Type</th>\n        <th>Loader</th>\n        <th>Minified</th>\n        <th>Comments</th>\n        <th>Debug</th>\n        <th>Compat</th>\n        <th>Usage</th>\n    </tr>\n    <tr>\n        <th>sencha-touch-debug.js</th>\n        <td>Core</td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td></td>\n        <td>Use when developing your app locally</td>\n    </tr>\n    <tr>\n        <th>sencha-touch.js</th>\n        <td>Core</td>\n        <td></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td></td>\n        <td></td>\n        <td></td>\n        <td>Use in production with a custom build</td>\n    </tr>\n    <tr>\n        <th>builds/sencha-touch-all.js</th>\n        <td>All</td>\n        <td></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td></td>\n        <td></td>\n        <td></td>\n        <td>Use in production if you don't have a custom build</td>\n    </tr>\n    <tr>\n        <th>builds/sencha-touch-all-debug.js</th>\n        <td>All</td>\n        <td></td>\n        <td></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td></td>\n        <td>Use to debug your app in staging/production</td>\n    </tr>\n    <tr>\n        <th>builds/sencha-touch-all-compat.js</th>\n        <td>All</td>\n        <td></td>\n        <td></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td><p class='screenshot'><img src='guides/building/tick.png' alt=''><span></span></p></td>\n        <td>Use to migrate your 1.x app to 2.x</td>\n    </tr>\n</table>\n\n\n<p>Note that the last 3 builds are contained within the 'builds' directory in the SDK download. If the table above is not self-explanatory, here's a little more detail on what each option means:</p>\n\n<ul>\n    <li><strong>Type</strong>: either \"Core\" or \"All\" - Core includes the base classes but none of the Components, All means everything is included</li>\n    <li><strong>Loader</strong>: whether dynamic loading is activated or not. Only sencha-touch-debug.js has this activated by default</li>\n    <li><strong>Minified</strong>: means the build has been compressed with YUI compressor</li>\n    <li><strong>Comments</strong>: means the build still contains the JSDoc comments (these are usually stripped in production to speed up downloads)</li>\n    <li><strong>Debug</strong>: means that the build will give you debug messages such as telling you if you have misconfigured a class</li>\n    <li><strong>Compat</strong>: means that code to provide backwards compatibility with Sencha Touch 1.x is present in the build</li>\n</ul>\n\n\n<p>Again, use sencha-touch-debug.js in development mode then switch to either sencha-touch.js or sencha-touch-all.js plus a custom build in production.</p>\n\n<h2 id='building-section-2'>Creating your own Build</h2>\n\n<p>In the vast majority of cases a Sencha Touch 2 app should use a custom build in production, for 2 main reasons:</p>\n\n<ol>\n<li>Custom builds include <strong>only</strong> the framework classes your app is actually using, saving on download time</li>\n<li>A custom build includes all of your app classes in a single file, which means only one network request</li>\n</ol>\n\n\n<p>Reason 2 is especially important. Most applications will have a large number of files (sometimes hundreds), and loading them one by one, especially over a 3g network, can take a long time. That's because each request can add several hundred milliseconds of delay, depending on network conditions, which can easily add several seconds to your application's overall load time.</p>\n\n<p>To ensure your applications load quickly in production we have created the <a href=\"http://www.sencha.com/products/sdk-tools\">Sencha SDK Tools</a>, which includes a build script that automatically does all of this:</p>\n\n<ol>\n<li>Figures out which framework classes your application is actually using</li>\n<li>Figures out which application classes are loaded when your application boots up</li>\n<li>Combines all of these into a single file, with the classes in the right order</li>\n<li>Strips out all of the JSDoc comments, then minifies the file so it's as small as possible</li>\n</ol>\n\n\n<h3>Installing the SDK Tools</h3>\n\n<p>If you don't already have the Sencha SDK Tools installed, you'll need to install them before you can create a build. A quick way to check to see if the tools are already installed is to open up your command line terminal and type in 'sencha' - if the SDK Tools are present you should see something like this:</p>\n\n<p><p class='screenshot'><img src='guides/building/installed-test.png' alt='Output of running 'sencha' on the command line if the SDK Tools are installed'><span>Output of running 'sencha' on the command line if the SDK Tools are installed</span></p></p>\n\n<p>If you get an error instead you probably don't have the SDK Tools installed. Just hit the download button on <a href=\"http://www.sencha.com/products/sdk-tools\">http://www.sencha.com/products/sdk-tools</a>, double-click the downloaded file to install then try the <em>sencha</em> command again and everything should work.</p>\n\n<h3>Generating a Build</h3>\n\n<p><strong> Note: </strong> <strong><em>The build steps are expected to be simplified in the next release (2.0.0 Beta 2) so please check this page again once that release is available.</em></strong></p>\n\n<p>We're going to assume you have an app that works locally already and that you just want to build it for production. If you don't have an app yet or don't know what this is all about, check out the <a href=\"#!/guide/apps_intro\">getting started guide</a>.</p>\n\n<p>Assuming you app does work locally though, let's proceed. We're going to use the Twitter example that comes with the Sencha Touch SDK to illustrate how this works. Firstly let's familiarize ourselves with that example's index.html file:</p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"&gt;\n    &lt;title&gt;Twitter&lt;/title&gt;\n\n    &lt;link rel=\"stylesheet\" href=\"resources/css/application.css\" type=\"text/css\"&gt;\n\n    &lt;script type=\"text/javascript\" src=\"touch/sencha-touch-debug.js\"&gt;&lt;/script&gt;\n    &lt;script type=\"text/javascript\" src=\"app.js\"&gt;&lt;/script&gt;\n&lt;/head&gt;\n&lt;body&gt;&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>Notice that we're loading sencha-touch-debug.js and app.js - this combination is what allows us to use dynamic loading while developing our app, and is the basis for the SDK Tools' ability to generate a minimal build. We'll come back to this html file's contents shortly.</p>\n\n<p>Back to the command line - first you'll need to cd into to the directory that your app can be found in on your hard drive:</p>\n\n<pre><code>cd ~/path/to/my/app\n</code></pre>\n\n<p>Next you'll need to generate a jsb file for your app. A jsb file is basically a list of all the classes that your application uses. Thankfully, the SDK Tools do this for you:</p>\n\n<pre><code>sencha create jsb -a index.html -p app.jsb3\n</code></pre>\n\n<p>This command takes your index.html file (the same file you use in your browser while developing your app), figures out all of the class dependencies and writes them out into a file called <em>app.jsb3</em>. From here we just need one more command to actually generate the build itself:</p>\n\n<pre><code>sencha build -p app.jsb3 -d ./\n</code></pre>\n\n<p>This final command takes all of the files listed in the jsb and combines them into a single file, which it then minifies to make as small as possible. The output is a file called all-classes.js, which contains all of the framework classes plus your application classes.</p>\n\n<h3>Updating your HTML file</h3>\n\n<p>The final step to prepare your app for production is to update your HTML file to use sencha-touch.js instead of sencha-touch-debug.js, and to load your newly-generated all-classes.js. Here's how our twitter example file ends up:</p>\n\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"&gt;\n    &lt;title&gt;Twitter&lt;/title&gt;\n\n    &lt;link rel=\"stylesheet\" href=\"resources/css/application.css\" type=\"text/css\"&gt;\n\n    &lt;script type=\"text/javascript\" src=\"touch/sencha-touch.js\"&gt;&lt;/script&gt;\n    &lt;script type=\"text/javascript\" src=\"all-classes.js\"&gt;&lt;/script&gt;\n    &lt;script type=\"text/javascript\" src=\"app.js\"&gt;&lt;/script&gt;\n&lt;/head&gt;\n&lt;body&gt;&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<p>Rather than change your main index.html file all the time, it's common to create a duplicate called index-production.html that looks like the file above. Many developers will produce a simple deploy script that copies the app into a deploy folder and renames index-production.html to index.html automatically so that the build can simply be uploaded.</p>\n\n<h3>Upcoming Changes to the Builder</h3>\n\n<p>Although it's only a few steps, we'd like to improve both the workflow and the output of the builder for the next release of Sencha Touch. If you're building using Sencha Touch 2.0 beta 1 please be sure to check back when you upgrade to a later release as it is likely the steps and output will have changed slightly.</p>\n"});