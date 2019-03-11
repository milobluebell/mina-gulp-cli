/**
 * TODO: ④ 自动识别并且生成组件的接口文档。
 */

//
const fs = require("fs");
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const tap = require("gulp-tap");
const arg = require("minimist")(process.argv.slice(2));

//
const re = /\/\*no-compile-start\*\/([\D\d]*)\/\*no-compile-end\*\//g;

//
const gulpSass = ()=> gulp.src('./src/**/*.scss')
	.pipe(tap(file=> {
		let content = file.contents.toString();
		content = content.replace(re, ($0, $1) => {
			$1 = $1.trim();
			return `/*no-compile-start*//*${$1}*//*no-compile-end*/`;
		})
		file.contents = Buffer.from(content, 'utf-8');
	}))
	.pipe(sass({ outputStyle: 'expanded' })
	.on('error', sass.logError))
	.pipe(rename({
		extname: '.wxss'
	}))
	.pipe(tap(file => {
		let content = file.contents.toString();
		content = content.replace(re, ($0, $1) => {
			return $1.replace(/\/\*|\*\//g, '');
		})
		file.contents = Buffer.from(content, 'utf-8');
	}));

//
const copy = ()=> gulp.src(
		[
			'./src/**/*',
			'!./src/**/*.scss',
			'!./src/**/app.json',
			'!./src/**/host.js'
		]
	)
	.on('error', error=> {
		console.error(error.toString())
		this.emit('end');
	});

//
const appJson = ()=> gulp.src('./src/**/app.json')
	.pipe(tap(file => {
		const content = JSON.parse(file.contents.toString())
		const ROUTE = eval(fs.readFileSync('./src/mina/config/routes.js', 'utf-8'));
		content.pages = [];
		Object.values(ROUTE).forEach(item => {
			content.pages.push(item.substr(1)); // 去掉前面的/
		});
		file.contents = Buffer.from(JSON.stringify(content), 'utf-8');
	}))

//
const dist = async(url)=> {
	// 拷贝文件
	gulpSass().pipe(gulp.dest(url));
	copy().pipe(gulp.dest(url));
	appJson().pipe(gulp.dest(url));
}

//
const createElement = (type, name='customed-name')=> {
	let _target = 'page';
	// 根据模版生成对应的内容
	if(type === 'page'){
		_target = type + 's';
	}else if(type === 'comp'){
		_target = type + 'onents';
	}
	gulp.src([
		'./seeds/wxml/_wxml.wxml',
		'./seeds/css/_scss.scss',
		'./seeds/js/_' + _target + '.js',
		'./seeds/json/_' + _target + '.json'
	])
	.pipe(rename({
		basename: name == true ? 'untitled' : name
	}))
	.pipe(gulp.dest('./src/mina/' + _target));
}

//
const throwError = type=> {
	if(type === 'host'){
		console.error('Fatal Error: gulp host方法需携带参数：');
		console.group('--mock');
			console.log('用例：  gulp host --mock');
			console.log('描述：  mock假接口环境');
		console.groupEnd();
		console.group('--dev');
			console.log('用例：  gulp host --dev');
			console.log('描述：  开发环境');
		console.groupEnd();
		console.group('--prod');
			console.log('用例：  gulp host --prod');
			console.log('描述：  生产环境');
		console.groupEnd();
		console.error('否则会默认编译请求的域名为dev开发环境');
	}else if(type === 'create'){
		console.error('Fatal Error: gulp create方法必须携带以下一种参数：');
		console.group('--page [?name]');
			console.log('用例：  gulp create --page untitled');
			console.log('描述：  mock假接口环境');
		console.groupEnd();
		console.group('--comp [?name]');
			console.log('用例：  gulp create --comp untitled');
			console.log('描述：  开发环境');
		console.groupEnd();
		console.error('否则不会正确执行');
	}else return false;
}












/****************************/
/*****************************
 ***         TASKS         ***
 ****************************/
/****************************/

/**
 * @description 强制编译src
 */
gulp.task('dist', async ()=> {
	await dist('./dist');
})









/**
 * @description 根据环境对请求的baseUrl进行设定
 */
gulp.task('host', () => gulp.src('./src/mina/config/host.js')
	.pipe(tap(file=> {
		let host;
		if(arg.dev || arg.mock || arg.prod){
			switch (arg) {
				case 'mock':
					host = '"http://193.112.40.217:7300/mock"';
					break;
				case 'dev':
					host = '"https://www.xiaozhitianxia.com"';
					break;
				case 'prod':
					host = '"https://www.filepro.cn"';
					break;
				default:
					host = '"https://www.xiaozhitianxia.com"';
					break;
			}
			file.contents = Buffer.from(`exports.HOST=${host};`, 'utf-8');
		}else throwError('host');
	}))
	.pipe(gulp.dest('./src/vendor'))
	.pipe(gulp.dest('./dist/vendor'))
)




/**
 * @description 清空dist文件夹
 */
gulp.task('create', async ()=> {
	if(!arg.page && !arg.comp){
		throwError('create');
		return false;
	}
	// 生成wxml
	for (let i in arg){
		if(i === 'page' || i === 'comp'){
			await createElement(i, arg[i]);
		}else if(i === '_'){
			//
		}else throwError('create');
	}
});




/**
 * @required
 * @description 热更新（开发时必须开启watch监听）
 */
gulp.task('watch', ()=> {
	let watcher = gulp.watch('./src');
	watcher.on('change', function(event) {
		dist('./dist');
	});
});