---
category: "user-guide"
description: "no-friendly-error-pages warns against using custom error pages withbyte size under a certain threshold."
layout: "docs"
originalFile: "docs/user-guide/rules/rule-no-friendly-error-pages.md"
permalink: "docs/user-guide/rules/rule-no-friendly-error-pages/index.html"
title: "Disallow small error pages"
tocTitle: "rules"
contentType: "details"
---
# Disallow small error pages (`@sonarwhal/rule-no-friendly-error-pages`)

`no-friendly-error-pages` warns against using custom error pages with
byte size under a certain threshold.

## Why is this important?

[`Internet Explorer 5-11` will show its custom error pages][friendly
error pages] instead of the site provided ones in order to avoid terse
server error messages such as `Error - 400` being shown to users.

The custom error pages are displayed whenever the response body’s byte
length is shorter than:

* `256` bytes for responses with the status code: `403`, `405`,
  or `410`
* `512` bytes for responses with the status code: `400`, `404`,
  `406`, `408`, `409`, `500`, `501`, or `505`

Similar behavior existed in older versions of other browsers, such
as [Chrome][chromium issue].

Although it's possible for users of `Internet Explorer` to disable the
`Show friendly HTTP error messages` functionality, it is not typical.

## How to use this rule?

To use it you will have to install it via `npm`:

```bash
npm install @sonarwhal/rule-no-friendly-error-pages
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
        "no-friendly-error-pages": "error"
    },
    ...
}
```

## What does the rule check?

The rule looks at all responses and checks if any of them have one
of the status codes specified above and their body’s byte length is
under the required threshold.

Additionally, the rule will try to generate an error response (more
specifically a `404` response), if one wasn’t found.

### Examples that **trigger** the rule

Response with the status code `403` and the body under `256` bytes:

```text
HTTP/... 403 Forbidden

...
```

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>403 Forbidden</title>
    </head>
    <body>This page has under 256 bytes, so it will not be displayed by all browsers.</body>
</html>
```

Response with the status code `500` and the body under `512` bytes:

```text
HTTP/... 500 Internal Server Error

...
```

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HTTP 500 - Internal Server Error</title>
    </head>
    <body>
        <h1>HTTP 500 - Internal Server Error</h1>
        <p>This page has under 512 bytes, therefore, it will not be displayed by some older browsers.</p>
    </body>
</html>
```

### Examples that **pass** the rule

Response with the status code `403` and the body over `256` bytes:

```text
HTTP/... 500 Internal Server Error

...
```

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HTTP 403 - Forbidden</title>
    </head>
    <body>
        <h1>HTTP 403 - Forbidden</h1>
        <p>......................................................................</p>
        <p>This page has over 256 bytes, so it will be displayed by all browsers.</p>
        <p>......................................................................</p>
        <p>......................................................................</p>
    </body>
</html>
```

Response with the status code `500` and the body over `512` bytes:

```text
HTTP/... 500 Internal Server Error

...
```

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HTTP 500 - Internal Server Error</title>
    </head>
    <body>
        <h1>HTTP 500 - Internal Server Error</h1>
        <p>......................................................................</p>
        <p>This page has over 512 bytes, so it will be displayed by all browsers.</p>
        <p>......................................................................</p>
        <p>......................................................................</p>
    </body>
</html>
```

## Further Reading

* [Friendly HTTP Error Pages][friendly error pages]

<!-- Link labels: -->

[chromium issue]: https://bugs.chromium.org/p/chromium/issues/detail?id=36558
[friendly error pages]: https://blogs.msdn.microsoft.com/ieinternals/2010/08/18/friendly-http-error-pages/
[sonarwhalrc]: https://sonarwhal.com/docs/user-guide/further-configuration/sonarwhalrc-formats/
