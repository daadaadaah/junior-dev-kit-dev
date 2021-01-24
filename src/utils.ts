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

export const readFile = async (
  path: string,
) => {
  await promises.readFile(path, { flag: 'a+' }); // a+ : 없으면 만들어라
};
