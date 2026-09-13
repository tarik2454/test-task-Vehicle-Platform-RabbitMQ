import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier/flat';
import unusedImports from 'eslint-plugin-unused-imports';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

const SOURCE_FILES = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'];
const JAVASCRIPT_FILES = ['**/*.{js,jsx,mjs,cjs}'];
const TYPESCRIPT_FILES = ['**/*.{ts,tsx}'];

const eslintConfig = defineConfig([
  {
    // Включает рекомендованные ESLint правила корректности JavaScript.
    ...js.configs.recommended,
    name: 'project/javascript-recommended',
    files: JAVASCRIPT_FILES,
  },
  // Включает правила Next.js для производительности, React и React Hooks.
  ...nextCoreWebVitals,
  // Включает правила Next.js, рекомендованные для TypeScript-проектов.
  ...nextTypescript,
  // Включает рекомендованные правила корректности TanStack Query.
  ...tanstackQuery.configs['flat/recommended'],
  {
    name: 'project/source-rules',
    files: SOURCE_FILES,
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Основные проверки безопасности и читаемости.
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'prefer-const': 'warn',

      // Обязательная структура условных блоков.
      'no-lonely-if': 'warn',
      'no-else-return': 'warn',

      // Неиспользуемые импорты и переменные проверяет один специализированный плагин.
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Осознанные послабления к рекомендациям Next.js и TanStack Query.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/incompatible-library': 'off',
      'react/no-unescaped-entities': 'off',
      '@tanstack/query/no-rest-destructuring': 'off',

      // Дополнительные проверки JSX.
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'ignore' },
      ],
      'jsx-a11y/anchor-is-valid': 'warn',

      // Единый порядок, группировка и алфавитная сортировка импортов.
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
            'object',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/*.module.scss',
              group: 'sibling',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    name: 'project/javascript-rules',
    files: JAVASCRIPT_FILES,
    rules: {
      // JavaScript-версии правил корректности выражений и объявлений.
      'no-use-before-define': 'error',
      'no-unused-expressions': 'warn',
    },
  },
  {
    name: 'project/typescript-rules',
    files: TYPESCRIPT_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
    rules: {
      // TypeScript-версии заменяют базовые правила для тех же проверок.
      'no-use-before-define': 'off',
      'no-unused-expressions': 'off',
      'require-await': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',

      // Единый стиль типов: type, префикс T для типов и E для enum.
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E'],
        },
      ],
    },
  },
  // Отключает правила ESLint, конфликтующие с отдельным форматированием Prettier.
  prettierConfig,
  // Исключает из линтинга сгенерированные файлы, coverage и тестовые инструменты.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    'test/**',
    'e2e/**',
    'vitest.config.ts',
    'playwright.config.ts',
  ]),
]);

export default eslintConfig;
