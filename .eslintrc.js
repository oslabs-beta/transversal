module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: [2, 'tab'],
		'no-unused-vars': ['off', { vars: 'local' }],
		'prefer-const': 2,
		quotes: [2, 'single'],
		'react/prop-types': 'off',
		semi: [2, 'always'],
		'space-infix-ops': 2,
		'no-empty': 2,
		'no-empty-function': 2,
		'no-console': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
