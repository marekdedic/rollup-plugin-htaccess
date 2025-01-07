| Symbol                       | Meaning                |
| ---------------------------- | ---------------------- |
| :white_check_mark:           | Supported              |
| :construction:               | Partial support        |
| :x:                          | Unsupported            |

# Core

| Status | Directive name | Notes |
| ------ | -------------- | ----- |
| :x:    | AcceptPathInfo | |
| :x:    | AddDefaultCharset | |
| :x:    | AllowOverride | |
| :x:    | AllowOverrideList | |
| :x:    | CGIMapExtension | |
| :x:    | CGIPassAuth | |
| :x:    | CGIVar | |
| :x:    | ContentDigest | |
| :x:    | DefaultType | |
| :x:    | Define | |
| :white_check_mark: | \<Else\> | |
| :white_check_mark: | \<ElseIf\> | |
| :x:    | EnableMMAP | |
| :x:    | EnableSendfile | |
| :x:    | Error | |
| :white_check_mark: | ErrorDocument | |
| :x:    | FileETag | |
| :white_check_mark: | \<Files\> | |
| :white_check_mark: | \<FilesMatch\> | |
| :x:    | ForceType | |
| :x:    | HostnameLookups | |
| :white_check_mark: | \<If\> | |
| :white_check_mark: | \<IfDefine\> | |
| :x:    | \<IfDirective\> | |
| :x:    | \<IfFile\> | |
| :x:    | \<IfModule\> | |
| :x:    | \<IfSection\> | |
| :x:    | Include | |
| :x:    | IncludeOptional | |
| :x:    | \<Limit\> | |
| :x:    | \<LimitExcept\> | |
| :x:    | LimitRequestBody | |
| :x:    | LimitXMLRequestBody | |
| :x:    | LogLevel | |
| :x:    | MaxRangeOverlaps | |
| :x:    | MaxRangeReversals | |
| :x:    | MaxRanges | |
| :white_check_mark: | Options | |
| :x:    | QualifyRedirectURL | |
| :x:    | ReadBufferSize | |
| :x:    | RLimitCPU | |
| :x:    | RLimitMEM | |
| :x:    | RLimitNPROC | |
| :x:    | ScriptInterpreterSource | |
| :x:    | ServerSignature | |
| :x:    | SetHandler | |
| :x:    | SetInputFilter | |
| :x:    | SetOutputFilter | |
| :x:    | UseCanonicalName | |
| :x:    | UseCanonicalPhysicalPort | |

# Base

