module.exports = {
	title: "React Structured Query Search With Suggestions",
	themeConfig: {
		showPlaygroundEditor: true
	},
	base: "/react-structured-query-search-suggestions/",
	menu: ["Introduction", "Getting Started", "Props"],
	onCreateWebpackChain: (config) => {
		// Allow CSS imports
		config.module
		  .rule('scss')
		  .test(/\.css|scss|sass$/)
		  .use('style')
		  .loader('style-loader')
		  .end()
		  .use('css')
		  .loader('css-loader')
		  .end();
	},
};