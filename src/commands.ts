import * as vscode from 'vscode';

import all from '../assets/programmers/all.json';
import elements from '../assets/HTMLElement/elements.json';

import {
  getUrl, createDir, removeSpecialCharacters, isFile, createFile, getTodayDate,
  isMatched as isCurrentTargetPath,
} from './utils';

import { getBasePath, getCodingdojoTargetPath, getTilTargetPath } from './config';

export const showQuizByLevel = (level: number) => {
  const quickPickMenus = all.filter((value) => value.level === level).map((quiz, index) => ({
    label: `[${index + 1}] ${quiz.title}`,
    description: getUrl('https://programmers.co.kr')(quiz.url),
  }));

  const quickPick = vscode.window.createQuickPick();
  quickPick.items = quickPickMenus;

  quickPick.onDidChangeSelection(async ([item]) => {
    if (item) {
      const basePath = getCodingdojoTargetPath() || getBasePath();

      try {
        const folerName = `/level${level}/`; // 레벨별, 날짜별
        const dirPath = basePath + folerName;
        await createDir(dirPath);

        const fileName = removeSpecialCharacters(item.label).replace(/ /gi, '_');
        const filePath = `${dirPath}${fileName}.test.js`;
        try {
          await isFile(filePath);
        } catch (error) {
          await createFile(filePath, item.description);
        }

        const currentWorkspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;

        const shortPath = basePath.length < currentWorkspacePath.length ? basePath : currentWorkspacePath;
        const longPath = basePath.length > currentWorkspacePath.length ? basePath : currentWorkspacePath;

        if (isCurrentTargetPath(longPath, shortPath)) {
          const filePathUri = vscode.Uri.file(filePath);
          await vscode.commands.executeCommand('vscode.openFolder', filePathUri, false);
        } else {
          const dirPathUri = vscode.Uri.file(basePath);
          await vscode.commands.executeCommand('vscode.openFolder', dirPathUri, true);
        }

        vscode.window.showInformationMessage(
          `[${fileName} 문제 보기](${item.description}) `,
        );
      } catch (error) {
        if (error.errno === -2) {
          vscode.window.showErrorMessage(
            `${basePath} : 폴더 또는 파일 경로가 존재하는지 확인해주세요`,
          );
        }
      }

      quickPick.dispose();
    }
  });

  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.show();
};

export const programmers = async () => {
  const quickPickMenus = [
    {
      label: '[Programmers] Level 1',
      description: '(총 43 문제)',
    },
    {
      label: '[Programmers] Level 2',
      description: '(총 48 문제)',
    },
    {
      label: '[Programmers] Level 3',
      description: '(총 39 문제)',
    },
    {
      label: '[Programmers] Level 4',
      description: '(총 21 문제)',
    },
    {
      label: '[Programmers] Level 5',
      description: '(총 3 문제)',
    },
  ];

  const quickPick = vscode.window.createQuickPick();
  quickPick.items = quickPickMenus;

  quickPick.onDidChangeSelection(([item]) => {
    if (item) {
      const { label } = item;
      const lv = label.charAt(label.length - 1);

      showQuizByLevel(Number(lv));

      quickPick.dispose();
    }
  });

  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.show();
};

export const til = async () => {
  const basePath = getTilTargetPath() || getBasePath();

  try {
    await createDir(basePath);

    const fileName = getTodayDate();
    const filePath = `${basePath}/${fileName}.md`;

    try {
      isFile(filePath);
    } catch (error) {
      await createFile(filePath, '# TIL');
    }

    const currentOpenWorkspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;

    const shortPath = basePath.length < currentOpenWorkspacePath.length ? basePath : currentOpenWorkspacePath;
    const longPath = basePath.length > currentOpenWorkspacePath.length ? basePath : currentOpenWorkspacePath;

    if (isCurrentTargetPath(longPath, shortPath)) {
      const filePathUri = vscode.Uri.file(filePath);
      await vscode.commands.executeCommand('vscode.openFolder', filePathUri, false);
    } else {
      const dirPathUri = vscode.Uri.file(basePath);
      await vscode.commands.executeCommand('vscode.openFolder', dirPathUri, true);
    }
  } catch (error) {
    if (error.errno === -2) {
      vscode.window.showErrorMessage(
        `${basePath} : 폴더 또는 파일 경로가 존재하는지 확인해주세요`,
      );
    }
  }
};

export const whichHTMLElement = async () => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('editor does not exist');
    return;
  }

  let text = editor.document.getText(editor.selection).trim();

  if (!text) {
    vscode.window.showWarningMessage('검사할 텍스트를 선택해주세요');
    return;
  }

  if (text.indexOf('<') === -1) {
    text = `<${text}`;
  }

  if (text.indexOf('>') === -1) {
    text = `${text}>`;
  }

  if (text.indexOf('/') !== -1) {
    text = text.replace('/', '');
  }

  const whichHtmlElement = elements.find((element) => element.tagName === text);

  if (!whichHtmlElement) {
    vscode.window.showWarningMessage('올바른 HTML Element 를 선택해주세요');
    return;
  }

  const quickPickMenus = [
    {
      label: whichHtmlElement.type,
      description: text,
    },
  ];

  const quickPick = vscode.window.createQuickPick();
  quickPick.items = quickPickMenus;

  quickPick.onDidChangeSelection(([item]) => {
    if (item) {
      quickPick.dispose();
    }
  });
  quickPick.onDidHide(() => quickPick.dispose());
  quickPick.show();
};
