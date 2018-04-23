---
category: "user-guide"
layout: "docs"
originalFile: "docs/user-guide/further-configuration/sonarwhalrc-formats.md"
permalink: "docs/user-guide/further-configuration/sonarwhalrc-formats/index.html"
title: ".sonarwhalrc formats"
tocTitle: "further configuration"
contentType: "details"
---
# .sonarwhalrc formats

The `.sonarwhalrc` file supports the different file formats:

```json
{
    "connector": {
        "name": "connectorName"
    },
    "formatters": ["formatterName"],
    "rules": {
        "rule1": "error",
        "rule2": "warning",
        "rule3": "off"
    },
    "rulesTimeout": 120000
}
```
