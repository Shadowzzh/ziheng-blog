/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)'
      }
    ]
  },
  ignorePatterns: [
    '**/.eslintrc.js',
    '**/*.config.js',
    '**/*.config.cjs',
    '.next',
    'dist',
    'pnpm-lock.yaml',
    'bun.lockb',
    'tailwind.config.ts',
    'node_modules'
  ]
};

module.exports = config;
