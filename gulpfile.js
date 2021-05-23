const chalk = require('chalk')
const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const header = require('gulp-header')
const pkg = require('./package.json')

const tpl = `
'/*!
* sass-greedy v<%= version %>
* A flexible, lightweight and simple grid generator for sass.
*
* Author: <%= author %>
*/
`.trimStart()

const paths = {
  sass: [
    './src/helpers/*.scss',
    './src/generators/*.scss',
    './src/*.scss'
  ],
  dist: './dist/'
}

// build greedy
gulp.task('build', function () {
  return gulp.src(paths.sass)
    .pipe(concat('_greedy.scss'))
    .pipe(
      header(
        tpl,
        {
          version: pkg.version,
          author: pkg.author
        }
      )
    )
    .pipe(gulp.dest(paths.dist))
    .on('end', function () {
      console.log(chalk.green('Build process has been completed successfully.'))
    })
})

// clean dist folder
gulp.task('clean', function () {
  return del(paths.dist)
})

// default task
gulp.task(
  'default',
  gulp.series(
    'clean',
    'build'
  )
)
