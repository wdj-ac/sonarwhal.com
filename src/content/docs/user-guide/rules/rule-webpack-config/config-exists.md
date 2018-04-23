---
category: "user-guide"
layout: "docs"
originalFile: "docs/user-guide/rules/rule-webpack-config/config-exists.md"
permalink: "docs/user-guide/rules/rule-webpack-config/config-exists/index.html"
title: "`config-exists`"
tocTitle: "rules"
contentType: "details"
---
# `config-exists`

## Why is this important?

If you want to use `webpack` in you project, you need to have a configuration.

## What does the rule check?

This rule check if the Webpack configuration file `webpack.config.js` exists
in your project.

### Examples that **trigger** the rule

`webpack.config.js` doesn't exist in your project.

### Examples that **pass** the rule

`webpack.config.js` exists in your project.