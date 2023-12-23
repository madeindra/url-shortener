module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-type-checked', // @typescript-eslint @v6
    'plugin:@typescript-eslint/stylistic-type-checked', // @typescript-eslint @v6
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['dist/', '.eslintrc.js', 'src/public']
};