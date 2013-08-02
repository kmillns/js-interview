// What gets logged to the console?

var foo = 'hello';

(function() {
  var foo = foo || 'world';
  console.log(foo);
})();

// Answer: 'world'

// This is a bog simple case of variable hoisting and scope precendence
// It's much clearer once you break it down into what the interpreter is doing

// Step one: variables are hoisted to the top of their scope.
var foo = 'hello';

(function() {
  var foo;
  foo = foo || 'world';
  console.log(foo);
})();

// Step two, unassigned variables are undefined 
var foo = 'hello';

(function() {
  var foo;
  foo = undefined || 'world';
  console.log(foo);
})();

// Step three and undefined is falsey, therefore assign 'world' to foo
var foo = 'hello';

(function() {
  var foo;
  foo = false || 'world';
  console.log(foo);
})();

// For bonus points:
// What's logged to the console here

var foo = 'hello';

(function() {
  var foo = foo || 'world';
  console.log(foo);
})();

console.log(foo);

// Answer: 
// 'world'
// 'hello'

// Because the inner function scoped foo doesn't affect the outer variable
// just overwrites it locally.
