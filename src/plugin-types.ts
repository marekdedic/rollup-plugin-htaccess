export interface OutputOptions {
  dir: string | undefined;
}

export interface PluginContext {
  emitFile(emittedFile: {
    fileName?: string;
    source?: string;
    type: "asset";
  }): string;
  error(error: string): never;
}

export type PluginHook<T> =
  | {
      handler: T;
      order?: "post" | "pre";
      sequential?: boolean;
    }
  | T;