| Status | Directive name | Notes |
| ------ | -------------- | ----- |
| :x:    | Action | |
| :x:    | AddAlt | |
| :x:    | AddAltByEncoding | |
| :x:    | AddAltByType | |
| :x:    | AddCharset | |
| :x:    | AddDescription | |
| :x:    | AddEncoding | |
| :x:    | AddHandler | |
| :x:    | AddIcon | |
| :x:    | AddIconByEncoding | |
| :x:    | AddIconByType | |
| :x:    | AddInputFilter | |
| :x:    | AddLanguage | |
| :x:    | AddOutputFilter | |
| :white_check_mark: | AddOutputFilterByType | |
| :x:    | AddType | |
| :x:    | Alias | |
| :x:    | AuthBasicAuthoritative | |
| :x:    | AuthBasicFake | |
| :x:    | AuthBasicProvider | |
| :x:    | AuthBasicUseDigestAlgorithm | |
| :x:    | AliasPreservePath | |
| :x:    | AuthFormAuthoritative | |
| :x:    | AuthFormBody | |
| :x:    | AuthFormDisableNoStore | |
| :x:    | AuthFormFakeBasicAuth | |
| :x:    | AuthFormLocation | |
| :x:    | AuthFormLoginRequiredLocation | |
| :x:    | AuthFormLoginSuccessLocation | |
| :x:    | AuthFormLogoutLocation | |
| :x:    | AuthFormMethod | |
| :x:    | AuthFormMimetype | |
| :x:    | AuthFormPassword | |
| :x:    | AuthFormProvider | |
| :x:    | AuthFormSitePassphrase | |
| :x:    | AuthFormSize | |
| :x:    | AuthFormUsername | |
| :x:    | AuthGroupFile | |
| :x:    | AuthMerging | |
| :x:    | AuthName | |
| :x:    | AuthnCacheContext | |
| :x:    | AuthnCacheProvideFor | |
| :x:    | AuthnCacheTimeout | |
| :x:    | AuthType | |
| :x:    | AuthUserFile | |
| :x:    | AuthzSendForbiddenOnFailure | |
| :x:    | BrowserMatch | |
| :x:    | BrowserMatchNoCase | |
| :x:    | CGIDScriptTimeout | |
| :x:    | CGIScriptTimeout | |
| :x:    | DefaultIcon | |
| :x:    | DefaultLanguage | |
| :x:    | DirectoryCheckHandler | |
| :x:    | DirectoryIndex | |
| :x:    | DirectoryIndexRedirect | |
| :x:    | DirectorySlash | |
| :x:    | FallbackResource | |
| :x:    | FilterChain | |
| :x:    | FilterDeclare | |
| :x:    | FilterProtocol | |
| :x:    | FilterProvider | |
| :x:    | FilterTrace | |
| :x:    | ForceLanguagePriority | |
| :x:    | HeaderName | |
| :x:    | ImapBase | |
| :x:    | ImapDefault | |
| :x:    | ImapMenu | |
| :x:    | IndexHeadInsert | |
| :x:    | IndexIgnore | |
| :x:    | IndexIgnoreReset | |
| :x:    | IndexOptions | |
| :x:    | IndexOrderDefault | |
| :x:    | IndexStyleSheet | |
| :x:    | ISAPIAppendLogToErrors | |
| :x:    | ISAPIAppendLogToQuery | |
| :x:    | ISAPIFakeAsync | |
| :x:    | ISAPILogNotSupported | |
| :x:    | ISAPIReadAheadBuffer | |
| :x:    | KeptBodySize | |
| :x:    | LanguagePriority | |
| :x:    | \<Macro\> | |
| :x:    | ModMimeUsePathInfo | |
| :x:    | MultiviewsMatch | |
| :x:    | PassEnv | |
| :x:    | ProxyHTMLBufSize | |
| :x:    | ProxyHTMLCharsetOut | |
| :x:    | ProxyHTMLDocType | |
| :x:    | ProxyHTMLEnable | |
| :x:    | ProxyHTMLEvents | |
| :x:    | ProxyHTMLExtended | |
| :x:    | ProxyHTMLFixups | |
| :x:    | ProxyHTMLInterp | |
| :x:    | ProxyHTMLLinks | |
| :x:    | ProxyHTMLMeta | |
| :x:    | ProxyHTMLStripComments | |
| :x:    | ProxyHTMLURLMap | |
| :x:    | ReadmeName | |
| :x:    | Redirect | |
| :x:    | RedirectMatch | |
| :x:    | RedirectPermanent | |
| :x:    | RedirectRelative | |
| :x:    | RedirectTemp | |
| :x:    | ReflectorHeader | |
| :x:    | RemoveCharset | |
| :x:    | RemoveEncoding | |
| :x:    | RemoveHandler | |
| :x:    | RemoveInputFilter | |
| :x:    | RemoveLanguage | |
| :x:    | RemoveOutputFilter | |
| :x:    | RemoveType | |
| :x:    | Require | |
| :x:    | \<RequireAll\> | |
| :x:    | \<RequireAny\> | |
| :x:    | \<RequireNone\> | |
| :x:    | Script | |
| :x:    | ScriptAlias | |
| :x:    | SetEnv | |
| :x:    | SetEnvIf | |
| :x:    | SetEnvIfExpr | |
| :x:    | SetEnvIfNoCase | |
| :x:    | SSIErrorMsg | |
| :x:    | SSIETag | |
| :x:    | SSILastModified | |
| :x:    | SSILegacyExprParser | |
| :x:    | SSITimeFormat | |
| :x:    | SSIUndefinedEcho | |
| :x:    | UndefMacro | |
| :x:    | UnsetEnv | |
| :x:    | Use | |
| :x:    | XBitHack | |
| :x:    | xml2EncDefault | |
| :x:    | xml2StartParse | |


# Extension

