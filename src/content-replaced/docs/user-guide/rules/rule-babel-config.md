---
category: "user-guide"
description: "babel-config contains rules to check if your Babel configuration hasthe most recommended configuration.To use it you will have to install it via npm:bashnpm install @sonarwhal/rule-babel-configNote: You can make npm install it as a devDependency using the --save-devparameter, or to install it globally, you can use the -g parameter. Forother options seenpm's documentation.And then activate it via the .sonarwhalrcconfiguration file:json{    \"connector\": {...},    \"formatters\": [...],    \"parsers\": [...],    \"rules\": {        \"babel-config/is-valid\": \"error\"    },    ...}"
layout: "docs"
originalFile: "docs/user-guide/rules/rule-babel-config.md"
permalink: "docs/user-guide/rules/rule-babel-config/index.html"
title: "babel-config"
tocTitle: "rules"
contentType: "details"
---
# babel-config (`@sonarwhal/rule-babel-config`)

`babel-config` contains rules to check if your Babel configuration has
the most recommended configuration.

To use it you will have to install it via `npm`:

```bash
npm install @sonarwhal/rule-babel-config
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
        "babel-config/is-valid": "error"
    },
    ...
}
```

## Why is this important?

Babel needs to be properly configured to reflect user's preference.

## Rules

* [babel-config/is-valid][is-valid]

## Further Reading

* [Babel Documentation][babel documentation]

<!-- Link labels: -->

[babel documentation]: https://babeljs.io/docs/usage/babelrc/
[is-valid]: ./docs/is-valid.md
[sonarwhalrc]: https://sonarwhal.com/docs/user-guide/further-configuration/sonarwhalrc-formats/