---
category: "user-guide"
layout: "docs"
originalFile: "docs/user-guide/rules/rule-typescript-config/is-valid.md"
permalink: "docs/user-guide/rules/rule-typescript-config/is-valid/index.html"
title: "`is-valid`"
tocTitle: "rules"
contentType: "details"
---
# `is-valid`

## Why is this important?

If you are building an app or a website using TypeScript, you
need to be sure the configuration file is valid.

### What does the rule check?

This rule checks if the TypeScript configuration is valid.
To do this we are using the
[tsconfig schema][typescript schema] but adding the property
`"additionalProperties": false,` to the options `compilerOptions`
and `typeAcquisition`.

### Examples that **trigger** the rule

The `compileOptions` has an invalid property:

```json
{
    "compilerOptions": {
        "invalidProperty": true
    }
}
```

A property has an invalid value:

```json
{
    "compilerOptions": {
        "target": "esnext2"
    }
}
```

### Examples that **pass** the rule

The configuration is valid:

```json
{
    "compilerOptions": {
        "target": "esnext"
    }
}
```

## Further Reading

* [TypeScript Documentation][typescript docs]

[typescript docs]: https://www.typescriptlang.org/docs/home.html
[typescript schema]: http://json.schemastore.org/tsconfig