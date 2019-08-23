/**
 * @fileoverview enum.js name cannot be duplicated
 * @author xueyan.lu
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const fileNameRegExp = /(.*)?\/enum.js$/
const exportNameRegExp = /^export (let|const|var) (\w+) =/gm
const glob = require('glob')
const purgeCache = require('../utils.js')
const fs = require('fs')

module.exports = {
  meta: {
    docs: {
      description: 'enum.js name cannot be duplicated',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
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
    let enumNames = {}
    const options = context.options
    const groups = options[0].groupPaths
    if (groups && groups.length) {
      groups.forEach(g => {
        if (!enumNames[g]) enumNames[g] = []
        if (g !== '<input>') {
          // <input> is for test
          glob.sync(g + '/**/enum.js').forEach(f => {
            purgeCache(f)
            const enums = fs.readFileSync(f, 'utf8')
            let matches = null
            while ((matches = exportNameRegExp.exec(enums))) {
              enumNames[g].push(matches[2])
            }
          })
        } else {
          enumNames[g] = ['users', 'users2', 'users2'] // <input> is for test
        }
      })
    }

    // console.log(enumNames)

    return {
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier'(node) {
        let fileName = context.getFilename()
        let group = groups.find(g => fileName.includes(g))
        if (fileName !== '<input>' && (!fileNameRegExp.test(fileName) || !group)) {
          return {}
        }
        // console.log(node.name, group, enumNames[group])
        if (enumNames[group].filter(v => v === node.name).length > 1) {
          context.report({
            node: node,
            message: `Duplicated enum name`,
            data: {
              name: node.name,
            },
          })
        }
      },
    }
  },
}
