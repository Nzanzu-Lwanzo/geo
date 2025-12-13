import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

export async function getFileContent<T>(
  filePath: string,
): Promise<T | undefined> {
  try {
    const fileContent = await readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(fileContent);
    return data as T;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getISOCodes(dirPath: string) {
  const files = await readdir(dirPath, {
    encoding: 'utf-8',
    withFileTypes: undefined,
  });

  return files.map((file) => file.split('.').at(0));
}

export const getFilePath = (relPath: string) => {
  return join(
    cwd(),
    process.env['NODE_ENV'] == 'dev' ? 'src' : 'dist',
    relPath,
  );
};
