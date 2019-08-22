/**
 * @fileoverview A rule to check the repeat  api name in all api.js
 * @author xueyan.lu
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require('../../../lib/rules/unique-api-name')
let RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
}

RuleTester.setDefaultConfig({ parserOptions })
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('unique-api-name', rule, {
  valid: [
    {
      code: `export default [
                {
                    name: 'users3',
                    url: '/api/users3',
                    methods: ['get'],
                },
                {
                    name: 'roles3',
                    url: '/api/roles3',
                    methods: ['get', 'post'],
                },
            ]`,
      options: [
        {
          groupPaths: ['<input>'],
        },
      ],
      // give me some code that won't trigger a warning
    },
  ],

  invalid: [
    {
      code: `
          export default [
              {
                  name: 'users',
                  url: '/api/users',
                  methods: ['get'],
              },
              {
                  name: 'roles',
                  url: '/api/roles',
                  methods: ['get'],
              },
              {
                  name: 'roles2',
                  url: '/api/roles',
                  methods: ['get'],
              },
              {
                  name: 'users',
                  url: '/api/users2',
                  methods: ['get'],
              },
          ]
      `,
      options: [
        {
          groupPaths: ['<input>'],
        },
      ],
      errors: [
        {
          message: `Duplicated name value`,
          type: 'Property',
        },
        {
          message: `Duplicated url value`,
          type: 'Property',
        },
        {
          message: `Duplicated url value`,
          type: 'Property',
        },
        {
          message: `Duplicated name value`,
          type: 'Property',
        },
      ],
    },
  ],
})
