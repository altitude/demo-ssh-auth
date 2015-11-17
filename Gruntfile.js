module.exports = function(grunt){

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		wiredep: {
			task: {
				src: ['views/**/*.html'],
				ignorePath: '..',
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			scripts: {
				src: ['assets/scripts/**/*.js'],
				dest: 'public/scripts/main.js',
			}
		},

		stylus: {
			task: {
				files: {
					'public/styles/main.css': 'assets/styles/main.styl',
				}
			}
		},

		watch: {
			styles: {
				files: ['assets/styles/**/*.styl'],
				tasks: ['stylus'],
			},
			scripts: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['concat:scripts'],
			}
		}

	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'wiredep',
		'concat',
		'stylus',
	]);
}