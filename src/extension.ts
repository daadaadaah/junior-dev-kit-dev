import * as vscode from 'vscode';

import { programmers, til, whichHTMLElement } from './commands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('junior-dev-kit.programmers', programmers),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('junior-dev-kit.til', til),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('junior-dev-kit.whichHTMLElement', whichHTMLElement),
  );
}

export function deactivate() {}
