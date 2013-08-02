// 3: given the following code, how would you override the value of the
// bar property for the variable foo without affecting the value of the
// bar property for the variable bim? how would you affect the value of
// the bar property for both foo and bim? how would you add a method to
// foo and bim to console.log the value of each object's bar property? how
// would you tell if the object's bar property had been overridden for the
// particular object?
var Thinger = function() {
	return this;
};

Thinger.prototype = {
	bar: 'baz'
};

var foo = new Thinger(),
	bim = new Thinger();