| Status | Extension | Directive name | Notes |
| ------ | --------- | -------------- | ----- |
| :x:    | mod_access_compat | Allow | |
| :x:    | mod_access_compat | Deny | |
| :x:    | mod_access_compat | Order | |
| :x:    | mod_access_compat | Satisfy | |
| :x:    | mod_auth_digest | AuthDigestAlgorithm | |
| :x:    | mod_auth_digest | AuthDigestDomain | |
| :x:    | mod_auth_digest | AuthDigestNonceLifetime | |
| :x:    | mod_auth_digest | AuthDigestProvider | |
| :x:    | mod_auth_digest | AuthDigestQop | |
| :x:    | mod_authn_anon | Anonymous | |
| :x:    | mod_authn_anon | Anonymous_LogEmail | |
| :x:    | mod_authn_anon | Anonymous_MustGiveEmail | |
| :x:    | mod_authn_anon | Anonymous_NoUserID | |
| :x:    | mod_authn_anon | Anonymous_VerifyEmail | |
| :x:    | mod_authn_dbd | AuthDBDUserPWQuery | |
| :x:    | mod_authn_dbd | AuthDBDUserRealmQuery | |
| :x:    | mod_authn_dbm | AuthDBMType | |
| :x:    | mod_authn_dbm | AuthDBMUserFile | |
| :x:    | mod_authnz_fcgi | AuthnzFcgiCheckAuthnProvider | |
| :x:    | mod_authnz_ldap | AuthLDAPAuthorizePrefix | |
| :x:    | mod_authnz_ldap | AuthLDAPBindAuthoritative | |
| :x:    | mod_authnz_ldap | AuthLDAPBindDN | |
| :x:    | mod_authnz_ldap | AuthLDAPBindPassword | |
| :x:    | mod_authnz_ldap | AuthLDAPCompareAsUser | |
| :x:    | mod_authnz_ldap | AuthLDAPCompareDNOnServer | |
| :x:    | mod_authnz_ldap | AuthLDAPDereferenceAliases | |
| :x:    | mod_authnz_ldap | AuthLDAPGroupAttribute | |
| :x:    | mod_authnz_ldap | AuthLDAPGroupAttributeIsDN | |
| :x:    | mod_authnz_ldap | AuthLDAPInitialBindAsUser | |
| :x:    | mod_authnz_ldap | AuthLDAPInitialBindPattern | |
| :x:    | mod_authnz_ldap | AuthLDAPMaxSubGroupDepth | |
| :x:    | mod_authnz_ldap | AuthLDAPRemoteUserAttribute | |
| :x:    | mod_authnz_ldap | AuthLDAPRemoteUserIsDN | |
| :x:    | mod_authnz_ldap | AuthLDAPSearchAsUser | |
| :x:    | mod_authnz_ldap | AuthLDAPSubGroupAttribute | |
| :x:    | mod_authnz_ldap | AuthLDAPSubGroupClass | |
| :x:    | mod_authnz_ldap | AuthLDAPURL | |
| :x:    | mod_authz_dbd | AuthzDBDLoginToReferer | |
| :x:    | mod_authz_dbd | AuthzDBDQuery | |
| :x:    | mod_authz_dbd | AuthzDBDRedirectQuery | |
| :x:    | mod_authz_dbm | AuthDBMGroupFile | |
| :x:    | mod_authz_dbm | AuthzDBMType | |
| :x:    | mod_buffer | BufferSize | |
| :x:    | mod_cache | CacheDefaultExpire | |
| :x:    | mod_cache | CacheDetailHeader | |
| :x:    | mod_cache | CacheDisable | |
| :x:    | mod_cache | CacheEnable | |
| :x:    | mod_cache | CacheHeader | |
| :x:    | mod_cache | CacheIgnoreNoLastMod | |
| :x:    | mod_cache | CacheLastModifiedFactor | |
| :x:    | mod_cache | CacheMaxExpire | |
| :x:    | mod_cache | CacheMinExpire | |
| :x:    | mod_cache | CacheStaleOnError | |
| :x:    | mod_cache | CacheStoreExpired | |
| :x:    | mod_cache | CacheStoreNoStore | |
| :x:    | mod_cache | CacheStorePrivate | |
| :x:    | mod_cache_disk | CacheMaxFileSize | |
| :x:    | mod_cache_disk | CacheMinFileSize | |
| :x:    | mod_cache_disk | CacheReadSize | |
| :x:    | mod_cache_disk | CacheReadTime | |
| :x:    | mod_cache_socache | CacheSocacheMaxSize | |
| :x:    | mod_cache_socache | CacheSocacheMaxTime | |
| :x:    | mod_cache_socache | CacheSocacheMinTime | |
| :x:    | mod_cache_socache | CacheSocacheReadSize | |
| :x:    | mod_cache_socache | CacheSocacheReadTime | |
| :x:    | mod_cern_meta | MetaDir | |
| :x:    | mod_cern_meta | MetaFiles | |
| :x:    | mod_cern_meta | MetaSuffix | |
| :x:    | mod_charset_lite | CharsetDefault | |
| :x:    | mod_charset_lite | CharsetOptions | |
| :x:    | mod_charset_lite | CharsetSourceEnc | |
| :x:    | mod_dav | Dav | |
| :x:    | mod_dav | DavBasePath | |
| :x:    | mod_dav | DavDepthInfinity | |
| :x:    | mod_dav | DavMinTimeout | |
| :x:    | mod_dav_fs | DavLockDiscovery | |
| :x:    | mod_dav_lock | DavGenericLockDB | |
| :x:    | mod_deflate | DeflateInflateLimitRequestBody | |
| :x:    | mod_deflate | DeflateInflateRatioBurst | |
| :x:    | mod_deflate | DeflateInflateRatioLimit | |
| :x:    | mod_expires | ExpiresActive | |
| :x:    | mod_expires | ExpiresByType | |
| :x:    | mod_expires | ExpiresDefault | |
| :x:    | mod_ext_filter | ExtFilterOptions | |
| :construction: | mod_headers | Header | See [supported headers](./response-headers.md) |
| :x:    | mod_headers | RequestHeader | |
| :x:    | mod_http2 | H2CopyFiles | |
| :x:    | mod_http2 | H2EarlyHint | |
| :x:    | mod_http2 | H2Push | |
| :x:    | mod_http2 | H2PushResource | |
| :x:    | mod_http2 | H2StreamTimeout | |
| :x:    | mod_http2 | H2Upgrade | |
| :x:    | mod_ident | IdentityCheck | |
| :x:    | mod_ident | IdentityCheckTimeout | |
| :x:    | mod_ldap | LDAPReferralHopLimit | |
| :x:    | mod_ldap | LDAPReferrals | |
| :x:    | mod_ldap | LDAPTrustedClientCert | |
| :x:    | mod_logio | LogIOTrackTTFB | |
| :x:    | mod_lua | LuaCodeCache | |
| :x:    | mod_lua | LuaHookAccessChecker | |
| :x:    | mod_lua | LuaHookAuthChecker | |
| :x:    | mod_lua | LuaHookCheckUserID | |
| :x:    | mod_lua | LuaHookFixups | |
| :x:    | mod_lua | LuaHookInsertFilter | |
| :x:    | mod_lua | LuaHookLog | |
| :x:    | mod_lua | LuaHookMapToStorage | |
| :x:    | mod_lua | LuaHookPreTranslate | |
| :x:    | mod_lua | LuaHookTypeChecker | |
| :x:    | mod_lua | LuaInherit | |
| :x:    | mod_lua | LuaMapHandler | |
| :x:    | mod_lua | LuaPackageCPath | |
| :x:    | mod_lua | LuaPackagePath | |
| :x:    | mod_lua | LuaRoot | |
| :x:    | mod_lua | LuaScope | |
| :x:    | mod_proxy | BalancerMember | |
| :x:    | mod_proxy | Proxy100Continue | |
| :x:    | mod_proxy | ProxyAddHeaders | |
| :x:    | mod_proxy | ProxyErrorOverride | |
| :x:    | mod_proxy | ProxyPass | |
| :x:    | mod_proxy | ProxyPassInterpolateEnv | |
| :x:    | mod_proxy | ProxyPassMatch | |
| :x:    | mod_proxy | ProxyPassReverse | |
| :x:    | mod_proxy | ProxyPassReverseCookieDomain | |
| :x:    | mod_proxy | ProxyPassReverseCookiePath | |
| :x:    | mod_proxy | ProxyPreserveHost | |
| :x:    | mod_proxy | ProxySet | |
| :x:    | mod_proxy_fcgi | ProxyFCGIBackendType | |
| :x:    | mod_proxy_fcgi | ProxyFCGISetEnvIf | |
| :x:    | mod_proxy_ftp | ProxyFtpDirCharset | |
| :x:    | mod_proxy_ftp | ProxyFtpEscapeWildcards | |
| :x:    | mod_proxy_ftp | ProxyFtpListOnWildcard | |
| :x:    | mod_proxy_scgi | ProxySCGIInternalRedirect | |
| :x:    | mod_proxy_scgi | ProxySCGISendfile | |
| :white_check_mark: | mod_rewrite | RewriteBase | |
| :white_check_mark: | mod_rewrite | RewriteCond | |
| :white_check_mark: | mod_rewrite | RewriteEngine | |
| :white_check_mark: | mod_rewrite | RewriteOptions | |
| :white_check_mark: | mod_rewrite | RewriteRule | |
| :x:    | mod_session | Session | |
| :x:    | mod_session | SessionEnv | |
| :x:    | mod_session | SessionExclude | |
| :x:    | mod_session | SessionExpiryUpdateInterval | |
| :x:    | mod_session | SessionHeader | |
| :x:    | mod_session | SessionInclude | |
| :x:    | mod_session | SessionMaxAge | |
| :x:    | mod_session_cookie | SessionCookieName | |
| :x:    | mod_session_cookie | SessionCookieName2 | |
| :x:    | mod_session_cookie | SessionCookieRemove | |
| :x:    | mod_session_dbd | SessionDBDCookieName | |
| :x:    | mod_session_dbd | SessionDBDCookieName2 | |
| :x:    | mod_session_dbd | SessionDBDCookieRemove | |
| :x:    | mod_session_dbd | SessionDBDDeleteLabel | |
| :x:    | mod_session_dbd | SessionDBDInsertLabel | |
| :x:    | mod_session_dbd | SessionDBDPerUser | |
| :x:    | mod_session_dbd | SessionDBDSelectLabel | |
| :x:    | mod_session_dbd | SessionDBDUpdateLabel | |
| :x:    | mod_speling | CheckBasenameMatch | |
| :x:    | mod_speling | CheckCaseOnly | |
| :x:    | mod_speling | CheckSpelling | |
| :x:    | mod_ssl | SSLCipherSuite | |
| :x:    | mod_ssl | SSLOptions | |
| :x:    | mod_ssl | SSLRenegBufferSize | |
| :x:    | mod_ssl | SSLRequire | |
| :x:    | mod_ssl | SSLRequireSSL | |
| :x:    | mod_ssl | SSLUserName | |
| :x:    | mod_ssl | SSLVerifyClient | |
| :x:    | mod_ssl | SSLVerifyDepth | |
| :x:    | mod_substitute | Substitute | |
| :x:    | mod_substitute | SubstituteInheritBefore | |
| :x:    | mod_substitute | SubstituteMaxLineLength | |
| :x:    | mod_usertrack | CookieDomain | |
| :x:    | mod_usertrack | CookieExpires | |
| :x:    | mod_usertrack | CookieHTTPOnly | |
| :x:    | mod_usertrack | CookieName | |
| :x:    | mod_usertrack | CookieSameSite | |
| :x:    | mod_usertrack | CookieSecure | |
| :x:    | mod_usertrack | CookieStyle | |
| :x:    | mod_usertrack | CookieTracking | |
| :x:    | mod_version | \<IfVersion\> | |

# Experimental

| Status | Directive name | Notes |
| ------ | -------------- | ----- |
| :x:    | AllowMethods | |
| :x:    | Example | |
| :x:    | InputSed | |
| :x:    | LogMessage | |
| :x:    | ModemStandard | |
| :x:    | OutputSed | |
| :x:    | PrivilegesMode | |
| :x:    | SessionCryptoCipher | |
| :x:    | SessionCryptoPassphrase | |
| :x:    | SessionCryptoPassphraseFile | |
| :x:    | TLSOptions | |
