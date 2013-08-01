// What's wrong with this code?

(function ($) {
	var foo;

	$.get('http://localhost/foo', function (data) {
		foo = 'foo';
	});

	doSomething(foo);
})(jQuery);