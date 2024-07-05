module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/prop-types': [0],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)'
      }
    ]
  },
  settings: {
    react: {
      version: '18'
    }
  },
  ignorePatterns: [
    '**/.eslintrc.js',
    '.next',
    'dist',
    'pnpm-lock.yaml',
    'tailwind.config.ts',
    'node_modules',
    'postcss.config.mjs',
    'next.config.mjs'
  ]
};
