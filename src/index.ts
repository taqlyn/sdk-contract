/**
 * Shared resolve payload — keep in sync with:
 * - docs/architecture/03-modules.md ("Shared resolve payload")
 * - packages/openapi components.schemas.DeferredLink
 */

/** How the deferred / warm link was matched. */
export type MatchType =
  | "install_referrer"
  | "clipboard"
  | "app_clip"
  | "claim"
  | "fingerprint"
  | "none";

/**
 * Known SDK analytics event names (Detour-style). Any non-empty string is allowed.
 */
export type AnalyticsEventName =
  | "login"
  | "search"
  | "share"
  | "sign_up"
  | "sign_out"
  | "view_item"
  | "add_to_cart"
  | "purchase"
  | (string & {});

/** Optional UTM / campaign attribution on a resolved link. */
export interface Campaign {
  utm_source?: string;
  utm_campaign?: string;
  [key: string]: string | undefined;
}

/**
 * Canonical payload returned by Match.resolve / SdkCore.resolveDeferred
 * and passed to NavAdapter.navigate.
 */
export interface DeferredLink {
  url: string;
  path: string;
  params: Record<string, string>;
  linkId: string;
  matchType: MatchType;
  isDeferred: boolean;
  campaign?: Campaign;
}

/** Alias used by API / server SDK naming (`POST /v1/resolve` response). */
export type ResolvePayload = DeferredLink;

/** Gap 1 — short-link expand UX. */
export type ResolveMode = "await" | "optimistic";

/**
 * Cascade: per-link → per-app → client SDK → await.
 */
export function effectiveResolveMode(
  link?: ResolveMode | null,
  app?: ResolveMode | null,
  client?: ResolveMode | null,
): ResolveMode {
  return link ?? app ?? client ?? "await";
}

/**
 * Response from POST /v1/links/expand (installed-app short URL → in-app path).
 * Cascade: linkResolveMode ?? appResolveMode ?? client ?? "await".
 */
export interface ExpandResult {
  linkId: string;
  code: string;
  host: string;
  destinationPath: string;
  params: Record<string, string>;
  url: string;
  linkResolveMode?: ResolveMode | null;
  appResolveMode?: ResolveMode | null;
  appExpandTimeoutMs?: number | null;
}

/** Nav target after expand / path-map. */
export interface ResolvedNavTarget {
  href: string;
  linkId?: string;
  /** When optimistic: expand may still be running; caller should replace later. */
  pendingExpand?: boolean;
}
