const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['import', 'react', 'jsx-a11y', 'unicorn', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': OFF,
    'import/no-import-module-exports': OFF,
    'import/prefer-default-export': OFF,
    'import/no-unresolved': OFF,
    'import/no-dynamic-require': OFF,
    'import/extensions': OFF,

    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: false,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true
        }
      }
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN,
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax']
      }
    ],
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,
    'unicorn/no-array-reduce': OFF,
    'unicorn/no-array-for-each': OFF,
    'unicorn/consistent-destructuring': OFF,
    'unicorn/prefer-module': OFF,
    'unicorn/consistent-function-scoping': OFF,
    'unicorn/no-abusive-eslint-disable': OFF,
    'unicorn/numeric-separators-style': OFF,
    'unicorn/prefer-object-from-entries': OFF,
    'unicorn/explicit-length-check': OFF,
    'unicorn/prefer-export-from': OFF,
    'unicorn/prefer-code-point': OFF,
    'unicorn/no-useless-fallback-in-spread': OFF,
    'unicorn/prefer-spread': OFF,

    'global-require': OFF
  }
}
