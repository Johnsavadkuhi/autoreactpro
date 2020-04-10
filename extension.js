// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');
	const log = console.log.bind(console);

	log(vscode.workspace.rootPath + '/src') ; 
	
	const watcher = chokidar.watch(vscode.workspace.rootPath + '/src', {
		ignored: /index.js/,
		persistent: true,
		ignoreInitial: true,
	
	  });
	  watcher.on('add', (p, event) => {

		if (path.parse(p).name[0] !== path.parse(p).name[0].toUpperCase()) {
		  log("need to be rename : ", p);
	
		}
		if (path.extname(p) === ".js") {
		  
		  fs.writeFile(p, `import React from 'react' \n
			
		 function ${path.parse(p).name[0].toUpperCase() }${ path.parse(p).name.slice(1).toLowerCase()}()
		 {
		  
			 return (<div></div>);
	
		 }
			
		 export default ${path.parse(p).name[0].toUpperCase()}${  path.parse(p).name.slice(1).toLocaleLowerCase()} ; 
			`, function (e) {
			if (e) {
			  throw e ; 
			}
		  });
		}
	  })


	let disposable = vscode.commands.registerCommand('autoreactpro.autoreactpro', function () {

		vscode.window.showWarningMessage('autoreactpro extension activated.');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
