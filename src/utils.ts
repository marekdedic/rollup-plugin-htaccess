import type { PluginContext } from "rollup";

import { readFile as nodeReadFile, writeFile as nodeWriteFile } from "fs";

import { buildSpec, type Spec } from "./spec";

export function buildInnerSpec(
  context: PluginContext,
  innerSpec: Spec,
): string {
  return buildSpec(context, innerSpec).trim().replace(/^/gmu, "\t");
}

export function escapeValue(value: string): string {
  return value.replace(/"/gu, '\\"');
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
