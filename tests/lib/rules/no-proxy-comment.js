/**
 * @fileoverview not allow proxy-comment in api defined files
 * @author no-proxy-comment
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require('../../../lib/rules/no-proxy-comment')
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
ruleTester.run('no-proxy-comment', rule, {
  valid: [
    {
      code: `module.exports = [
                {
                    name: 'users',
                    url: '/api/users',
                    methods: ['get'],
                },
                {
                    name: 'roles',
                    url: '/api/roles',
                    methods: ['get', 'post'],
                }
            ]`,
      options: [['<input>']],
      // give me some code that won't trigger a warning
    },
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `module.exports = [
                {
                    name: 'users',
                    url: '/api/users',
                    methods: ['get'],
                    proxy: 'local',
                },
                {
                    name: 'roles',
                    url: '/api/roles',
                    methods: ['get', 'post'],
                }
            ]`,
      options: [['<input>']],
      errors: [
        {
          message: 'proxy property is not allowed in api.js',
          type: 'Property',
        },
      ],
    },
  ],
})
