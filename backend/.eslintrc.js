module.exports = {
    "extends": "airbnb-base",
    "plugins": [
		"jsx-a11y",
		"import",
	],
    "env": {
        "node": true,
        "browser": true
    },
    "rules": {
		"indent": ["error", 4],
		"no-param-reassign": ["error", { "props": false }],
		"no-use-before-define": ["error", { "functions": false }],
		"import/no-cycle": [0],
	},
    "plugins": ["import"],
    "parserOptions": {
        "ecmaVersion": 2020
    } 
 }