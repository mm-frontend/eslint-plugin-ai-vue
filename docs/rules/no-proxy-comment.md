# not allow proxy-comment in api defined files (no-proxy-comment)

Please describe the origin of the rule here.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

export default  [
    {
        name: 'users',
        url: '/api/users',
        methods: ['get', 'post'],
        proxy: 'http://localhost:3000',
    },
]

```

Examples of **correct** code for this rule:

```js

export default  [
    {
        name: 'users',
        url: '/api/users',
        methods: ['get', 'post'],
        // proxy: 'http://localhost:3000',
    },
]

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
