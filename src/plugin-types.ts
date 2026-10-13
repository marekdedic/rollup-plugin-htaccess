export interface MinimalPluginContext {
  error(error: string): never;
}

export interface OutputOptions {
  dir: string | undefined;
}

export interface PluginContext extends MinimalPluginContext {
  emitFile(emittedFile: {
    fileName?: string;
    source?: string;
    type: "asset";
  }): string;
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
