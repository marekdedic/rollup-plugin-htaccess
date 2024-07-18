import { join } from "path";
import type { PluginContext } from "rollup";

import { readFile } from "./utils";

export async function readTemplate(
  context: PluginContext,
  root: string,
  template: string,
): Promise<string> {
  let fileContents = "";
  try {
    fileContents = await readFile(join(root, template));
  } catch (err: unknown) {
    context.error(
      "Could not read rollup-plugin-htaccess template file, Error: " +
        (err as NodeJS.ErrnoException).message,
    );
  }
  return fileContents.replace(/\r/g, "") + "\n";
}
