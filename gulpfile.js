var gulp = require('gulp');
var glob = require('glob');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
var browserify = require('browserify');
var path = require('path');
var babelify = require('babelify');
var streamTransform = require('vinyl-source-stream');
var config = {
    reg : 'js/*',
    savePath : './'
};


gulp.task('build-js',function(){
    new Promise(function (resolve) {
        tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest("./js"))
            .on('end', resolve);
    }).catch(e => {
        console.log(e);
    });

    glob(config.reg,function(err,files){
        files.map(function(file){
            if(path.extname(file) === '.js'){
                var name = path.parse(file).dir.split('/').pop() == config.orderPath ? path.parse(file).dir.split('/').pop() : path.parse(file).name;
                console.log(name);
                browserify(file)
                    .transform(
                        babelify.configure({
                            presets : ['env']
                        })
                    )
                    .bundle()
                    .pipe(streamTransform(path.basename(name + '.js')))
                    .pipe(gulp.dest(config.savePath));
            }
        })
    });
    console.log('finish');
});

gulp.task('rev-dev')

gulp.task('build-test',function(){
	let test = gulp.src('js/*.js');
	console.log(test);
});

gulp.task('build-html',['build-js'], function(){
	glob('html/index.html',function(err,files){

	})
})