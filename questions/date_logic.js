// What is the faulty logic in the following code?
// how would you fix it?
var date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    dates = [];

for (var i = 0; i <= 5; i++) {
  dates.push(month + '/' + (day + i));
}

console.log('The next five days are ', dates.join(', '));