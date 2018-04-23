---
category: "user-guide"
description: "This rule validates the set-cookie header and confirms that theSecure and HttpOnly directives are defined when sent from asecure origin (HTTPS)."
layout: "docs"
originalFile: "docs/user-guide/rules/rule-validate-set-cookie-header.md"
permalink: "docs/user-guide/rules/rule-validate-set-cookie-header/index.html"
title: "Validate `Set-Cookie` Header"
tocTitle: "rules"
contentType: "details"
---
# Validate `Set-Cookie` Header (`@sonarwhal/rule-validate-set-cookie-header`)

This rule validates the `set-cookie` header and confirms that the
`Secure` and `HttpOnly` directives are defined when sent from a
secure origin (HTTPS).

## Why is this important?

A cookie is a small piece of information sent from a server to a
user agent. The user agent might save it and send it along with
future requests to identify the user session, track and analyze
user behavior or inform the server of the user preferences.
As a result, it contains sensitive data in a lot of the cases.
To create a cookie, the `Set-Cookie` header is sent from a
server in reponse to requests.

In the `Set-Cookie` header, a cookie is defined by a name associated
with a value. A web server can configure the `domain` and `path`
directives to restrain the scope of cookies. While session cookies
are deleted when a browser shuts down, the permanent cookies
expire at the time defined by `Expires` or `Max-Age`.

Among the directives, the `Secure` and `HttpOnly` attributes
are particularly relevant to the security of cookies:

* Setting `Secure` directive forbids a cookie to be transmitted via simple HTTP.
* Setting the `HttpOnly` directive prevents access to cookie value through javascript.

Applying both of these directives makes it difficult to exploit
cross-site scripting ([XSS][xss]) vulnerabilities and hijack the
authenticated user sessions. The [wiki][http cookie wiki] page
of `HTTP cookies` offers detailed examples of [cookie theft][cookie theft]
and [proxy request][proxy request] when cookies are not well protected.
According to the RFC [HTTP State Management Mechanism][HTTP State Management Mechanism],
"When using cookies over a secure channel, servers SHOULD set the Secure attribute
for every cookie". As a result, this rule checks if `Secure` and `HttpOnly` directives
are properly used, and also offers to validate the `Set-Cookie` header syntax.

Note: More information about `Set-cookie` header is available in
the [MDN web docs][set-cookie web doc].

## How to use this rule?

To use it you will have to install it via `npm`:

```bash
npm install @sonarwhal/rule-validate-set-cookie-header
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
        "validate-set-cookie-header": "error"
    },
    ...
}
```

## What does the rule check?

* `Secure` and `HttpOnly` cookies:

  * `Secure` and `HttpOnly` directives **should** be present if sites are secure.
  * `Secure` directive **should not** be present if sites are insecure.

* Cookie prefixes:

  * `__Secure-` and `__Host-` prefixes **can** be used only if sites are secure.
  * Cookies with the `__Host-` prefix **should** have a `path` of "/"
  (the entire host) and **should not** have a `domain` attribute.

    Read more: [cookie prefixes][cookie prefixes].

* Syntax validation:
  * Validate cookie name and value string.
  * Validate `Expires` value date format.

* Browser compatibility of `Max-Age` directive:
  * Some browsers (ie6, ie7, and ie8) doesn’t support `Max-Age`.

### Examples that **trigger** the rule

`Set-Cookie` header that doesn’t have a name-value string:

```text
HTTP/... 200 OK

...
Set-Cookie: Max-Age=0; Secure; HttpOnly
```

`Set-Cookie` header that doesn’t have the `Secure` directive:

```text
HTTP/... 200 OK

...
Set-Cookie: cookieName=cookieValue; HttpOnly
```

`Set-Cookie` header that doesn’t have the `HttpOnly` directive:

```text
HTTP/... 200 OK

...
Set-Cookie: cookieName=cookieValue; Secure
```

`Set-Cookie` header that has invalid `name` or `value` string:

```text
HTTP/... 200 OK

...
Set-Cookie: "cookieName"=cookieValue; Secure; HttpOnly
```

```text
HTTP/... 200 OK

...
Set-Cookie: cookieName=cookie value; Secure; HttpOnly
```

`Set-Cookie` header that has prefixes in the cookie name but is sent from pages
using `http` protocol:

From an insecure origin (HTTP):

```text
HTTP/... 200 OK

...
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
```

`Set-Cookie` header that has `__Host-` prefix in the cookie name but has `Path`
absent or `Domain` defined:

```text
HTTP/... 200 OK

...
Set-Cookie: __Host-id=1; Secure
```

```text
HTTP/... 200 OK

...
Set-Cookie: __Host-id=1; Secure; Path=/; domain=example.com
```

### Examples that **pass** the rule

```text
HTTP/... 200 OK

...
Set-Cookie: cookieName=cookieValue; Secure; HttpOnly
```

```text
HTTP/... 200 OK

...
Set-Cookie: cookieName="cookieValue"; Secure; HttpOnly
```

```text
HTTP/... 200 OK

...
Set-Cookie: __Host-ID=123; Secure; Path=/; HttpOnly
```

```text
HTTP/... 200 OK

...
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com; HttpOnly
```

<!-- Link labels: -->

[cookie prefixes]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Cookie_prefixes
[cookie theft]:https://en.wikipedia.org/wiki/HTTP_cookie#Cross-site_scripting:_cookie_theft
[http cookie wiki]:https://en.wikipedia.org/wiki/HTTP_cookie
[HTTP State Management Mechanism]:https://tools.ietf.org/html/rfc6265
[proxy request]:https://en.wikipedia.org/wiki/HTTP_cookie#Cross-site_scripting:_proxy_request
[set-cookie web doc]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
[sonarwhalrc]: https://sonarwhal.com/docs/user-guide/further-configuration/sonarwhalrc-formats/
[xss]:https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting
