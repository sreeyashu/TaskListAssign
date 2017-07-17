# TASKLISTASSIGN


> Application has been developed with minimum level of options which are been egularly used by the end user and made it simple forusage.

## Configure
Clone or Download the code to your local.

### Install Node

	npm install
	
### Install bower and bower components

	npm install -g bower
> To add a new Bower package to your project you use the install command. This should be passed the name of the package you wish to install
	bower install jquery
	
### Install Grunt

To setup GruntJS build here is the steps:

1.Make sure you have setup your package.json or setup new one:

	npm init
	
2.Install Grunt CLI as global:

	npm install -g grunt-cli
	
3.Install Grunt in your local project:

	npm install grunt --save-dev
	
4.Install any Grunt Module you may need in your build process. Just for sake of this sample I will add Concat module for combining files together:

	npm install grunt-contrib-concat --save-dev
	
### Run the development server

	grunt connect

Open address in browser [http://localhost:9999/app][2]
	


### Unit tests

To run the test suite, run these commands

	npm install
	npm test

	
