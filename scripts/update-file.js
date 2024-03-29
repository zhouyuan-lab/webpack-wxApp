// const fs = require('fs');
// const path = require('path');

// // 获取命令传入的环境变量 npm run build --env=test
// const env = process.env.npm_config_env || 'dev';

// // 需要修改的json文件
// const jsonPath = path.resolve('./src/project.config.json');
// fs.readFile(jsonPath, 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // 先解析json为对象
//   const json = JSON.parse(data);
//   // 修改对应字段的value值（根据环境修改对应小程序的appid）
//   if (env === 'pd') {
//     json.appid = 'pdAppId';
//   } else if (env === 'test') {
//     json.appid = 'testAppId';
//   } else {
//     json.appid = 'devAppId';
//   }

//   fs.writeFile(jsonPath, JSON.stringify(json, null, 2), (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('update-json.js > JSON 文件已更新');
//   });
// });

// // 需要修改的js文件
// const jsPath = path.resolve('./src/config/env.js');
// fs.readFile(jsPath, 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // 修改文件内容
//   const key = 'env'; // 对象的key或者变量名
//   const newValue = env; // 替换后的值
//   // 正则匹配对象的key，将文件中key为env的值改为命令传入的环境变量，示例：{ env: 'dev' }
//   // const pattern = new RegExp(`(${key}:\\s*['"])\\w+(['"])`);

//   // 正则匹配变量赋值，将文件中变量名为env的值改为命令传入的环境变量，示例：const env = 'dev'
//   const pattern = new RegExp(`(${key} =\\s*['"])\\w+(['"])`);

//   // 替换对应的值
//   const newData = data.replace(pattern, `$1${newValue}$2`);

//   fs.writeFile(jsPath, newData, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('update-json.js > JS 文件已更新');
//   });
// });

// // 替换文件全部内容
// const indexPath = path.resolve('./index.js');
// // index.js的文件内容为一个console
// const indexData = `console.log('indexData')`;
// fs.writeFile(indexPath, indexData, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('update-json.js > JS 文件已更新');
// });

const fs = require('fs')
const path = require('path')
const less = require('less')
const CleanCSS = require('less-plugin-clean-css')
const directoryPath = path.join(__dirname, '../dist/pages/') // 替换为你的文件夹路径

function convertLessToWxss(directory) {
	fs.readdir(directory, (err, files) => {
		if (err) {
			return console.log('Unable to scan directory:', err)
		}

		files.forEach((file) => {
			const fullPath = path.join(directory, file)

			fs.stat(fullPath, (err, stats) => {
				if (err) {
					console.error('Error getting file stats:', err)
					return
				}

				if (stats.isDirectory()) {
					// 如果是文件夹，则递归调用convertLessToWxss函数
					convertLessToWxss(fullPath)
				} else if (path.extname(file).toLowerCase() === '.less') {
					// 如果是.less文件，则转换为.wxss文件
					less.render(fs.readFileSync(fullPath, 'utf8'), {
						plugins: [new CleanCSS({ advanced: true })],
					})
						.then((output) => {
							const wxssFilePath = fullPath.replace(
								'.less',
								'.wxss'
							)
							fs.writeFileSync(wxssFilePath, output.css)

							// 删除原始.less文件
							//   fs.unlinkSync(fullPath);

							//   console.log("File converted and deleted:", fullPath);
						})
						.catch((error) => {
							console.error(
								`Error converting ${fullPath} to .wxss: ${error}`
							)
						})
				}
			})
		})
	})
}
convertLessToWxss(directoryPath)
