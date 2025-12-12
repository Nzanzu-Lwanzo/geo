import { readFile } from 'node:fs/promises';

export async function getFileContent<T>(filePath: string): Promise<T> {
  const fileContent = await readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(fileContent);
  return data as T;
}
