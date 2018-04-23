---
category: "user-guide"
description: "strict-transport-security warns against serving resources overHTTPS without strict-transport-security header and validates theheader directives and their corresponding values."
layout: "docs"
originalFile: "docs/user-guide/rules/rule-strict-transport-security.md"
permalink: "docs/user-guide/rules/rule-strict-transport-security/index.html"
title: "Require `Strict-Transport-Security` response header"
tocTitle: "rules"
contentType: "details"
---
# Require `Strict-Transport-Security` response header (`@sonarwhal/rule-strict-transport-security`)

`strict-transport-security` warns against serving resources over
HTTPS without `strict-transport-security` header and validates the
header directives and their corresponding values.

## Why is this important?

Web security should be a critical concern for web developers.
Unlike [cross-site scripting (XSS)][xss] and [SQL injection][sql
injection], the exploit of insufficient protection over the transport
layer can be harder to picture in practice. If a website accepts
a connection through HTTP and then redirects to HTTPS, it opens up
opportunites for a "man-in-the-middle" attack, when the redirect could
be exploited and lead the user to a malicious site.

By specifying the `Strict-Transport-Security` header along with a
`max-age` value in the response, a website can declare that
only secure connections within the specified time period will be
accepted. For future requests to the same domain via insecure
connections, the browser knows that it should never load the site using
HTTP and automatically convert all requests to HTTPS instead.

Notably, to prevent the `Strict-Transport-Security` header from being
stripped by the attacker on the user’s first visit, major browsers
include a "pre-loaded" list of sites that must be loaded via HTTPS.
You can submit your domain name in the [online form][preload form]
to be included in the list. After being included, all insecure
connection requests will be disallowed. Use with great caution:
Before you decide to have your own domain included, make sure that
you are able to support HTTPS for all the subdomains and that you'll
never again need the insecure scheme.

More information about HTTP Strict Transport (HSTS), please see:

* [HTTP Strict Transport Security wiki][hsts wiki]
* [HTTP Strict Transport Security Cheat Sheet][hsts cheat sheat]

## How to use this rule?

To use it you will have to install it via `npm`:

```bash
npm install @sonarwhal/rule-strict-transport-security
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
        "strict-transport-security": "error"
    },
    ...
}
```

## What does the rule check?

For a site served over HTTPS, this rule checks the following:

* If it has a `Strict-Transport-Security` header.
* If the header has the required `max-age` directive.
* If the `max-age` directive has a value that is longer than
  18 weeks (10886400s).
* If `Strict-Transport-Security` header has repetitive directives.
* When a `Strict-Transport-Security` header contains `preload`
  directive, this rule will first check the domain name against the
  [HTTP Strict Transport Security (HSTS) preload list][preload list]
  for the preload status, and then check whether this domain has errors
  that would prevent preloading by calling the hstspreload api
  endpoint. This check is disabled by default.

### Examples that **trigger** the rule

`Strict-Transport-Security` response header was not sent over `HTTPS`:

```text
HTTP/... 200 OK

...
```

`Strict-Transport-Security` response header is sent with a `max-age`
value that is too short:

```text
HTTP/... 200 OK

...
Strict-Transport-Security: max-age=1
```

`Strict-Transport-Security` response header is sent without `max-age`
directive:

```text
HTTP/... 200 OK

...
Strict-Transport-Security: maxage=31536000
```

`Strict-Transport-Security` response header is sent with duplicate
`includeSubDomains` directives:

```text
HTTP/... 200 OK

...
Strict-Transport-Security: includeSubDomains; max-age=31536000; includeSubDomains
```

### Examples that **pass** the rule

```text
HTTP/... 200 OK

...
Strict-Transport-Security: max-age=31536000
```

```text
HTTP/... 200 OK

...
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

```text
HTTP/... 200 OK

...
 Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## How to configure the server to pass this rule

<!-- markdownlint-disable MD033 -->
<details><summary>How to configure Apache</summary>

