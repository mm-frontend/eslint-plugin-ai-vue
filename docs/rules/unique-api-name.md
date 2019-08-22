# A rule to check the repeat api name and url in all api.js (unique-api-name)

Please describe the origin of the rule here.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
// module1/api.js
export default  [
    {
        name: 'users',
        url: '/api/users',
        methods: ['get', 'post']
    },
]
// module2/api.js
export default  [
    {
        name: 'users',
        url: '/api/users',
        methods: ['get', 'post']
    },
]

```

Examples of **correct** code for this rule:

```js

// module1/api.js
export default  [
    {
        name: 'users',
        url: '/api/users',
        methods: ['get', 'post']
    },
]
// module2/api.js
export default  [
    {
        name: 'users2',
        url: '/api/users2',
        methods: ['get', 'post']
    },
]

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
