package sdkcontract_test

import (
	"encoding/json"
	"testing"

	sdkcontract "github.com/taqlyn/platform/packages/sdk-contract/go"
)

func TestDeferredLinkJSONRoundTrip(t *testing.T) {
	in := sdkcontract.DeferredLink{
		URL:        "https://example.com/product/123?ref=invite",
		Path:       "/product/123",
		Params:     map[string]string{"ref": "invite", "sku": "123"},
		LinkID:     "lnk_test",
		MatchType:  sdkcontract.MatchTypeInstallReferrer,
		IsDeferred: true,
		Campaign: sdkcontract.Campaign{
			"utm_source":   "newsletter",
			"utm_campaign": "spring",
		},
	}

	raw, err := json.Marshal(in)
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}

	var out sdkcontract.ResolvePayload
	if err := json.Unmarshal(raw, &out); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}

	if out.LinkID != in.LinkID || out.MatchType != in.MatchType || !out.IsDeferred {
		t.Fatalf("round-trip mismatch: %+v", out)
	}
}
