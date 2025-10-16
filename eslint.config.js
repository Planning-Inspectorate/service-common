const eslint = require('@eslint/js');
const {defineConfig, globalIgnores } = require('eslint/config');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = defineConfig([
	eslint.configs.recommended,
	globalIgnores([
		'.husky',
		'dist/**',
		'node_modules/**',
		'**/*.test.js',
		'**/.static/**',
      'services/pins-components/pins/components/**/*.js' // fails to parse for some reason
	]),
	eslintConfigPrettier,
  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    }
  }
]);
