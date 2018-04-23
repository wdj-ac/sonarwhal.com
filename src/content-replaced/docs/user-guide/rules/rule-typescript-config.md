---
category: "user-guide"
description: "typescript-config contains rules to check if your TypeScript configurationhas the most recommended configuration.To use it you will have to install it via npm:bashnpm install @sonarwhal/rule-typescript-configNote: You can make npm install it as a devDependency using the --save-devparameter, or to install it globally, you can use the -g parameter. Forother options seenpm's documentation.And then activate it via the .sonarwhalrcconfiguration file:json{    \"connector\": {...},    \"formatters\": [...],    \"parsers\": [...],    \"rules\": {        \"typescript-config/is-valid\": \"error\",        \"typescript-config/no-comment\": \"error\",        \"typescript-config/target\": \"error\"    },    ...}"
layout: "docs"
originalFile: "docs/user-guide/rules/rule-typescript-config.md"
permalink: "docs/user-guide/rules/rule-typescript-config/index.html"
title: "typescript-config"
tocTitle: "rules"
contentType: "details"
---
# typescript-config (`@sonarwhal/rule-typescript-config`)

`typescript-config` contains rules to check if your TypeScript configuration
has the most recommended configuration.

To use it you will have to install it via `npm`:

```bash
npm install @sonarwhal/rule-typescript-config
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
        "typescript-config/is-valid": "error",
        "typescript-config/no-comment": "error",
        "typescript-config/target": "error"
    },
    ...
}
```

## Why is this important?

If you are building an app or a website using TypeScript, you
need to be sure that your configuration is the best for your needs.

## Rules

* [typescript-config/is-valid][is-valid]
* [typescript-config/no-comment][no-comment]
* [typescript-config/target][terget]

## Further Reading

* [TypeScript Documentation][typescript docs]

<!-- Link labels: -->

[is-valid]: ./docs/is-valid.md
[no-comment]: ./docs/no-comment.md
[sonarwhalrc]: https://sonarwhal.com/docs/user-guide/further-configuration/sonarwhalrc-formats/
[target]: ./docs/target.md
[typescript docs]: https://www.typescriptlang.org/docs/home.html
