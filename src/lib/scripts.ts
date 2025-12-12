import { appendFile } from 'node:fs/promises';

export async function fromFilenameToType(pathFile: string, types: string[]) {
  let t = 'type IsoCode2 =';
  for (let _type of types) {
    if (_type === '$') {
      t += `'${_type}'`;
    } else {
      t += `| '${_type}'`;
    }
  }
  return await appendFile(pathFile, t);
}
