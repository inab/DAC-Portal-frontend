module.exports = {
	extends: [
		'plugin:react/recommended', 
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['react', '@typescript-eslint'],
	env: {
		node: true,
		browser: true,
		es6: true,
		jest: true
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaVersion: 2020, 
		sourceType: 'module', 
		project: './tsconfig.json',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		'linebreak-style': 'off',
		'no-unused-vars': 'off',
		'react/no-unescaped-entities': 'off',
		'react/prop-types': ['Off'],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
};