Apache can be configured to serve resources with the
`Strict-Transport-Security` header with a specific value
using the [`Header` directive][header directive], e.g.:

```apache
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

Note that:

* The above snippet works with Apache `v2.2.0+`, but you need to have
  [`mod_headers`][mod_headers] [enabled][how to enable apache modules]
  in order for it to take effect.

* If you have access to the [main Apache configuration file][main
  apache conf file] (usually called `httpd.conf`), you should add
  the logic in, for example, a [`<Directory>`][apache directory]
  section in that file. This is usually the recommended way as
  [using `.htaccess` files slows down][htaccess is slow] Apache!

  If you don't have access to the main configuration file (quite
  common with hosting services), add the snippets in a `.htaccess`
  file in the root of the web site/app.

</details>
<details><summary>How to configure IIS</summary>

IIS can be configured to serve resources with the `Strict-Transport-Security`
header with a specific value using the [`<customHeader> element`][customHeader].
E.g.:

```xml
<configuration>
     <system.webServer>
        <httpProtocol>
             <customHeaders>
                <add name="Strict-Transport-Security" value="max-age=31536000"/>
             </customHeaders>
         </httpProtocol>
    </system.webServer>
</configuration>
```

Note that:

* The above snippet works with IIS 7+.
* You should use the above snippet in the `web.config` of your
  application.

</details>

<!-- markdownlint-enable MD033 -->

## Can the rule be configured?

Yes, you can configure the value that `max-age` is checked against
with in the [`.sonarwhalrc`][sonarwhalrc] file. By default, this limit
is set as 18 weeks (10886400s);

E.g. The following configuration will change the `max-age` value
limit to `123456`.

```json
{
    "connector": {...},
    "formatters": [...],
    "rules": {
        "strict-transport-security": ["error", {
            "minMaxAgeValue": 123456
        }],
        ...
    },
    ...
}
```

Also, you can configure the rule so that if `preload` directive is
included in the header, it will check whether this domain has errors
that would prevent preloading by calling the hstspreload api endpoint.
This validation is disabled by default.

E.g. The following configuration will enable the `preload` validation.

```json

{
    "connector": {...},
    "formatters": [...],
    "rules": {
        "strict-transport-security": ["error", {
            "checkPreload": true
        }],
        ...
    },
    ...
}
```

## Further Reading

* [The beginners guide to breaking website security with nothing more than a Pineapple][pineapple]
* [Understanding HTTP Strict Transport Security(HSTS) and preloading it into the browser][understading hsts]

<!-- Link labels: -->

[hsts cheat sheat]: https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet
[hsts wiki]: https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
[pineapple]: https://www.troyhunt.com/the-beginners-guide-to-breaking-website/
[preload form]:https://hstspreload.org/
[preload list]:https://cs.chromium.org/codesearch/f/chromium/src/net/http/transport_security_state_static.json
[sonarwhalrc]: https://sonarwhal.com/docs/user-guide/further-configuration/sonarwhalrc-formats/
[sql injection]: https://www.owasp.org/index.php/SQL_Injection
[understading hsts]: https://www.troyhunt.com/understanding-http-strict-transport/
[xss]: https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29

<!-- Apache links -->

[apache directory]: https://httpd.apache.org/docs/current/mod/core.html#directory
[header directive]: https://httpd.apache.org/docs/current/mod/mod_headers.html#header
[how to enable apache modules]: https://github.com/h5bp/server-configs-apache/wiki/How-to-enable-Apache-modules
[htaccess is slow]: https://httpd.apache.org/docs/current/howto/htaccess.html#when
[main apache conf file]: https://httpd.apache.org/docs/current/configuring.html#main
[mod_headers]: https://httpd.apache.org/docs/current/mod/mod_headers.html
[mod_mime]: https://httpd.apache.org/docs/current/mod/mod_mime.html

<!-- IIS links -->

[customHeader]: https://docs.microsoft.com/en-us/iis/configuration/system.webserver/httpprotocol/customheaders/
