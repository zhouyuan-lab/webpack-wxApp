const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const TerserPlugin = require('terser-webpack-plugin')
const fs = require('fs')
const { exec } = require('child_process')

module.exports = {
	entry: {
		app: './index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
	},
	resolve: {
		extensions: ['.js', '.json', '.wxs', '.wxss'],
		alias: {
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@components': path.resolve(__dirname, 'src/styles/components'),
			'@pages': path.resolve(__dirname, 'src/pages'), // 添加别名配置
			'@config': path.resolve(__dirname, 'src/config'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // 如果你使用 Babel 的话
				},
			},
		],
	},
	optimization: {
		minimizer: [
			// 使用 TerserPlugin 来压缩 JavaScript
			new TerserPlugin({
				extractComments: false, // 不提取注释
			}),
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'src/pages',
					to: 'pages',
					// filter: (resourcePath) => {
					// 	// 排除.less文件
					// 	return !resourcePath.endsWith('.less')
					// },
				},
				{ from: 'src/app.js', to: 'app.js' },
				{ from: 'src/app.json', to: 'app.json' },
				{ from: 'src/app.wxss', to: 'app.wxss' },
				{ from: 'src/project.config.json', to: 'project.config.json' },
				{
					from: 'src/project.private.config.json',
					to: 'project.private.config.json',
				},
				{ from: 'src/sitemap.json', to: 'sitemap.json' },
				// { from: "src/vant-weapp", to: "vant-weapp" }, //
				{ from: 'src/images', to: 'images' },
				{ from: 'src/utils', to: 'utils' },
				{ from: 'src/api', to: 'api' },
				{ from: 'src/config', to: 'config' },
				{ from: 'src/package.json', to: 'package.json' },
			],
		}),
		new WebpackShellPluginNext({
			// 你要运行的任何 shell 命令都可以在这里配置（例如 node.js 脚本）
			onBuildEnd: {
				scripts: [
					// 'wxss ./dist', // 使用 wxss-cli 将less文件转换为wxss文件
					'node ./scripts/update-file.js', // update-file.js配置了修改小程序环境变量的功能
				],
				// blocking: false,
				// parallel: true,
				blocking: true,
				parallel: false,
			},
		}),
		{
			apply: (compiler) => {
				compiler.hooks.done.tap('AfterEmitPlugin', (compilation) => {
					const pagesDir = path.resolve(__dirname, 'dist/pages')

					if (!fs.existsSync(pagesDir)) {
						fs.mkdirSync(pagesDir, { recursive: true })
					}

					fs.readdirSync(pagesDir).forEach((folder) => {
						const folderPath = path.join(pagesDir, folder)
						if (fs.lstatSync(folderPath).isDirectory()) {
							const wxssFiles = fs
								.readdirSync(folderPath)
								.filter((file) => file.endsWith('.less'))
							wxssFiles.forEach((file) => {
								// 在删除.less文件之前执行shell命令
								exec(
									'node ./scripts/update-file.js',
									(error, stdout, stderr) => {
										if (error) {
											console.error(
												`exec error: ${error}`
											)
											return
										}
										// console.log(`stdout: ${stdout}`);
										// console.error(`stderr: ${stderr}`);

										// 删除.less文件
										const filePath = path.join(
											folderPath,
											file
										)
										if (fs.existsSync(filePath)) {
											// 文件存在，执行删除操作
											fs.unlinkSync(filePath)
										} else {
											console.log(
												'文件不存在：',
												filePath
											)
										}
									}
								)
							})
						}
					})
				})
			},
		},
	],
}
