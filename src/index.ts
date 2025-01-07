export type { AddOutputFilterByTypeSpec } from "./directives/AddOutputFilterByType";
export type { ErrorDocumentSpec } from "./directives/ErrorDocument";
export type { FilesSpec } from "./directives/Files";
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
