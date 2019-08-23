/**
 * @fileoverview A rule to check the repeat  api name in all api.js files
 * @author xueyan.lu
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const fileNameRegExp = /(.*)?\/api.js$/
const glob = require('glob')
const purgeCache = require('../utils.js')

module.exports = {
  meta: {
    docs: {
      description: 'A rule to check the repeat  api name in all api.js',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // {
      //   enum: ["always", "never"]
      // },
      {
        type: 'object',
        properties: {
          groupPaths: {
            type: 'array',
            items: [
              {
                type: 'string',
              },
            ],
          },
        },
      },
    ],
  },

  create: function(context) {
    let apiNames = {}
    let apiUrls = {}
    const options = context.options
    const groups = options[0].groupPaths
    if (groups && groups.length) {
      groups.forEach(g => {
        if (!apiNames[g]) apiNames[g] = []
        if (!apiUrls[g]) apiUrls[g] = []
        if (g !== '<input>') {
          // <input> is for test
          glob.sync(g + '/**/api.js').forEach(f => {
            purgeCache(f)
            const apis = require(f)
            apis.forEach(a => {
              apiNames[g].push(a.name)
              apiUrls[g].push(a.url)
            })
          })
        } else {
          apiNames[g] = ['users', 'roles', 'roles2', 'users'] // <input> is for test
          apiUrls[g] = ['/api/users', '/api/roles', '/api/users2', '/api/roles'] //<input> is for test
        }
      })
    }
    // console.log(apiNames, apiUrls)
    return {
      'ExpressionStatement > AssignmentExpression > ArrayExpression > ObjectExpression': function(node) {
        let fileName = context.getFilename()
        let group = groups.find(g => fileName.includes(g))
        if (fileName !== '<input>' && (!fileNameRegExp.test(fileName) || !group)) {
          return {}
        }

        node.properties.forEach(p => {
          if (p.key.name === 'name' || p.key.name === 'url') {
            // console.log(group, groups, apiNames, apiUrls);
            if (apiNames[group].filter(v => v === p.value.value).length > 1) {
              context.report({
                node: p,
                message: `Duplicated name value`,
                data: {
                  name: p.key.name,
                  value: p.value.value,
                },
              })
            } else if (apiUrls[group].filter(v => v === p.value.value).length > 1) {
              context.report({
                node: p,
                message: `Duplicated url value`,
                data: {
                  name: p.key.name,
                  value: p.value.value,
                },
              })
            }
          }
        })
      },
    }
  },
}
