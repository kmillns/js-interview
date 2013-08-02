<a href="#">Show it.</a>

<div style="display: none;">
	<span>Hidden stuff.</span>	
</div>


// write a simple click handler to show the hidden div



// This is sort of a multi-step problem, where, depending on the answers, 
// you can dig in to see refactoring a very simple problem

// Naive (totally valid) solution

$('a').click(function () {
	$('div').show();
});

// OK, so what if there were multiple anchors and divs on the page?

// Add some ids is a common answers

<a id="trigger" href="#">Show it.</a>

<div id="target" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

$('#trigger').click(function () {
	$('#target').show();
});

// Cool, so now we're bound to ids rather than element names
// What if we wanted to reuse that same behavior on different pages
// and not tie it to a specific set of ids?

// Make it class based

<a class="x-trigger" href="#">Show it.</a>

<div class="x-target" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

$('.x-trigger').click(function () {
	$('.x-target').show();
});

// OK, so what about if the markup is added dynamically after page load?

// Old and busted (deprecated in jQuery < 1.7, removed in 1.9)

$('.x-trigger').live('click', function () {
	$('.x-target').show();
});

// New hotness

$('.x-trigger').on('click', function () {
	$('.x-target').show();
});

// Awesome, so, now, what if we wanted to have the same behavior on the page
// in multiple places (meaning we wanted one anchor to show one div, and another
// anchor to show another div)

// Naive (unscalable) approach
// Repeat the code with unique class names

<a class="x-trigger-1" href="#">Show it.</a>

<div class="x-target-1" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

<a class="x-trigger-2" href="#">Show it.</a>

<div class="x-target-2" style="display: none;">
	<span>Hidden stuff.</span>	
</div>


$('.x-trigger-1').on('click', function () {
	$('.x-target-1').show();
});

$('.x-trigger-2').on('click', function () {
	$('.x-target-2').show();
});

// Or, if you're being clever (too clever)
$('[class="x-trigger"]').on('click', function () {
	var splitName = $(this).attr('class').split('-');
	var id = splitName[splitName.length - 1];
	$('.x-target-' + id).show();
});

// This offends my delicate engineering sensibilities.
// The first way repeats itself, the second is brittle.

// Two totally awesome ways to do it using data attributes

// Linked by group ids
// - Used in most of the platform code
// - Advantage is that you can set up a many to many trigger to target
//   relationship


<a data-show-trigger="1" href="#">Show it.</a>

<div data-show-target="1" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

<a data-show-trigger="2" href="#">Show it.</a>

<div data-show-target="2" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

<div data-show-target="2" style="display: none;">
	<span>More hidden stuff.</span>	
</div>

$('[data-show-trigger]').on('click', function () {
	var id = $(this).data('show-trigger');
	$('[data-show-target=' + id + ']').show();
});

// Linked by selector targeting
// - Used by Bootstrap
// - Advantage is specificity readbility and ease of targeting non 
//   data attribute items

<a data-show-trigger="[data-show-target='1']" href="#">Show it.</a>

<div data-show-target="1" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

<a data-show-trigger=".x-hiddenGroup" href="#">Show it.</a>

<div class=".x-hiddenGroup" style="display: none;">
	<span>Hidden stuff.</span>	
</div>

<div class=".x-hiddenGroup" style="display: none;">
	<span>More hidden stuff.</span>	
</div>

$('[data-show-trigger]').on('click', function () {
	var target = $(this).data('show-trigger');
	$(target).show();
});
