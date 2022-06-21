# `@plandek-utils/ts-collections-utils`

[![npm version](https://badge.fury.io/js/%40plandek-utils%2Fts-collections-utils.svg)](https://badge.fury.io/js/%40plandek-utils%2Fts-collections-utils)
[![Build Status](https://travis-ci.org/plandek-utils/ts-collections-utils.svg?branch=main)](https://travis-ci.org/plandek-utils/ts-collections-utils)
[![Maintainability](https://api.codeclimate.com/v1/badges/5a1cbad6e4912247a7f2/maintainability)](https://codeclimate.com/github/plandek-utils/ts-collections-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5a1cbad6e4912247a7f2/test_coverage)](https://codeclimate.com/github/plandek-utils/ts-collections-utils/test_coverage)

[TypeDoc generated docs in here](https://plandek-utils.github.io/ts-collections-utils)

[Github repo here](https://github.com/plandek-utils/ts-collections-utils)

Small set of util functions to use with Arrays and other Collections. It uses lodash inside.

## Installation

`yarn add @plandek-utils/ts-collections-utils` or `npm install @plandek-utils/ts-collections-utils`.

## Usage

```typescript
import { anyOf, allOf, noneOf, isSubset, findAndRemove, isArrayOf } from "@plandek-utils/ts-collections-utils";

anyOf([1, 2, 3], (x) => x > 3); // => false
anyOf([1, 2, 3], (x) => x > 2); // => true
anyOf([1, 2, 3], (x) => x > 0); // => true

allOf([1, 2, 3], (x) => x > 3); // => false
allOf([1, 2, 3], (x) => x > 2); // => false
allOf([1, 2, 3], (x) => x > 0); // => true

noneOf([1, 2, 3], (x) => x > 3); // => true
noneOf([1, 2, 3], (x) => x > 2); // => false
noneOf([1, 2, 3], (x) => x > 0); // => false

isSubset({ set: [1, 2, 3], subset: [3, 1] }); // => true
isSubset({ set: [1, 2, 3], subset: [3, 1, 2] }); // => true
isSubset({ set: [1, 2, 3], subset: [3, 2, 4] }); // => false

findAndRemove([1, 2, 3], (x) => x > 3); // => [undefined, [1, 2, 3]]
findAndRemove([1, 2, 3], (x) => x > 2); // => [3, [1, 2]]
findAndRemove([1, 2, 3], (x) => x > 0); // => [1, [2, 3]]

isArrayOf([1, 2, 3], (x) => x > 3); // => false
isArrayOf([1, 2, 3], (x) => x > 2); // => false
isArrayOf([1, 2, 3], (x) => x > 0); // => true

// TS types
const list: any = [1, 2, 3];
const isNumber: (x: any) => x is number = (x) => typeof x === "number";
if (isArrayOf(list, isNumber) {
  // list is number[]
}

```

## Development, Commits, versioning and publishing

<details><summary>See documentation for development</summary>
<p>

See [The Typescript-Starter docs](https://github.com/bitjson/typescript-starter#bump-version-update-changelog-commit--tag-release).

### Commits and CHANGELOG

For commits, you should use [`commitizen`](https://github.com/commitizen/cz-cli)

```sh
yarn global add commitizen

#commit your changes:
git cz
```

As typescript-starter docs state:

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

```sh
# bump package.json version, update CHANGELOG.md, git tag the release
yarn run version
```

You may find a tool like [**`wip`**](https://github.com/bitjson/wip) helpful for managing work in progress before you're ready to create a meaningful commit.

### Creating the first version

Once you are ready to create the first version, run the following (note that `reset` is destructive and will remove all files not in the git repo from the directory).

```sh
# Reset the repo to the latest commit and build everything
yarn run reset && yarn run test && yarn run doc:html

# Then version it with standard-version options. e.g.:
# don't bump package.json version
yarn run version -- --first-release

# Other popular options include:

# PGP sign it:
# $ yarn run version -- --sign

# alpha release:
# $ yarn run version -- --prerelease alpha
```

And after that, remember to [publish the docs](#publish-the-docs).

And finally push the new tags to github and publish the package to npm.

```sh
# Push to git
git push --follow-tags origin main

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

### Publish the Docs

```sh
yarn run doc:html && yarn run doc:publish
```

This will generate the docs and publish them in github pages.

### Generate a version

There is a single yarn command for preparing a new release. See [One-step publish preparation script in TypeScript-Starter](https://github.com/bitjson/typescript-starter#one-step-publish-preparation-script)

```sh
# Prepare a standard release
yarn prepare-release

# Push to git
git push --follow-tags origin main

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

</p>
</details>
