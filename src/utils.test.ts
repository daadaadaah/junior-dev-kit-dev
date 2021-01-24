import { promises } from 'fs';

import {
  removeSpecialCharacters,
  leadingZeros,
  getTodayDate,
  getUrl,
  createDir,
  readFile,
} from './utils';

test('removeSpecialCharacters', () => {
  expect(removeSpecialCharacters('한.글')).toBe('한글');
  expect(removeSpecialCharacters('특수문자')).toBe('특수문자');
});

test('leadingZeros', () => {
  const today = new Date();

  expect(leadingZeros(today.getFullYear(), 4)).toBe('2021');
});

test('getTodayDate', () => {
  expect(getTodayDate()).toBe('20210124');
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

test('readFile', async () => {
  const filePath = `${__dirname}/../fixture/TIL/20210124.md`;

  await readFile(filePath);

  const stat = await promises.stat(filePath);

  expect(stat.isFile()).toBeTruthy();
});
