// Write code such that the following alerts "Hello World"
say('Hello')('World');


// For the sake of simplicity, assume this code comes *before* the example code

var say = function (one) {
	return function (two) {
		alert(one + ' ' + two);
	};
};

// This question is really just to test if you're comfortable with returning a
// function from another function and if you're comfortable enough with
// scoping rules to not feel the need to overengineer the parameters.
