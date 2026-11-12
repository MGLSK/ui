# Releasing

`@mglsk/ui` is published to npm as a **private** package (scoped, `access: restricted`) by GitHub Actions.

```
PR ──► CI (build · generated-files check · pack guard · all tests) ──► merge to main
                                                                   │
        git tag vX.Y.Z && git push origin vX.Y.Z                    ▼
                                      Release workflow: verify ► (approval) ► npm publish ► GitHub release
```

| Workflow | Trigger | What it does |
|---|---|---|
| `.github/workflows/ci.yml` | every PR, push to `main` | `npm ci`, install Chromium, `npm run build`, **fails if generated files (`dist/`, `components/`, `starter/assets/`) differ from what is committed**, `npm run check:pack`, `npm test` (starter, theming, 68-page sweep, interactions, axe + keyboard accessibility) |
| `.github/workflows/release.yml` | push of a `vX.Y.Z` tag, or manual run | re-runs all of the above on the tagged commit, checks tag = `package.json` version and that the commit is on `main`, packs the tarball, then (job 2) refuses to overwrite an existing version, runs `npm publish --access restricted`, and creates a GitHub release with the tarball and the CHANGELOG section as notes |

`tools/check-pack.mjs` (also run by `prepublishOnly`) inspects what `npm pack` would ship and refuses: an unscoped name or
`"private": true`, a stale `dist/` (banner version ≠ package version), source maps, `node_modules`, `tools/`, `.github/`, env files,
anything that looks like a credential, missing required files, an `exports` target that is not in the tarball, a missing CHANGELOG section.

## One-time setup (needs a human with the right accounts)

1. **npm scope and plan.** npm only allows private packages under a scope. Create the `mglsk` organisation on npmjs.com (so the
   package is `@mglsk/ui`) on a plan that includes private packages. If you use another scope, change `name` in `package.json`.
2. **npm token.** Create a *granular access token* with **read and write** permission for `@mglsk/ui` (or the `@mglsk` scope) and
   "bypass 2FA" enabled for automation. Set an expiry and put a reminder in the calendar.
3. **GitHub secret.** In `MGLSK/ui` → Settings → Environments → create **`npm`**, add the secret **`NPM_TOKEN`** there, and add
   *required reviewers* so every publish waits for an approval click. (A repository-level `NPM_TOKEN` also works.)
4. **Branch protection on `main`** (recommended): require pull requests and the **CI / Build, pack check, tests** check.
5. **Actions permissions.** The release job requests `contents: write` for the GitHub release; if the org restricts default
   workflow permissions, that explicit request is what allows it.
6. **Dry run first:** Actions → *Release* → *Run workflow* on `main` (dry run is ticked by default). It runs the full verification
   and `npm publish --dry-run`, and publishes nothing.

## Cutting a release

1. Branch, add a `## X.Y.Z — YYYY-MM-DD` section at the top of `CHANGELOG.md` (the pack guard and the release notes need it).
2. Bump and rebuild (the `version` script rebuilds `dist/`, whose banner carries the version):
   ```bash
   npm version minor --no-git-tag-version      # or patch | major | an explicit version
   git add -A && git commit -m "chore(IMP): release vX.Y.Z"
   ```
3. Open a PR, wait for CI, merge to `main`.
4. Tag the merge commit and push the tag:
   ```bash
   git switch main && git pull
   git tag vX.Y.Z && git push origin vX.Y.Z
   ```
5. Approve the `npm` environment in the Release run. Done: the package is on npm and the tarball is attached to the GitHub release.

Pre-releases: use a version like `0.4.0-rc.1` (tag `v0.4.0-rc.1`); the GitHub release is marked as a pre-release.

## Installing the package (consumers)

```bash
# once per machine/CI: authenticate with a token that has READ access to @mglsk packages
npm login                                   # or: echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
npm install @mglsk/ui
```

```js
import '@mglsk/ui/css';   // dist/css/mglsk-ui.min.css (fonts and logo resolve relative to it)
import '@mglsk/ui';       // dist/js/mglsk-ui.min.js — defines window.MGLSK
```

Or copy `node_modules/@mglsk/ui/dist/` next to your pages and link the two files as shown in the README.

## When something goes wrong

- **CI says "Generated files are out of date"** → run `npm run build`, commit the result.
- **Release says tag ≠ version** → the tag must be exactly `v` + the `package.json` version. Delete the tag (`git push --delete origin vX.Y.Z`), fix, re-tag.
- **E403 / E404 on publish** → the token cannot write to the scope, the org/plan does not allow private packages, or the token expired.
- **Bad version published** → `npm deprecate @mglsk/ui@X.Y.Z "reason"` (preferred) or `npm unpublish @mglsk/ui@X.Y.Z` (only possible
  within npm's unpublish window); then release a fixed version. Delete the GitHub release if needed.
- **Rotate the token** → create a new one, update the `NPM_TOKEN` secret, revoke the old one.

Note: npm *provenance* attestations are not generated, because npm does not support them for private packages.
