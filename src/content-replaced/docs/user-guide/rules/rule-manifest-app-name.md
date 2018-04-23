---
category: "user-guide"
description: "manifest-app-name checks if the name of the web application isspecified within the manifest file."
layout: "docs"
originalFile: "docs/user-guide/rules/rule-manifest-app-name.md"
permalink: "docs/user-guide/rules/rule-manifest-app-name/index.html"
title: "Require manifest to specify the web site/app name"
tocTitle: "rules"
contentType: "details"
---
# Require manifest to specify the web site/app name (`@sonarwhal/rule-manifest-app-name`)

`manifest-app-name` checks if the name of the web application is
specified within the manifest file.

## Why is this important?

Browsers that support the [web app manifest file][manifest spec] will
use the value of the [`name`][manifest name] property (or
[`short_name`][manifest short_name]'s value, when there is insufficient
space) to display the name of the app in various places across the OS
such as the list of apps installed, an app icon label etc.

If these properties are not defined, browsers will try to get the name
from other sources such as the value of the [`application-name` meta tag,
`<title>`, or default to a specific value (e.g.: `Untitled`)][manifest
metadata]. This can lead to a bad user experience, as the app name may
be truncated or wrong.

So, in order to reduce the risk of having the app name truncated, it's
recommended to define the `name` property and keep it's value under 30
characters, and if it’s over 12 characters, include a `short_name`
property that is at most 12 characters.

Notes:

* If the `name` property value is under or 12 characters, there is
  no need to provide the `short_name` property as browsers can use
  the value of `name`.

* The 12 character limit is used to ensure that for most cases the
  value won’t be truncated. However depending on [other
  things][sonarwhal issue], such as:

  * what font the user is using
  * what characters the web site/app name includes (e.g. `i` occupies
    less space then `W`)

  the text may still be truncated even if it’s under 12 characters.

* The above recommended limits are set to be consistent with the native
  OSes and/or store limits/recommendations, e.g.:

  * For [Windows][windows] and the [Microsoft Store (which now also
    includes progressive web apps)][microsoft store] the recommendation
    is to have the value of the `name` property be up to 256 characters
    while the value of the `short_name` property can be up to 40 characters.

  * [Android][android] and [iOS][ios] also recommend the application
    name be under 30 characters.

## How to use this rule?

To use it you will have to install it via `npm`:

```bash
npm install @sonarwhal/rule-manifest-app-name
```

Note: You can make `npm` install it as a `devDependency` using the `--save-dev`
parameter, or to install it globally, you can use the `-g` parameter. For
other options see
[`npm`'s documentation](https://docs.npmjs.com/cli/install).

And then activate it via the [`.sonarwhalrc`][sonarwhalrc]
configuration file:

```json
{
    "connector": {...},
    "formatters": [...],
    "parsers": [...],
    "rules": {
        "manifest-app-name": "error"
    },
    ...
}
```

## What does the rule check?

The rule checks if a non-empty `name` member was specified and it’s
value is under 30 characters.

If the `name` member is over 12 characters, or `short_name` is
specified, the rule will also check if `short_name` has a non-empty
value that is under 12 characters.

### Examples that **trigger** the rule

Manifest is specified without `name` and `short_name`:

```json
{
    ...
}
```

Manifest is specified with a `name` longer than 12 characters
and no `short_name`:

```json
{
    "name": "Baldwin Museum of Science",
    ...
}
```

Manifest is specified with a `name` longer than 30 characters:

```json
{
    "name": "Baldwin Museum of Science - visit today!",
    "short_name": "Baldwin"
    ...
}
```

Manifest is specified with `short_name` longer than 12 characters:

```json
{
    "name": "Baldwin Museum of Science",
    "short_name": "Baldwin Museum"
    ...
}
```

### Examples that **pass** the rule

Manifest is specified with a `name` shorter than 30 characters
and a `short_name` shorter than 12 characters:

```json
{
    "name": "Baldwin Museum of Science",
    "short_name": "Baldwin"
    ...
}
```

Note: [Not specifying a manifest file](manifest-exists.md), or having
an invalid one are covered by other rules, so those cases won’t make
this rule fail.

## Further Reading

* [Web App Manifest specification][manifest spec]

<!-- Link labels: -->

[android]: https://support.google.com/googleplay/android-developer/answer/113469?hl=en#store_listing
[ios]: https://developer.apple.com/app-store/product-page/
[manifest metadata]: https://w3c.github.io/manifest/#authority-of-the-manifest%27s-metadata
[manifest name]: https://w3c.github.io/manifest/#name-member
[manifest short_name]: https://w3c.github.io/manifest/#short_name-member
[manifest spec]: https://w3c.github.io/manifest/
[microsoft store]: https://www.windowscentral.com/first-batch-windows-10-progressive-web-apps-here
[sonarwhal issue]: https://github.com/sonarwhal/sonarwhal/issues/136
[sonarwhalrc]: https://sonarwhal.com/docs/user-guide/further-configuration/sonarwhalrc-formats/
[windows]: https://blogs.windows.com/msedgedev/2018/02/06/welcoming-progressive-web-apps-edge-windows-10/
