# JSON Response Normalizer

A set of helper functions that turn a large API-style JSON response into a smaller list of published article summaries. Only the data the program needs is kept, in a flat and simple shape.

## Learning Goals

- Read data from a nested API response (`response.data`, `article.author.name`)
- Filter an array by a property value with `filter`
- Reshape each item into a new object with `map`
- Flatten nested properties into top-level ones
- Combine small functions into one normalization step
- Avoid changing the original data

## Functions

| Function | Description |
|----------|-------------|
| `getPublishedArticles(response)` | Returns only the articles whose `status` is `"published"` |
| `toArticleSummary(article)` | Returns an object with `id`, `title`, `authorName`, and `views` |
| `normalizeArticles(response)` | Returns summaries for the published articles only |

## Usage

```js
const apiResponse = {
  data: [
    {
      id: 'a1',
      title: 'Learning JavaScript',
      status: 'published',
      author: { name: 'Ava Stone' },
      stats: { views: 1200 },
    },
    {
      id: 'a2',
      title: 'Draft Notes',
      status: 'draft',
      author: { name: 'Noah Kim' },
      stats: { views: 50 },
    },
    {
      id: 'a3',
      title: 'Async Basics',
      status: 'published',
      author: { name: 'Mina Patel' },
      stats: { views: 900 },
    },
  ],
  meta: {
    total: 3,
  },
};

console.log(normalizeArticles(apiResponse));
// [
//   { id: "a1", title: "Learning JavaScript", authorName: "Ava Stone", views: 1200 },
//   { id: "a3", title: "Async Basics", authorName: "Mina Patel", views: 900 }
// ]

console.log(getPublishedArticles(apiResponse).length);
// 2

console.log(toArticleSummary(apiResponse.data[0]));
// { id: "a1", title: "Learning JavaScript", authorName: "Ava Stone", views: 1200 }
```

Run it with Node.js:

```bash
node app.js
```

## What I Learned

- **API responses carry more data than needed.** The response includes drafts, nested author and stats objects, and metadata. Normalizing it into a short list makes the data much easier to use in an interface.
- **`filter` and `map` do different jobs.** `filter` decides which articles to keep, and `map` changes the shape of each one. Using them in that order gives a clean list of published summaries.
- **Nested values can be flattened.** The author name lives in `author.name` and the views in `stats.views`. The summary moves them to `authorName` and `views`, so the code that uses the summary does not need to know the original structure.
- **A normalizing function is built from smaller steps.** `normalizeArticles` only combines `getPublishedArticles` and `toArticleSummary`, so each step can be tested on its own, and the final function stays short.
- **The original data stays untouched.** Both `filter` and `map` return new arrays and objects, so `apiResponse` is not changed. This keeps the data predictable and avoids side effects.
- **The response shape matters.** The articles are inside `response.data`, not at the top level, so reading the structure of the JSON first is the starting point before writing any function.

## Source

Project specification from [roadmap.sh: JSON Response Normalizer](https://roadmap.sh/projects/js-json-response-normalizer).