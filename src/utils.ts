import { readFile as nodeReadFile, writeFile as nodeWriteFile } from "fs";

export function escapeValue(value: string): string {
  return value.replace(/"/g, '\\"');
}

export async function readFile(path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    nodeReadFile(path, "utf8", (err, data) => {
      if (err !== null) {
        reject(err);
      }
      resolve(data);
    });
  });
}

export async function writeFile(path: string, contents: string): Promise<void> {
  return new Promise<void>((resolve) => {
    nodeWriteFile(path, contents, () => {
      resolve();
    });
  });
}
