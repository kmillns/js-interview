<div>
	<a>foo</a>
</div>


// what's the difference between these three click handlers?

$('a').on('click', function (event) {
	$(this).doStuff();

	return false;
});


$('a').on('click', function (event) {
	$(this).doStuff();

	event.preventDefault();
});


$('a').on('click', function (event) {
	event.preventDefault();

	$(this).doStuff();
});