module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error'],
  },
}
