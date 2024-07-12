import { readFile } from "fs";
import type { PluginHooks } from "rollup";

/**
 * @public
 */
export type ExtractMetaCSPOptions =
  | {
      enabled: true;
      files: Array<string>;
    }
  | { enabled: false };

async function asyncReadFile(path: string): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    readFile(path, "utf8", (err, data) => {
      if (err !== null) {
        resolve(null);
      }
      resolve(data);
    });
  });
}

export const extractMetaCSPCloseBundle: (
  options: ExtractMetaCSPOptions & { enabled: true },
) => PluginHooks["closeBundle"] = (
  options: ExtractMetaCSPOptions & { enabled: true },
) => ({
  order: "post",
  sequential: true,
  handler: async (): Promise<void> => {
    const files = options.files;
    for (const file of files) {
      const fileContents = await asyncReadFile(file);
      if (fileContents === null) {
        continue;
      }
      console.log(fileContents);
    }
    console.log("CLOSE BUNDLE");
  },
});
