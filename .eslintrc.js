module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'consistent-return': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'no-restricted-syntax': 'off'
  }
};
