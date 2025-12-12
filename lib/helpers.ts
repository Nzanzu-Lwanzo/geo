import { readdir, readFile } from 'node:fs/promises';

export async function getFileContent<T>(filePath: string): Promise<T> {
  const fileContent = await readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(fileContent);
  return data as T;
}

export async function getISOCodes(dirPath: string) {
  const files = await readdir(dirPath, {
    encoding: 'utf-8',
    withFileTypes: undefined,
  });

  return files.map((file) => file.split('.').at(0));
}
