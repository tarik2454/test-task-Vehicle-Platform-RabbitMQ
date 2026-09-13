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

const SOURCE_FILES = ['**/*.{js,jsx,ts,tsx}'];
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
      // Предупреждает о вызовах console, которые не должны попадать в production-код.
      'no-console': 'warn',
      // Запрещает debugger, который останавливает выполнение кода.
      'no-debugger': 'error',
      // Предупреждает о пустых блоках, но разрешает намеренно пустой catch.
      'no-empty': ['warn', { allowEmptyCatch: true }],
      // Требует использовать const, если переменная не переназначается.
      'prefer-const': 'warn',
      // Предупреждает об одиночном вложенном if, который можно объединить с родительским.
      'no-lonely-if': 'warn',
      // Предупреждает о лишнем else после ветки, которая уже завершилась через return.
      'no-else-return': 'warn',
      // Отключает базовую проверку: неиспользуемые значения проверяет плагин ниже.
      'no-unused-vars': 'off',
      // Запрещает импорты, которые объявлены, но нигде не используются.
      'unused-imports/no-unused-imports': 'error',
      // Предупреждает о неиспользуемых переменных и аргументах, кроме имён с подчёркиванием.
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // Разрешает вызывать React Hooks только в допустимых местах.
      'react-hooks/rules-of-hooks': 'error',
      // Предупреждает о неполном массиве зависимостей хука.
      'react-hooks/exhaustive-deps': 'warn',
      // Разрешает обновлять состояние внутри эффектов, когда это требуется проекту.
      'react-hooks/set-state-in-effect': 'off',
      // Разрешает библиотеки, совместимость которых анализатор React не может проверить.
      'react-hooks/incompatible-library': 'off',
      // Требует стабильный key для элементов, отрисованных из списка.
      'react/jsx-key': 'error',
      // Рекомендует самозакрывающиеся JSX-теги без дочерних элементов.
      'react/self-closing-comp': 'warn',
      // Разрешает использовать апострофы и другие символы напрямую в JSX-тексте.
      'react/no-unescaped-entities': 'off',
      // Не требует импорт React, когда JSX-преобразование выполняет его автоматически.
      'react/react-in-jsx-scope': 'off',
      // Предупреждает об отсутствии альтернативного текста у изображений и похожих элементов.
      'jsx-a11y/alt-text': 'warn',
      // Предупреждает, если тег ссылки используется без корректного поведения ссылки.
      'jsx-a11y/anchor-is-valid': 'warn',
      // Разрешает rest-деструктуризацию объектов, возвращаемых TanStack Query.
      '@tanstack/query/no-rest-destructuring': 'off',
      // Поддерживает единый порядок, группировку и алфавитную сортировку импортов.
      'import/order': [
        'warn',
        {
          // Задаёт порядок групп: от системных модулей до локальных значений и типов.
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
            'object',
          ],
          // Задаёт фиксированные позиции для фреймворков, алиасов и файлов стилей.
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
          // Оставляет системные импорты под управлением основного списка групп.
          pathGroupsExcludedImportTypes: ['builtin'],
          // Требует пустую строку между группами импортов.
          'newlines-between': 'always',
          // Сортирует импорты по алфавиту внутри каждой группы.
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
      // Запрещает использовать JavaScript-объявления до их определения.
      'no-use-before-define': 'error',
      // Предупреждает о выражениях, которые не дают никакого результата.
      'no-unused-expressions': 'warn',
    },
  },
  {
    name: 'project/typescript-rules',
    files: TYPESCRIPT_FILES,
    languageOptions: {
      parserOptions: {
        // Автоматически использует ближайший tsconfig для правил с информацией о типах.
        projectService: true,
        // Ищет файлы tsconfig относительно этого файла конфигурации.
        tsconfigRootDir,
      },
    },
    rules: {
      // Отключает базовые правила, которые не учитывают синтаксис TypeScript.
      'no-use-before-define': 'off',
      'no-unused-expressions': 'off',
      'require-await': 'off',
      // Передаёт проверку неиспользуемых TypeScript-значений плагину unused-imports.
      '@typescript-eslint/no-unused-vars': 'off',
      // Запрещает использовать TypeScript-объявления до их определения.
      '@typescript-eslint/no-use-before-define': 'error',
      // Предупреждает о TypeScript-выражениях, которые не дают никакого результата.
      '@typescript-eslint/no-unused-expressions': 'warn',
      // Предупреждает, если async-функция не содержит await.
      '@typescript-eslint/require-await': 'warn',
      // Предупреждает, когда явный any отключает проверку типов.
      '@typescript-eslint/no-explicit-any': 'warn',
      // Предупреждает о пустых объектных типах, принимающих почти любое непустое значение.
      '@typescript-eslint/no-empty-object-type': 'warn',
      // Требует type вместо interface при описании объектных типов.
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // Требует проектные префиксы для псевдонимов типов и перечислений.
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
