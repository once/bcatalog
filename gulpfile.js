var gulp = require("gulp"),
	browserify = require('browserify'),
	browserSync = require('browser-sync').create(),
	fs = require('fs'),
	merge = require('merge-stream');
	
/* DEBUG tasks */ ///////////////////////////////////////////////

gulp.task("serve", ["browserify-bundle-debug"], function() {
	
	browserSync.init({
			server: {
		
				baseDir: "./debug/www"
			},
			notify : false
		});
		
		gulp.watch("./src/www/**/*", ["watch"]);
	
});	

gulp.task("watch",["browserify-bundle-debug"], function() {
	
	browserSync.reload();
	
});

gulp.task("browserify-bundle-debug", ["copy-app-files-debug"], function() {
	
	var b_params = {
		entries : ['./debug/www/js/app.js'],
		paths: ['./node_modules','./debug/www/js/'],
		standalone : 'srf_app'
	};
	
	var b = browserify(b_params);
		
	b.transform('brfs');	// transform used for templates in JS code

	return b.bundle().pipe(fs.createWriteStream('./debug/www/js/bundle.js'));
	
});

gulp.task("copy-app-files-debug", [], function() {
	
	var filegroups = [
					{	src : "src/www/**/*",	dst :"debug/www/"	},
					{	src : "blank/cordova.js",	dst : "debug/www/"	},
					
					];
	
		var tasks = filegroups.map( function(filegroup) {
				
				return gulp.src(filegroup.src).pipe(gulp.dest(filegroup.dst));
			
		});
		
		return merge.apply(null, tasks);
		
	
});
/////////////////////////////////////////////////////////


/* BUILD TASKS */ ///////////////////////////////////////////////

gulp.task("build", ["browserify-bundle"], function() {});	

gulp.task("browserify-bundle", ["copy-app-files"], function() {
	
	var b_params = {
		entries : ['./build/www/js/app.js'],
		paths: ['./node_modules','./build/www/js/'],
		standalone : 'srf_app'
	};
	
	var b = browserify(b_params);
		
	b.transform('brfs');	// transform used for templates in JS code

	return b.bundle().pipe(fs.createWriteStream('./build/www/js/bundle.js'));
	
});

gulp.task("copy-app-files", [], function() {
	
	var filegroups = [
					{	src : "src/www/**/*",	dst :"build/www/"	},
					{	src : "src/res/**/*",	dst : "build/www/res/"	},
					{	src : "src/config.xml",	dst : "build/www/"	},
					
					];
	
		var tasks = filegroups.map( function(filegroup) {
				
				return gulp.src(filegroup.src).pipe(gulp.dest(filegroup.dst));
			
		});
		
		return merge.apply(null, tasks);
		
	
});

/////////////////////////////////////////////////////////