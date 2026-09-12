# `@taqlyn/sdk-contract`

Phase 00 **contract package** — shared resolve payload types for client SDKs, NavAdapters, and the API Match response.

No runtime Stitch, networking, or heavy dependencies — types only.

## Exports

| Name | Role |
|------|------|
| `DeferredLink` | Canonical resolve payload (`navigate(DeferredLink)`) |
| `ResolvePayload` | Alias of `DeferredLink` (API / server naming) |
| `MatchType` | `install_referrer` \| `clipboard` \| `app_clip` \| `claim` \| `none` |
| `Campaign` | Optional `utm_*` map |

Aligned with [03-modules.md — Shared resolve payload](../../docs/architecture/03-modules.md) and OpenAPI `components.schemas.DeferredLink` in [`packages/openapi`](../openapi/).

## TypeScript

```bash
bun install
bun run typecheck   # types resolve from src/ (no dist required)
bun run build       # optional: emits dist/ for publish
```

```ts
import type { DeferredLink, ResolvePayload, MatchType } from "@taqlyn/sdk-contract";
```

## Go

Types live under [`go/`](./go/) (`package sdkcontract`):

```go
import sdkcontract "github.com/taqlyn/platform/packages/sdk-contract/go"

var link sdkcontract.DeferredLink
var payload sdkcontract.ResolvePayload // alias of DeferredLink
```

```bash
cd go && go test ./...
```

## Related

- [SdkCore contract](../../docs/architecture/modules/sdk-contract.md)
- [Folder map](../../docs/architecture/08-folder-map.md)
- [Phase 00](../../docs/phases/phase-00-foundations.md)
- Sibling: [`packages/openapi`](../openapi/)
