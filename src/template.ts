import { join } from "path";

import { readFile } from "./utils";

export async function readTemplate(
  root: string,
  template: string,
): Promise<string> {
  let fileContents = "";
  try {
    fileContents = await readFile(join(root, template));
  } catch (err: unknown) {
    throw new Error(
      "Colud not read rollup-plugin-htaccess template file, Error: " +
        (err as NodeJS.ErrnoException).message,
    );
  }
  return fileContents.replace(/\r/g, "") + "\n";
}
