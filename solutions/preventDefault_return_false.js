<div>
	<a href="/doStuff">foo</a>
</div>


// what's the difference between these three click handlers?

// This version will prevent the default action (following the link)
// but will also stop propogation (events bound up the DOM won't recieve it),
// and stop immediate propogation (subsequent events on this element won't
// receive it, either)
$('a').on('click', function (event) {
	$(this).doStuff();

	return false;
});

// Both of these two examples only prevent default, which allows for
// propogation normally.
// The difference is subtle, and relates to what happens in a failure case.
// In the first example, if doStuff() fails, you still click through to the
// underlying link action.
// In the second, if doStuff() fails, your link is dead, and does nothing.

// Thus, the second example (preventDefault *last* in the event handler) is
// the preferable option for progressive enhancement purposes.

$('a').on('click', function (event) {
	$(this).doStuff();

	event.preventDefault();
});


$('a').on('click', function (event) {
	event.preventDefault();

	$(this).doStuff();
});
