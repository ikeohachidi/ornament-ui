module.exports = {
	moduleFileExtensions: ["js", "ts", "json", "vue"],
	moduleDirectories: ["node_modules"],
	modulePaths: ["src"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		".*\\.ts$": "ts-jest",
		".*\\.vue$": "@vue/vue3-jest"
	},
	testEnvironment: "jsdom"
};