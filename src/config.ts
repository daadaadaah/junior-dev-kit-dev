import { workspace } from 'vscode';
import { homedir } from 'os';
import { join } from 'path';

const configuration = () => workspace.getConfiguration('junior-dev-kit');

export const getBasePath = () => configuration().get<string>('basePath') || join(homedir(), 'junior-dev-kit');

export const getCodingdojoTargetPath = () => configuration().get<string>('codingdojoTargetPath');

export const getTilTargetPath = () => configuration().get<string>('tilTargetPath');
