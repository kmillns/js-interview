// What's wrong with this code?

(function ($) {
	var foo;

	$.get('http://localhost/foo', function (data) {
		foo = 'foo';
	});

	doSomething(foo);
})(jQuery);

// There's plenty of opportunity for refactoring here,
// but what we're really driving at is that doSomething
// relies on asynchronous code in the ajax callback.

// The fix:

(function ($) {
	$.get('http://localhost/foo', function (data) {
		var foo = 'foo';
		doSomething(foo);
	});
})(jQuery);