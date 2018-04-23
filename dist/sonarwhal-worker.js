/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404/index.html","e80aaee1f278cddf55ae7f91a8248e65"],["/about/changelog/index.html","a95ef73a70518d29a9a0d256fcc94f8f"],["/about/contributors/index.html","6bdd9ed765956c005ac33688c7895176"],["/about/faq/index.html","5cfa7c85b60ce058eb8f0f5d056f84cf"],["/about/governance/index.html","2770451b96418312b7c18f98ac1ee806"],["/about/index.html","cb0b16ce3358e76ae1713d54302fafda"],["/docs/contributor-guide/getting-started/architecture/index.html","a9235373d171daa05fd6bb143db2dc31"],["/docs/contributor-guide/getting-started/development-environment/index.html","912811d4ee825b76d20fa09e22b950e5"],["/docs/contributor-guide/getting-started/events/index.html","0783b10195c930abeebfcebb58eb145b"],["/docs/contributor-guide/getting-started/images/architecture.svg","cc43a45a2a911dbfc475ac6ed11e982b"],["/docs/contributor-guide/getting-started/pull-requests/index.html","ece175ca01fa34104e7addd72e123647"],["/docs/contributor-guide/guides/create-custom-rule/index.html","561bb12e7743069a689450c69206cd21"],["/docs/contributor-guide/how-to/common-rule-scenarios/index.html","044d22cb859cabb4c4b510697c459238"],["/docs/contributor-guide/how-to/connector/index.html","02ae4a31cca415ec778f56da99eebf44"],["/docs/contributor-guide/how-to/formatter/index.html","cb7c6cc7f57aa6e3f5d31e0d8ad40dbd"],["/docs/contributor-guide/how-to/parser/index.html","cd3762e8e43fe76cb7cbc3472786c355"],["/docs/contributor-guide/how-to/rule/index.html","c3453824a00ad11079ffaca471438e2d"],["/docs/contributor-guide/how-to/test-rules/index.html","4a9e1d3ffed016f2acbdd941c4b078e3"],["/docs/contributor-guide/index.html","5167f08e077b95eba9998bd684d867e1"],["/docs/index.html","aa46dca5a22564cbe7c7bff651a9e5ff"],["/docs/user-guide/concepts/configurations/index.html","c8970679f4b714116fb7feee7ac8db84"],["/docs/user-guide/concepts/connectors/index.html","1c1d4df6dc0163c8b75a1b5eec209f5d"],["/docs/user-guide/concepts/formatters/index.html","cbb7d38feeeb284b6763f9e692f583db"],["/docs/user-guide/concepts/images/codeframe.png","315a10f36b74628021263fe40b9a1e1a"],["/docs/user-guide/concepts/images/excel-details.png","5c17afec52ebc87fe4ee2474b943bb19"],["/docs/user-guide/concepts/images/excel-summary.png","f3153707face35a9785acb45734c1687"],["/docs/user-guide/concepts/images/json-output.png","6f15a72cc88f165ff2b4514256690306"],["/docs/user-guide/concepts/images/stylish-output.png","c0333ea99083c8392c56284f147f4e51"],["/docs/user-guide/concepts/images/summary-output.png","3e8d086067f9b19fa15626ab4398ea26"],["/docs/user-guide/concepts/parsers/index.html","dbb18485aa582880a24217aec84c3917"],["/docs/user-guide/concepts/rules/index.html","59c95642232c3f7675ccb6d7a93e4b80"],["/docs/user-guide/further-configuration/browser-context/index.html","f7e59a6f225b818692ad62a8ceacca1f"],["/docs/user-guide/further-configuration/ignoring-domains/index.html","3c7831c4e35a81a23eef919a5707a589"],["/docs/user-guide/further-configuration/rules-timeout/index.html","05d55c3df2552609c3b7b92ed008a6c2"],["/docs/user-guide/further-configuration/sonarwhalrc-formats/index.html","8123e989c2425fec5e3d21a96c42822c"],["/docs/user-guide/further-configuration/website-authentication/index.html","f54f225ed4201baef597486b97e4170e"],["/docs/user-guide/images/summary-output.png","3e8d086067f9b19fa15626ab4398ea26"],["/docs/user-guide/index.html","5d7183d80744a7583ff9e10b40b88c6f"],["/docs/user-guide/rules/accessibility/index.html","ca852d0f0e66c257cd3bcf1f86302a64"],["/docs/user-guide/rules/development/index.html","6e37f62d8f5038c6b7da07cbe0140796"],["/docs/user-guide/rules/images/no_theme-color.png","a57002e7b773839a22366cc2368269c5"],["/docs/user-guide/rules/images/theme-color.png","169d0f3a4ab61a0cccd3637688da589b"],["/docs/user-guide/rules/index.html","8596ad52da0881e16caea53e4bcaeacd"],["/docs/user-guide/rules/interoperability/index.html","2019508496f52135d41f12aeb3c8fbbb"],["/docs/user-guide/rules/performance/index.html","c734bd1ae2edbc09579009f75e39b5aa"],["/docs/user-guide/rules/pwa/index.html","9b8ccd9f122fcaa721df1d3271039ccb"],["/docs/user-guide/rules/rule-amp-validator/index.html","c1557cccf09f7fc4ebecf6e9d0727385"],["/docs/user-guide/rules/rule-apple-touch-icons/index.html","4d13f10e601c522d4e54751c9aadd4b9"],["/docs/user-guide/rules/rule-axe/index.html","4ada4ac452762d85f0b53819db0d54df"],["/docs/user-guide/rules/rule-babel-config/index.html","dc18944b6075f0f86750a2e53e5e554a"],["/docs/user-guide/rules/rule-babel-config/is-valid/index.html","1b12e6e4d0e7f129c11a8de70d5b84b3"],["/docs/user-guide/rules/rule-content-type/index.html","b2043cb34c04dbd24361b95ba4c7489d"],["/docs/user-guide/rules/rule-disown-opener/index.html","b89ff54a4c775920b8c9f468a847f2e5"],["/docs/user-guide/rules/rule-highest-available-document-mode/index.html","1152b6c03f3022af2b6bfb2ec111af6f"],["/docs/user-guide/rules/rule-html-checker/index.html","1c4534373d6391bf5605301d4b3372a1"],["/docs/user-guide/rules/rule-http-cache/index.html","50be2f98a29beee2cfcf49cbb515cf7f"],["/docs/user-guide/rules/rule-http-compression/index.html","1e72475c8d8c0bb87c0270dc2fe040fd"],["/docs/user-guide/rules/rule-image-optimization-cloudinary/index.html","1321f481b38519d9fc5c85c4fd1d881c"],["/docs/user-guide/rules/rule-manifest-app-name/index.html","4e558857e06cd8c7cb8dee4fdfe8c507"],["/docs/user-guide/rules/rule-manifest-exists/index.html","59fda7580fb882a19ca5a0ede64268d5"],["/docs/user-guide/rules/rule-manifest-file-extension/index.html","77cf71df1e8c704711d00883fd2d203a"],["/docs/user-guide/rules/rule-manifest-is-valid/index.html","8b1837ee32dac3ca7df19cb2cb738a15"],["/docs/user-guide/rules/rule-meta-charset-utf-8/index.html","7a1cd5f7f0c593e7539d43e4279af672"],["/docs/user-guide/rules/rule-meta-theme-color/index.html","39bf202256fce806e071e02e54e5a96a"],["/docs/user-guide/rules/rule-meta-viewport/index.html","5b4c2ff6df15140c483f74d20fb15077"],["/docs/user-guide/rules/rule-no-bom/index.html","966b36aa903a69bd17ad008d21771dfa"],["/docs/user-guide/rules/rule-no-disallowed-headers/index.html","bf44215230c9851f6ed1a17d17907b46"],["/docs/user-guide/rules/rule-no-friendly-error-pages/index.html","14c8d996965c3be8b25b3af50207625c"],["/docs/user-guide/rules/rule-no-html-only-headers/index.html","87fc532817f89983754587f6764e3109"],["/docs/user-guide/rules/rule-no-http-redirects/index.html","c7ceb52ee895ae9cc73d9ff18decde6b"],["/docs/user-guide/rules/rule-no-protocol-relative-urls/index.html","0f3b9f7966a5b9e1663d5d96189bf6d4"],["/docs/user-guide/rules/rule-no-vulnerable-javascript-libraries/index.html","e7d4868562d473936d94a39759cbf820"],["/docs/user-guide/rules/rule-performance-budget/index.html","fdcaf602bc0f7cc6cdf4cfbb50a409d9"],["/docs/user-guide/rules/rule-sri/index.html","5b00017b71b71b735d1cc0c0b5dba565"],["/docs/user-guide/rules/rule-ssllabs/index.html","12ad8b498029409d7fed6d14c9277485"],["/docs/user-guide/rules/rule-strict-transport-security/index.html","becd9e65cce9cc1b3d840d7af4f4af40"],["/docs/user-guide/rules/rule-typescript-config/index.html","6c9d1c073e8e6a8ee832eccf74e1fbc0"],["/docs/user-guide/rules/rule-typescript-config/is-valid/index.html","929be7ce8f78a08bb818bb4666a21907"],["/docs/user-guide/rules/rule-typescript-config/no-comments/index.html","a4e9c38926eaa6b26341a22326846164"],["/docs/user-guide/rules/rule-typescript-config/target/index.html","31c6c052309a0325c733c6fcd347d908"],["/docs/user-guide/rules/rule-validate-set-cookie-header/index.html","4045076d2eb624f31990b992e7f1e2a4"],["/docs/user-guide/rules/rule-webpack-config/config-exists/index.html","6222ea670aa4129dd3f8413d3aacebd2"],["/docs/user-guide/rules/rule-webpack-config/index.html","71feaeac69cb82ba4b51175a96e95609"],["/docs/user-guide/rules/rule-webpack-config/is-installed/index.html","a6ec8c21c1ffde1bafb5b11ca30dca04"],["/docs/user-guide/rules/rule-webpack-config/is-valid/index.html","c8750f84cfa090b4191b25b54a6300a2"],["/docs/user-guide/rules/rule-webpack-config/module-esnext-typescript/index.html","e0f13f851501e75a6764cff6d0a10e70"],["/docs/user-guide/rules/rule-webpack-config/modules-false-babel/index.html","06fbdc0b298e04f46b31bf8d48854988"],["/docs/user-guide/rules/rule-webpack-config/no-devtool-in-prod/index.html","0ffebf1a026c51e27eb0aa29da32d7f7"],["/docs/user-guide/rules/rule-x-content-type-options/index.html","c19398d97b2564689e63fc96b07980bf"],["/docs/user-guide/rules/security/index.html","b5b0f2c6f2d60dddd71c055934614046"],["/index.html","0bc3238c56527119c1e5ab8e6d3bbb7c"],["/static/images/404-space-narwhal-b7cdd3eae9.svg","b7cdd3eae90125e59c5a9f2e345040ae"],["/static/images/about-changelog-357a47ef32.svg","357a47ef3242c7f647eb3c71e2cc59ae"],["/static/images/about-codeofconduct-28a0a629e2.svg","28a0a629e29e32c101b60257697e43e2"],["/static/images/about-contributors-8b253f09d8.svg","8b253f09d802ae5098d4de6e931ab3e5"],["/static/images/about-faq-5a0f6727df.svg","5a0f6727dfd7da0f6f60f428560cd26b"],["/static/images/about-governance-8f913c462b.svg","8f913c462bee3c55c6bbf52fe698b466"],["/static/images/accessibility-a17d591e64.svg","a17d591e6486da4497aff448c45527ed"],["/static/images/apple-touch-icon-c01d89d4f3.png","c01d89d4f329d5e07ff4c98a6a771c2b"],["/static/images/architecture-cc43a45a2a.svg","cc43a45a2a911dbfc475ac6ed11e982b"],["/static/images/axe-5f168d53b0.png","5f168d53b0f9faf861b97134304f211d"],["/static/images/back-to-top-3a8e30039f.svg","3a8e30039f859df7dc0f14a2f8736b8b"],["/static/images/breaking-changes-icon-49342fae5b.svg","49342fae5b66f8dc954100723c259153"],["/static/images/bug-fixes-icon-892fda06f5.svg","892fda06f5357ae31740488bcb29d5a5"],["/static/images/click-1-d3f89d4dba.svg","d3f89d4dbaaf9f059dba2e06ccd98f78"],["/static/images/click-2-bbf0b0ad5b.svg","bbf0b0ad5b91df70e4f0653b0e0322cc"],["/static/images/click-3-fec01ad753.svg","fec01ad75327911b3a8ccd14bca3d6a5"],["/static/images/close-accordion-2658484589.svg","26584845897c777f096f42d2c182abd7"],["/static/images/cloudinary_logo_for_white_bg-64128131fa.svg","64128131fa29403f0bb4329506212ea0"],["/static/images/codeframe-315a10f36b.png","315a10f36b74628021263fe40b9a1e1a"],["/static/images/dev-guide-icon-26315b29b0.svg","26315b29b0969574e53c63155687f331"],["/static/images/dev-icon-d605eed778.svg","d605eed7787d3b056465db0b59e714f7"],["/static/images/developer-nellie-560300cef6.svg","560300cef684b5e36d70eda65f58721d"],["/static/images/excel-details-396322510d.png","396322510da50050a9f52f3310aa2a14"],["/static/images/excel-summary-6f023bede4.png","6f023bede402408e6a1e2e6f9c47b369"],["/static/images/favicon-16x16-9df79ec1da.png","9df79ec1dab76976e99056ee71dd57ce"],["/static/images/favicon-32x32-57258f2c0e.png","57258f2c0e3f3787e9150c6223731980"],["/static/images/favicon-dd9d5dff4e.ico","dd9d5dff4eb2d4230e2a124c171cf06a"],["/static/images/favicon_failed-13305bf6b9.ico","13305bf6b9ac0b13e7ab66d81dc3ba26"],["/static/images/favicon_passed-701f9141e2.ico","701f9141e2209ad6f2fcfcbfab8989aa"],["/static/images/favicon_pending-a9358b857e.ico","a9358b857e7cd0824e6bd5dec4a0c0a8"],["/static/images/github-19157abb97.svg","19157abb973d14e3d6ab1c7837592cf1"],["/static/images/home-hello-nellie-87201a8cb4.svg","87201a8cb4aefdfd64c1b83fe501c966"],["/static/images/iceberg-left-813b080aee.svg","813b080aee13bb51a443059f43c23fce"],["/static/images/iceberg-middle-4b00984d12.svg","4b00984d128ab941367dc11307b296fe"],["/static/images/iceberg-right-73d1efd3b6.svg","73d1efd3b6f6811101e1d8d3e5643eaf"],["/static/images/interoperability-60b5c045a0.svg","60b5c045a0eff1b0a39502268f435e9e"],["/static/images/jsf_logo_white-a73061e34d.svg","a73061e34dd8bb7a9110f3bc7bf3d535"],["/static/images/json-output-6f15a72cc8.png","6f15a72cc88f165ff2b4514256690306"],["/static/images/manifest-icon-a3d1c16640.png","a3d1c16640a2aa4795bb97611971dbf1"],["/static/images/mobile-menu-button-d6ab70cb95.svg","d6ab70cb959ff61f9adfa7dac4f51e24"],["/static/images/narwhal-d36a9b963f.svg","d36a9b963ffecbec4fa6b42894b70acf"],["/static/images/nav-arrow-3f14ca4bed.svg","3f14ca4bed391c0bb585d149c0007f41"],["/static/images/nellie-construction-fa2db9e1c5.svg","fa2db9e1c53bae89febac40a0e1df1b6"],["/static/images/nellie-cookies-8fbc025c46.svg","8fbc025c465c10b6457b14294702a94d"],["/static/images/nellie-customizable-bdde728218.svg","bdde728218ef22a4c6981320df07a09b"],["/static/images/new-features-icon-c9a8e8eb1c.svg","c9a8e8eb1c7ab088f1c4a5cbec4466ec"],["/static/images/next-arrow-c558ba3f13.svg","c558ba3f13e636234941616ecfe035e5"],["/static/images/no_theme-color-a57002e7b7.png","a57002e7b773839a22366cc2368269c5"],["/static/images/open-accordion-85d0f6e433.svg","85d0f6e43394dd01dbd703b18f8d44e9"],["/static/images/performance-176ac7e3ed.svg","176ac7e3ed4bf0bd67f0d10fbf27d0da"],["/static/images/permalink-icon-eb255f3240.svg","eb255f3240caccf4704ad8d0e6e1064b"],["/static/images/previous-arrow-3ca3d63763.svg","3ca3d6376386027ccb15ee8f8b6a88e4"],["/static/images/pwa-7a72bd24f3.svg","7a72bd24f33c7c21011ffb36d8052adf"],["/static/images/qualys-ssl-labs-logo-c838cf2381.png","c838cf2381484e4e9fd65bc737b677c0"],["/static/images/queue-nellie-1ce66f158f.svg","1ce66f158f620e97ad7e95c82302e835"],["/static/images/results-a11y-a17d591e64.svg","a17d591e6486da4497aff448c45527ed"],["/static/images/results-docs-icon-05070ce00b.svg","05070ce00bc81ef40b6a8295aa7ca0e8"],["/static/images/results-error-icon-b38593d10e.svg","b38593d10ee8110c0e6a16f7521b199e"],["/static/images/results-hide-details-ec3d32856f.svg","ec3d32856fb9bdae640c0ef5112c5d2a"],["/static/images/results-interop-60b5c045a0.svg","60b5c045a0eff1b0a39502268f435e9e"],["/static/images/results-passed-icon-d12f41eeb3.svg","d12f41eeb3308c431062cd9abc4f98ba"],["/static/images/results-perf-176ac7e3ed.svg","176ac7e3ed4bf0bd67f0d10fbf27d0da"],["/static/images/results-pwa-7a72bd24f3.svg","7a72bd24f33c7c21011ffb36d8052adf"],["/static/images/results-security-94e610bdb3.svg","94e610bdb3b14ebccac8515db24885f5"],["/static/images/results-view-details-91448f0dc9.svg","91448f0dc9b2cb3194bf18a3182ebc6f"],["/static/images/results-warning-icon-817fb7bbd7.svg","817fb7bbd7b00d156aad3ae42bab3f30"],["/static/images/rules-icon-bccbc8e2a4.svg","bccbc8e2a43bbc996ff2c9b7211454fd"],["/static/images/search-icon-50df8f2aa4.svg","50df8f2aa4dc59c8f7f697febf9b2a63"],["/static/images/search-icon-c27160bfd3.png","c27160bfd32d51a2fb6d072f5243c1f4"],["/static/images/security-9f2cd60b92.svg","9f2cd60b9246d3e17cd0bd7373580b06"],["/static/images/select-arrow-23b6203075.svg","23b6203075faaf9e8188ff58c126c86e"],["/static/images/snyk-4cdfe67e79.svg","4cdfe67e79b408bf5719457992c60cab"],["/static/images/sonar-logo-4fa31d71a3.svg","4fa31d71a37280074c610fcc3c1522f8"],["/static/images/sonarwhal-6e213f1092.gif","6e213f10923af7366eda8b785a7eac83"],["/static/images/stylish-output-c0333ea990.png","c0333ea99083c8392c56284f147f4e51"],["/static/images/sub-section-4f27ca69da.svg","4f27ca69dad98a29e01acb0acc7d0883"],["/static/images/summary-output-3e8d086067.png","3e8d086067f9b19fa15626ab4398ea26"],["/static/images/theme-color-169d0f3a4a.png","169d0f3a4ab61a0cccd3637688da589b"],["/static/images/toc-arrow-a3e16fa388.svg","a3e16fa3884a40cd01a25625c8169270"],["/static/images/toc-current-section-e895e62951.svg","e895e62951198f2e4589280104aa71dc"],["/static/images/user-guide-icon-8eaf98e9be.svg","8eaf98e9be6a6bfc69c04b13bce8e7f7"],["/static/scripts/common-234f1d98cc.js","234f1d98cc38ae80186993a53bd86ca7"],["/static/scripts/scanner-b3323c18db.js","bd56455615574af6e2e25ce413b9858c"],["/static/scripts/treeview-e14923d6bd.js","e14923d6bd7ac82069379032309cddfe"],["/static/styles/about-f2f371660d.css","f2f371660d86e41ea49686adfb8b76c0"],["/static/styles/common-f0d599dc94.css","3fd2da27801ea626fd1c56b89f4c23bc"],["/static/styles/docs-aea1404a6b.css","83a9dd1f2ddf18cd08c1f04211b7778e"],["/static/styles/home-fa5c420232.css","652d62ae68823e7b7607c5eb168837f1"],["/static/styles/scanner-f774cfc548.css","1a3862d75b8f0b25d0f1ecdc777bee0e"],["/sw-reg.js","922e06f16662b301ea7bf2ab833b7491"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.networkFirst, {});




