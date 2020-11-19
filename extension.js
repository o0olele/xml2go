// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { assert } = require('console');
const vscode = require('vscode');
const xmldoc = require('xmldoc');
const { GoNode } = require('./gonode');
const { GoStruct } = require('./gostruct');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "xml2go" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('xml2go.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from xml2go!');

		// Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            let document = editor.document;

            // Get the document text
            const documentText = document.getText();

			// DO SOMETHING WITH `documentText`
			var xml = new xmldoc.XmlDocument(documentText);
			console.log(xml);
			var res = ParseXml(xml);
			console.log(res);
			var p = new GoStruct(res);
			p.Parse();
			console.log(p.GetGoText());

        }
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

function ParseXml(params) {
	if (params.type == "text") {
		return null
	}

	var _node = new GoNode();
	_node.SetName(params.name);

	for (var item in params.attr) {
		_node.SetAttr(item, "string");
	}

	for (var i in params.children) {
		var _sub = ParseXml(params.children[i])
		if (_sub != null ) {
			_node.PushChild(_sub.GetName(), _sub)
		}
	}

	return _node
}

module.exports = {
	activate,
	deactivate
}
