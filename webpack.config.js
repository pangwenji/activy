const tags = [
	'page-content',
	'page-view',
	'view',
]

module.exports = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              isCustomElement: (tag) => tags.includes(tag)
            },
          },
        },
      ],
    },
  };