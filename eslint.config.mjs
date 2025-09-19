import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  ...[
    {
      ignores: ['**/*.d.ts', '**/*.test.ts', '**/dist/**', '**/node_modules/*', '**/*config.js', 'coverage/'],
    },
  ],

  eslint.configs.recommended,
  ...[
    {
      rules: {
        curly: 'error',
      },
    },
  ],
  ...tseslint.configs.recommended,
  ...[
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'error',
      },
    },
  ],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
);
