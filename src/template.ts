import { readFile } from "fs";
import { join } from "path";

export async function readTemplate(
  root: string,
  template: string,
): Promise<string> {
  return new Promise((resolve) => {
    readFile(join(root, template), "utf8", (err, data) => {
      if (err !== null) {
        throw new Error(
          "Colud not read rollup-plugin-htaccess template file, Error: " +
            err.message,
        );
      }
      resolve(data.replace(/\r/g, "") + "\n");
    });
  });
}
