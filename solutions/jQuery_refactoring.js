// 6: how could you improve the following code?
$(document).ready(function () {
	$('.foo #bar').css('color', 'red');
	$('.foo #bar').css('border', '1px solid blue');
	$('.foo #bar').text('new text!');
	$('.foo #bar').click(function() {
		$(this).attr('title', 'new title');
		$(this).width('100px');
	});

	$('.foo #bar').click();
});

// First thing I see is selector caching:

// 6: how could you improve the following code?
$(document).ready(function () {
	var $fooBar = $('.foo #bar');
	$fooBar.css('color', 'red');
	$fooBar.css('border', '1px solid blue');
	$fooBar.text('new text!');
	$fooBar.click(function () {
		$(this).attr('title', 'new title');
		$(this).width('100px');
	});

	$fooBar.click();
});

// Don't forget to cache $(this)

$(document).ready(function () {
	var $fooBar = $('.foo #bar');
	$fooBar.css('color', 'red');
	$fooBar.css('border', '1px solid blue');
	$fooBar.text('new text!');
	$fooBar.click(function () {
		var $this = $(this);
		$this.attr('title', 'new title');
		$this.width('100px');
	});

	$fooBar.click();
});

// The $ prefix is a psuedo-Hungarian notation convention that says that the
// object is a jQuery selector result.  Not necessary, but idiomatic
// and a standard for us.

// Second thing is that we can chain the calls

$(document).ready(function () {
	var $fooBar = $('.foo #bar');
	$fooBar
		.css('color', 'red')
		.css('border', '1px solid blue')
		.text('new text!')
		.click(function () {
			var $this = $(this);
			$this
				.attr('title', 'new title')
				.width('100px');
		})
		.click();
});

// and yes, the chaining eliminates the need for selector caching in this case.
// The selector caching is still a good idea, and readability is preferred over
// clever chaining.

// Finally, you can condense the multiple CSS calls:

$(document).ready(function () {
	var $fooBar = $('.foo #bar');
	$fooBar
		.css({
			color: 'red',
			border: '1px solid blue'
		})
		.text('new text!')
		.click(function () {
			var $this = $(this);
			$this
				.attr('title', 'new title')
				.width('100px');
		})
		.click();
});

// Bonus points:

// An id selector should very very rarely depend on being inside a class,
// since a given id should be extremely specific.

var $fooBar = $('.foo #bar');

// becomes

var $bar = $('#bar');


// The CSS manipulation in JS creates mainentance and reuse problems

$fooBar
	.css({
		color: 'red',
		border: '1px solid blue'
	})

// becomes

$fooBar
	.addClass('funkyColor')

// with some CSS

.funkyColor {
	color: red;
	border: 1px solid blue;
}

// Triple testability bonus points:

// Extract the click handler into a named function:

$(document).ready(function () {
	var titleIt = function () {
		var $this = $(this);
		$this
			.attr('title', 'new title')
			.width('100px');
	};

	var $fooBar = $('#bar');
	$fooBar
		.addClass('funkyColor')
		.text('new text!')
		.click(titleIt)
		.click();
});

// Expose the whole thing outside the ready function as a testable object

window.funkifier = {
	titler: function () {
		var $this = $(this);
		$this
			.attr('title', 'new title')
			.width('100px');
	},

	makeFunky: function (elementToFunkify) {
		var $target = $(elementToFunkify);
		$target
			.addClass('funkyColor')
			.text('new text!')
			.click(funkifier.titler)
			.click();
	}
};

$(document).on('ready', function () {
	window.funkifier.makeFunky('#bar');
});

// Now we can test 'titler' and 'makeFunky' individually, rather than just
// testing their side effects

// Alternatively you could create a Funkifier object to be constructed
// with the properties you want to expose.

window.Funkifier = function (elementToFunkify) {
	var self = this;

	self.titler = function () {
		var $this = $(this);
		$this
			.attr('title', 'new title')
			.width('100px');
	};

	self.makeFunky = function () {
		var $target = $(elementToFunkify);
		$target
			.addClass('funkyColor')
			.text('new text!')
			.click(self.titler)
			.click();
	};

	return {
		titler: self.titler,
		makeFunky: self.makeFunky
	};
};

$(document).on('ready', function () {
	var funkifier = new Funkifier('#bar');

	funkifier.makeFunky();
});

