// What gets logged to the console?

var foo = 'hello';

(function() {
  var foo = foo || 'world';
  console.log(foo);
})();