// Package sdkcontract holds shared resolve payload types for Taqlyn SDKs
// and the control-plane API. Keep in sync with:
//   - docs/architecture/03-modules.md ("Shared resolve payload")
//   - packages/openapi components.schemas.DeferredLink
//   - packages/sdk-contract TypeScript exports
package sdkcontract

// MatchType is how the deferred / warm link was matched.
type MatchType string

const (
	MatchTypeInstallReferrer MatchType = "install_referrer"
	MatchTypeClipboard       MatchType = "clipboard"
	MatchTypeAppClip         MatchType = "app_clip"
	MatchTypeClaim           MatchType = "claim"
	MatchTypeNone            MatchType = "none"
)

// Campaign is optional UTM / campaign attribution on a resolved link.
type Campaign map[string]string

// DeferredLink is the canonical payload returned by Match.resolve /
// SdkCore.resolveDeferred and passed to NavAdapter.navigate.
type DeferredLink struct {
	URL        string            `json:"url"`
	Path       string            `json:"path"`
	Params     map[string]string `json:"params"`
	LinkID     string            `json:"linkId"`
	MatchType  MatchType         `json:"matchType"`
	IsDeferred bool              `json:"isDeferred"`
	Campaign   Campaign          `json:"campaign,omitempty"`
}

// ResolvePayload is an alias used by API / server SDK naming
// (POST /v1/resolve response).
type ResolvePayload = DeferredLink
