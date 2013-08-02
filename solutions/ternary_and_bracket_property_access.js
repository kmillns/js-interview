// 1: how could you rewrite the following to make it shorter?
if (foo) {
  bar.doSomething(el);
} else {
  bar.doSomethingElse(el);
}

// This is testing two things:

// One, are you comfortable with the ternary operator?
// Two, are you comfortable with bracket notation rather than dot notation
// when appropriate?

// Simple solution:
foo ? bar.doSomething(el) : bar.doSomethingElse(el);

// Slightly cleaner solution 
bar[foo ? 'doSomething' : 'doSomethingElse'](el);

// Probably too clever solution
bar['doSomething' + foo ? '' : 'Else'](el);
