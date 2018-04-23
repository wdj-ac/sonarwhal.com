const algoliasearch = require('algoliasearch');
const _ = require('lodash');
const xssFilters = require('xss-filters');

const configure = (app) => {
    const config = app.locals.theme;
    const client = algoliasearch(config.appId, config.apiKey);
    const index = client.initIndex('sonarwhal');
    const hitsPerPage = 20;

    const isEqual = (l, r) => {
        // hits that have the same category, title and subtitles are considered the same.
        const checks = ['category', 'title', 'subtitle'];

        return checks.every((check) => {
            return l[check] === r[check];
        });
    };

    const generatePageInfo = (currentPage, hits, query, totalPages) => {
        const pattern = `/search?q=${query}&page=pageId`;

        if (hits.length === 0 && query) {
            return {
                hits,
                page: {
                    description: `Sorry, we couldn't find any results for ${query}`,
                    title: `No results found for ${query}`
                },
                query
            };
        }

        return {
            currentPage,
            hits,
            page: {
                description: query ? `About ${totalPages * hitsPerPage} results found for ${query}` : `Search through sonarwhal's rules, user and contributor guides`,
                title: query ? `Results for ${query} (page ${currentPage} of ${totalPages})` : `Search sonarwhal's documentation`
            },
            pattern,
            query,
            totalPages
        };
    };

    const search = async (query, page) => {
        const searchOptions = {
            highlightPostTag: `</span>`,
            highlightPreTag: `<span class="search-result__highlighted">`,
            hitsPerPage,
            page,
            query,
            snippetEllipsisText: `…`
        };
        let hits, nbPages;

        try {
            // issue with destructuring assignment
            // https://stackoverflow.com/questions/35576307/declaration-or-statement-expected-javascript-typescript
            ({ hits, nbPages } = await index.search(searchOptions));
        } catch (err) {
            return;
        }

        const processedHits = hits.map((hit) => {
            return {
                category: _.get(hit, '_highlightResult.hierarchy.lvl0.value', 'Sonar'),
                snippet: _.get(hit, '_snippetResult.content.value'),
                subtitle: _.get(hit, '_highlightResult.hierarchy.lvl2.value'),
                title: _.get(hit, '_highlightResult.hierarchy.lvl1.value'),
                url: _.get(hit, 'url')
            };
        });

        const uniqueHits = _.uniqWith(processedHits, isEqual);

        return [uniqueHits, nbPages];
    };

    app.get('/search', async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const searchInput = req.query.q ? xssFilters.inUnQuotedAttr(req.query.q) : '';
        const [searchResult, totalPages] = searchInput ? await search(searchInput, page - 1) : [[], 0];

        res.render('search', generatePageInfo(parseInt(page), searchResult, searchInput, totalPages));
    });
};

module.exports = configure;
