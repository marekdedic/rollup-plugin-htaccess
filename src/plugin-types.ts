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

export interface ViteBuilder {
  config: EnvironmentConfig;
  environments: Record<
    string,
    { config: EnvironmentConfig; isBuilt: boolean } | undefined
  >;
}

interface EnvironmentConfig {
  build: { outDir: string };
  root: string;
}
