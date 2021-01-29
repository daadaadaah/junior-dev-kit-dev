# junior-dev-kit

- 주니어 개발자를 위한 개발 키트로 코딩테스트와 TIL 작성을 손쉽게 도와주는 VSCode Extension

![junior-dev-kit](https://user-images.githubusercontent.com/60481383/105970660-f67e4f80-60cc-11eb-8076-b68e4453f4f5.gif)

## Features

1. 코딩테스트 연습을 할 수 있습니다.

   > 코딩테스트 문제 출처 : [프로그래머스](https://programmers.co.kr/learn/challenges?tab=all_challenges)

2. TIL 작성을 편리하게 할 수 있습니다.

### [방법 1] 명령어로 이용하기

- MacOS: `Cmd + shift + p`
- Window: `Ctrl + shift + p`
- Linux: `Ctrl + shift + p`

<img width="500" alt="명령어로 이용하기4" src="https://user-images.githubusercontent.com/60481383/105630887-e547ff80-5e8e-11eb-8ae9-e224b21656f9.png">

### [방법 2] 단축키로 이용하기

#### (1) 코딩테스트 연습하기

- MacOS: `Cmd + Shift + j`
- Window: `Ctrl + Shift + r`
- Linux: `Ctrl + Shift + r`

#### (2) TIL 작성하기

- MacOS: `Cmd + Ctrl +l`
- Window: `Ctrl + Window + i`
- Linux: `Ctrl + Shift + i`

## Extension Settings

- `junior-dev-kit.codingdojoTargetPath`: 코딩테스트 결과 저장하는 폴더 경로
- `junior-dev-kit.tilTargetPath`: TIL 저장하는 폴더 경로

```js
{
  // ...
  "junior-dev-kit.codingdojoTargetPath": "<Your Path>",
  "junior-dev-kit.tilTargetPath": "<Your Path>",
}
```

> [Extension Settings 설정 방법](https://www.notion.so/junior-dev-kit-Tutorial-2903b9d0c767481f8f5920a7e27e196f)

- 경로 입력하실 때, 반드시 맨 뒤에 '/' 없이 입력해주세요~

```js
- 올바른 예) /User/daadaadaah/daily-coding
- 틀린 예) /User/daadaadaah/daily-coding/
```

## Release Notes

### 0.0.9

- Update keybindings for Linux and window

### 0.0.8

- Add keybindings for Linux

### 0.0.7

- Add Coding Test Quiz's Reference
- Add How to set up Extension settings

### 0.0.6

- Update README.md

### 0.0.5

- Fix bug([#11](https://github.com/daadaadaah/junior-dev-kit/issues/11))

### 0.0.4

- Fix bug([#6](https://github.com/daadaadaah/junior-dev-kit/issues/6), [#7](https://github.com/daadaadaah/junior-dev-kit/issues/7))

### 0.0.3

- Fix bug([#2](https://github.com/daadaadaah/junior-dev-kit/issues/2))

### 0.0.2

- Open New Window

### 0.0.1

- Initial release of Translator.
