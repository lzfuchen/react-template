module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  customSyntax: 'postcss-less',
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'selector-class-pattern': null,
    'font-family-name-quotes': null,
    'block-no-empty': null,
    'value-keyword-case': null,
    'rule-empty-line-before': ['always', { except: ['after-single-line-comment', 'first-nested'] }],
    'at-rule-no-unknown': null,
    'number-max-precision': null,
    'media-feature-name-no-unknown': null,
    'media-feature-name-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'color-function-notation': null,
    'shorthand-property-no-redundant-values': null,
    'alpha-value-notation': null,
    'property-no-vendor-prefix': null,
    'keyframes-name-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*']
}
