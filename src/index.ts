export type { AddOutputFilterByTypeSpec } from "./directives/AddOutputFilterByType";
export type { DirectorySlashSpec } from "./directives/DirectorySlash";
export type { ErrorDocumentSpec } from "./directives/ErrorDocument";
export type { FilesSpec } from "./directives/Files";
export type { FilesMatchSpec } from "./directives/FilesMatch";
export type {
  HeaderSpec,
  HeaderSpecUnion,
  HeaderValueSpecMap,
} from "./directives/Header";
export type {
  ContentSecurityPolicySandboxValue,
  ContentSecurityPolicySourceDirective,
  ContentSecurityPolicySources,
  ContentSecurityPolicySpec,
  ContentSecurityPolicyTrustedTypesValue,
} from "./directives/Header/ContentSecurityPolicy";
export type {
  PermissionsPolicyAllowlist,
  PermissionsPolicyDirectives,
  PermissionsPolicySpec,
} from "./directives/Header/PermissionsPolicy";
export type { ReferrerPolicySpec } from "./directives/Header/ReferrerPolicy";
export type { StrictTransportSecuritySpec } from "./directives/Header/StrictTransportSecurity";
export type { XContentTypeOptionsSpec } from "./directives/Header/XContentTypeOptions";
export type { XFrameOptionsSpec } from "./directives/Header/XFrameOptions";
export type { XXssProtectionSpec } from "./directives/Header/XXssProtection";
export type { IfSpec } from "./directives/If";
export type { IfDefineSpec } from "./directives/IfDefine";
export type { IfDirectiveSpec } from "./directives/IfDirective";
export type { IfFileSpec } from "./directives/IfFile";
export type { IfModuleSpec } from "./directives/IfModule";
export type { IfSectionSpec } from "./directives/IfSection";
export type { OptionName, OptionsSpec } from "./directives/Options";
export type {
  ExtractMetaCSPEnabledOptions,
  ExtractMetaCSPOptions,
} from "./extractMetaCSP";
export { htaccess as default, type Options } from "./plugin";
export type {
  MetadataRewriteRuleFlags,
  RewriteCondSpec,
  RewriteOptionsSpec,
  RewriteRuleCookieFlagMinimalSpec,
  RewriteRuleCookieFlagSpec,
  RewriteRuleSpec,
  RewriteSpec,
  StandardRewriteRuleFlags,
} from "./rewrite";
export type { Spec } from "./spec";
