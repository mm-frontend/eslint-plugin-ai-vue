/**
 * @fileoverview enum.js name cannot be duplicated
 * @author xueyan.lu
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require('../../../lib/rules/enum-not-duplicated')
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
ruleTester.run('enum-not-duplicated', rule, {
  valid: [
    {
      code: `export const users = [
                {
                    name: 'admin',
                    value: 1,
                },
                {
                    name: 'custom',
                    value: 2,
                }
            ]`,
      options: [
        {
          groupPaths: ['<input>'],
        },
      ],
    },
  ],

  invalid: [
    {
      code: `export const users2 = [
                {
                    name: 'admin',
                    value: 1,
                },
                {
                    name: 'custom',
                    value: 2,
                }
            ]`,
      options: [
        {
          groupPaths: ['<input>'],
        },
      ],
      errors: [
        {
          message: 'Duplicated enum name',
          type: 'Identifier',
        },
      ],
    },
  ],
})
