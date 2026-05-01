import { ESLint } from 'eslint';
import stylisticPlugin from '@stylistic/eslint-plugin-js';

export default [
	{
		ignores: ['node_modules/**', '**/*.min.js', '**/*.dist.js'],
	},
	{
		files: ['./src/blocks/**/*.dist.js'],
        plugins: {
            '@stylistic': stylisticPlugin,
        },
		rules: {
            'object-curly-newline': 'off',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return'
                },
            ],
            'no-whitespace-before-property': 'error',
            '@stylistic/indent': ['error', 'tab', {
                'SwitchCase': 1,
                'FunctionExpression': {
                    'parameters': 1,
                    'body': 1
                },
                'MemberExpression': 1,
                'offsetTernaryExpressions': true
            }],
            '@stylistic/quotes': [
                'error',
                'single'
            ],
            '@stylistic/space-in-parens': 'off',
            '@stylistic/array-bracket-spacing': 'off',
            '@stylistic/object-curly-spacing': [
                'error',
                'always'
            ],
            '@stylistic/computed-property-spacing': 'off',
            '@stylistic/space-before-function-paren': 'off',
            '@stylistic/no-nested-ternary': 'off',
            '@stylistic/space-unary-ops': 'off',
            '@stylistic/semi': [
                'warn',
                'always'
            ],
            '@stylistic/brace-style': [
                'warn',
                'stroustrup',
                {
                    'allowSingleLine': false
                }
            ],
            'max-len': [
                'warn',
                {
                    'comments': 160,
                    'code': 160,
                    'tabWidth': 4
                }
            ],
            'no-multiple-empty-lines': [
                'error',
                {
                    'max': 2,
                    'maxEOF': 1,
                    'maxBOF': 0
                }
            ],
            'block-spacing': 'error',
			'@stylistic/object-curly-newline': ['error', {
				ObjectExpression: { multiline: true, minProperties: 4 }, // object literals
				ObjectPattern: 'never', // destructuring
				ImportDeclaration: { multiline: true, minProperties: 4 },
				ExportDeclaration: { multiline: true },
			}],
		}
	},
];
