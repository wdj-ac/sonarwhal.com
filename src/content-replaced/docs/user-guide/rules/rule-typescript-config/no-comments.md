---
category: "user-guide"
layout: "docs"
originalFile: "docs/user-guide/rules/rule-typescript-config/no-comments.md"
permalink: "docs/user-guide/rules/rule-typescript-config/no-comments/index.html"
title: "`no-comments`"
tocTitle: "rules"
contentType: "details"
---
# `no-comments`

`typescript-config/no-comments` checks that the property `removeComments`
is enabled in your TypeScript configuration file (i.e `tsconfig.json`).

### Why is this important?

Removing the comments will make your final JavaScript files smaller. If you
are delivering this files over the Internet, you want them to be a small as
possible.

### What does the rule check?

This rule checks the `compilerOptions` property `removeComments` is enabled.

#### Examples that **trigger** the rule

By default TypeScript doesn't strip the comments:

```json
{
    ...
    "compilerOptions": {
        "target": "es5"
    }
    ...
}
```

Also setting the value to `false` will fail:

```json
{
    ...
    "compilerOptions": {
        "removeComments": false
    }
    ...
}
```

#### Examples that **pass** the rule

`removeComments` value is `true`:

```json
{
    "compilerOptions": {
        "removeComments": true
    }
}
```

## Further Reading

* [TypeScript Documentation][typescript docs]

[typescript docs]: https://www.typescriptlang.org/docs/home.html