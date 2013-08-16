// How would you update this function to make the last two lines true

var first = '1';
var second = '2';
var name = 'foo';

var foo = (function () {

})();

foo.one === '1foo';
foo.two === '2foo';


// This can be good to drill in with questions to see how comfortable
// someone is with closures and the immediate invoke patterns.
// At its most basic, it's testing if you understand setting up object literals

// Simplest answer:

var first = '1';
var second = '2';
var name = 'foo';

var foo = (function () {
	return {
		one: first + name,
		two: second + name
	}
})();

foo.one === '1foo';
foo.two === '2foo';

// More explicit about external dependencies:

var first = '1';
var second = '2';
var name = 'foo';

var foo = (function (one, two, title) {
	return {
		one: one + title,
		two: two + title
	}
})(first, second, name);

foo.one === '1foo';
foo.two === '2foo';

// What if we wanted to prevent the name from being exposed outside foo?

var first = '1';
var second = '2';

var foo = (function (one, two) {
	var name = 'foo';

	return {
		one: one + name,
		two: two + name
	}
})(first, second);

foo.one === '1foo';
foo.two === '2foo';
