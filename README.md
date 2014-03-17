# gulp-append-data
> Append content of JSON file to streamed file object. Useful in combination with [gulp-consolidate](https://github.com/timrwood/gulp-consolidate).

## Usage

First, install `gulp-append-data` as a development dependency:

```shell
npm install --save-dev gulp-append-data
```

Then, add it to your `gulpfile.js`:

```javascript
var appendData = require('gulp-append-data');
var consolidate = require('gulp-consolidate');

gulp.task('html', function(){
	gulp.src(['./app/*.html'])
		.pipe(appendData())
		.pipe(consolidate('swig', function(file) {
				return file.data;
		}))
		.pipe(gulp.dest('./dist'));
});
```

Now the content of ```app/test.json``` will be available when compiling ```app/test.html```.

## Example

app/test.json
```json
{
	"foo": "bar"
}
```

app/test.html
```html
<div>{{ foo }}</div>
```

dist/test.html
```html
<div>bar</div>
```

## API

### appendData(options)

#### options.property
Type: `String`

File object property to save the JSON to (optional, defaults to ```data```).

#### options.getRelativePath
Type: `Function`

Path of JSON file relative to streamed file (optional, defaults to ```function(file) { return util.replaceExtension(path.basename(file.path), '.json'); }```, see example above).

