const path = require('path')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    // 'prettier',
    '@vue/standard',
  ],
  globals: { Logger: true, THREE: true },
  plugins: ['vue', 'prettier'],
  rules: {
    'import/no-webpack-loader-syntax': 'off',
    // 'prettier/prettier': 'error', 0 = off, 1 = warning, 2 = error
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [2, 'always-multiline'],
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'spaced-comment': [0, 'never'],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
