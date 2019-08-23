/**
 * @fileoverview not allow proxy-property in api.js files
 * @author xueyan.lu
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const fileNameRegExp = /(.*)?\/api.js$/
module.exports = {
  meta: {
    docs: {
      description: 'not allow proxy expressions in api defined files',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // {
      //   enum: ["always", "never"]
      // },
      {
        type: 'array',
        items: [
          {
            type: 'string',
          },
        ],
      },
    ],
  },

  create: function(context) {
    const fileName = context.getFilename()
    const paths = context.options[0] || []
    return {
      'ExpressionStatement > AssignmentExpression > ArrayExpression > ObjectExpression': function(node) {
        if (
          fileName !== '<input>' &&
          (paths.every(path => !fileName.includes(path)) || !fileNameRegExp.test(fileName))
        ) {
          return {}
        }

        // console.log(node.properties, paths)

        node.properties.every(p => {
          // console.log(p)
          if (p.key.name === 'proxy') {
            context.report({
              node: p,
              message: 'proxy property is not allowed in api.js',
              data: {
                name: p.key.name,
                value: p.key.value,
              },
            })
            return false
          }
          return true
        })

        // console.log(sourceCode)
      },
    }
  },
}
