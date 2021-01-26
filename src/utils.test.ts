import { promises } from 'fs';

import {
  removeSpecialCharacters,
  leadingZeros,
  getTodayDate,
  getUrl,
  createDir,
  isFile,
  createFile,
  isMatched,
} from './utils';

jest.mock('fs', () => ({
  promises: {
    stat: jest.fn().mockImplementation(() => ({
      isDirectory: jest.fn().mockRejectedValue(true),
      isFile: jest.fn().mockRejectedValue(true),
    })),
    mkdir: jest.fn(),
    writeFile: jest.fn(),
  },
}));

test('removeSpecialCharacters', () => {
  expect(removeSpecialCharacters('한.글')).toBe('한글');
  expect(removeSpecialCharacters('특수문자')).toBe('특수문자');
});

test('leadingZeros', () => {
  const today = new Date();

  expect(leadingZeros(today.getFullYear(), 4)).toBe('2021');
});

test('getTodayDate', () => {
  expect(getTodayDate().length).toBe(8);
});

test('getUrl', () => {
  expect(getUrl('www.example.com')('/login')).toBe('www.example.com/login');
});

test('createDir', async () => {
  const dirPath = `${__dirname}/../fixture/TIL`;

  await createDir(dirPath);

  const stat = await promises.stat(dirPath);

  expect(stat.isDirectory()).toBeTruthy();
});

test('isFile', async () => {
  const filePath = `${__dirname}/../fixture/TIL/20210124.md`;

  expect(isFile(filePath)).toBeTruthy();
});

test('createFile', async () => {
  const filePath = `${__dirname}/../fixture/TIL/20210124.md`;

  await createFile(filePath, 'www.exaple.com/111');

  const stat = await promises.stat(filePath);

  expect(stat.isFile()).toBeTruthy();
});

test('isMatched', async () => {
  expect(isMatched('abcdefg', 'bc')).toBeTruthy();

  expect(isMatched('abcdefg', 'dc')).toBeFalsy();
});
