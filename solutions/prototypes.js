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


// how would you override the value of the
// bar property for the variable foo without affecting the value of the
// bar property for the variable bim?

// What we're looking for here is if you understand the property lookup chain.
// Local properties are tried first and don't affect other objects' properties.

foo.bar = 'override';

bim.bar === 'baz'; // true


// how would you affect the value of
// the bar property for both foo and bim?
// Note: this only affects the value if it *hasn't* been set locally

// This time we're asking for the other side of things.
// Altering a prototype alters the objects that have been created with that
// prototype *even after they've been created*.

Thinger.prototype.bar = 'woo';

bim.bar === 'woo'; // true
foo.bar === 'woo'; // false (foo is using its local value)
foo.bar === 'override'; // true

// how would you add a method to
// foo and bim to console.log the value of each object's bar property?

// Here we're testing adding objects to the prototype after the objects
// were created.
// Also, we're testing if you understand the scope of 'this' inside prototype
// properties points to the instance of the object.

Thinger.prototype.logger = function () {
	console.log(this.bar);
}

foo.logger(); // logs 'override'
bar.logger(); // logs 'woo'


// how
// would you tell if the object's bar property had been overridden for the
// particular object?

// Testing if you understand 'hasOwnProperty'

foo.hasOwnProperty('bar'); // true
bim.hasOwnProperty('bar'); // false

// BONUS: When would you use 'hasOwnProperty' in practice?

// Crockford-ian Answer:
// As a filter when enumerating over an object's properties with
// for ( in ) {} loops to defend against taking prototype properties

Array.prototype.badIdea = function () {
	console.log('oh god why are you modifying globals?!');
};

var test = [1, 2, 3];

var i;

for (i in test) {
	console.log(i);
}

// Oh no you broke it.

for (i in test) {
	if (test.hasOwnProperty(i)) {
		console.log(i);
	}
}

// jQuery answer:
// Test if an object is a plain object based on the presence of a constructor
// or prototype

core_hasOwn = Object.prototype.hasOwnProperty

isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	}
