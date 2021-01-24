import * as vscode from 'vscode';

import all from '../assets/programmers/all.json';

import {
  getUrl, createDir, removeSpecialCharacters, readFile, getTodayDate,
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
      const folerName = `/level${level}`; // 레벨별, 날짜별
      const dirPath = basePath + folerName;

      await createDir(dirPath);

      const fileName = removeSpecialCharacters(item.label).replace(/ /gi, '_');
      const filePath = `${dirPath}/${fileName}.test.js`;
      await readFile(filePath);

      const filePathUri = vscode.Uri.file(filePath);
      await vscode.commands.executeCommand('vscode.openFolder', filePathUri, true);

      vscode.window.showInformationMessage(
        `[${fileName} 문제 보기](${item.description}) `,
      );

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
  await createDir(basePath);

  const fileName = getTodayDate();
  const filePath = `${basePath}/${fileName}.md`;
  await readFile(filePath);

  const filePathUri = vscode.Uri.file(filePath);
  await vscode.commands.executeCommand('vscode.openFolder', filePathUri, true);
};
