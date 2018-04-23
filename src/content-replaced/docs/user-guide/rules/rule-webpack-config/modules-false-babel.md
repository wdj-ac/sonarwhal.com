---
category: "user-guide"
layout: "docs"
originalFile: "docs/user-guide/rules/rule-webpack-config/modules-false-babel.md"
permalink: "docs/user-guide/rules/rule-webpack-config/modules-false-babel/index.html"
title: "`modules-false-babel`"
tocTitle: "rules"
contentType: "details"
---
# `modules-false-babel`

## Why is this important?

Webpack 2+ supports ES Modules out of the box and
therefore doesn't require you to transpile import/export statements resulting
in smaller builds, and better 🌳 shaking.

## What does the rule check?

This checks if you are not setting "modules: false" in your babelrc when you
are using webpack 2+.

### Example that **trigger** the rule

`babel-config` parser not added to `.sonarwhalrc`.

```json
{
    "connector": {...},
    "formatters": [...],
    "parsers": ["webpack-config"],
    "rules": {
        "webpack-config/module-esnext-typescript": "error",
        ...
    },
    ...
}
```

`babel-config` configured but `modules` has a value different to `esnext`

```json
{
    "presets": [
      ["env", {
        "targets": {
          "browsers": ["last 2 versions", "> 5% in BE"],
          "uglify": true
        },
        "modules": "commonjs"
      }]
    ],
    ...
}
```

### Examples that **pass** the rule

`babel-config` configured and `modules` is set to `false`

```json
{
    "presets": [
      ["env", {
        "targets": {
          "browsers": ["last 2 versions", "> 5% in BE"],
          "uglify": true
        },
        "modules": false
      }]
    ],
    ...
}
```

## Further Reading

* [Webpack Documentation][webpack docs]
* [Babel and Webpack][babel docs]

[webpack docs]: https://webpack.js.org/concepts/
[babel docs]: https://webpack.js.org/loaders/babel-loader/