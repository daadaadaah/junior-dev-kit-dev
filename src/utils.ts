import { promises } from 'fs';

export const removeSpecialCharacters = (text: string): string => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

  if (!regExp.test(text)) {
    return text;
  }

  return text.replace(regExp, '');
};

export const leadingZeros = (number, digits) => {
  let zero = '';
  const s = number.toString();

  if (s.length < digits) {
    for (let i = 0; i < digits - s.length; i++) { zero += '0'; }
  }
  return zero + s;
};

export const getTodayDate = () => {
  const today = new Date();
  const year = leadingZeros(today.getFullYear(), 4);
  const month = leadingZeros(today.getMonth() + 1, 2);
  const data = leadingZeros(today.getDate(), 2);
  const todayDate = year + month + data; // 예) 20210102
  return todayDate;
};

export const getUrl = (baseUrl: string) => (path: string) => baseUrl + path;

export const createDir = async (path: string) => {
  await promises.mkdir(path, { recursive: true }); // true : 이미 존재하면, 그 경로 반환해라
};

export const isFile = async (
  path: string,
) => {
  const state = await promises.stat(path);

  return state.isFile();
};

export const createFile = async (
  path: string, url: string,
) => {
  await promises.writeFile(path, `// URL : ${url} `);
};

export const isMatched = (string, targetWord) => {
  for (let i = 0; i < string.length; i += 1) {
    let match = true;

    for (let j = 0; j < targetWord.length; j += 1) {
      if (string[i + j] !== targetWord[j]) {
        match = false;
        break;
      }
    }

    if (match) {
      return match;
    }
  }
  return false;
};
