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
  | "none";

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
