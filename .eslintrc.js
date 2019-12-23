module.exports = {
	extends: [
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
		"plugin:jest/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 10,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["simple-import-sort"],
	rules: {
		"prettier/prettier": "warn",
		"simple-import-sort/sort": "error",

		"no-unused-vars": "error",

		"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-non-null-assertion": ["error"],
		"@typescript-eslint/triple-slash-reference": "off",
		"@typescript-eslint/prefer-interface": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"react/prop-types": "off",
		"no-console": "warn",
		curly: ["error", "multi"],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
