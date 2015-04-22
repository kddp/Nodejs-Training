/*var d1 = new Date("December 08, 2014 11:47:00");
var d2 = new Date();
var d3 = new Date("2014/12/08 16:18:00");

var time = new Date().getTime();
var date = new Date(time);
console.log(time);
console.log(date);
console.log("TIMEZONE:",date.getTimezoneOffset());

var a = new Date().getTime();
console.log(a);
console.log(new Date(a));

console.log(d2 - d1);
console.log(d2.getFullYear());
console.log(d2.getHours());
console.log(d2.getMonth());

var d1 = new Date();
var d2 = new Date("December 09,2014 11:34:00");
var d3 = new Date("2014/12/09 11:12:00");

console.log(d1);
console.log(d2);
console.log(d3);

var ms = d1 - d2,
min = Math.floor((ms/1000/60) << 0),
sec = Math.floor((ms/1000) % 60);

console.log(min + ':' + sec);
*/
var d1 = new Date("2014-09-27T06:48:02.000Z");
var d2 = new Date("2014-09-27T06:49:02.000Z");
var d3 = new Date("2014/12/10 17:38:00");
console.log(d3);

console.log(d2-d1);

console.log(!typeof s === 'undefined');

var date = new Date();
var s = date.toISOString();
console.log("To ISO String:",s);
console.log("WITHOUT ISO:",date);
console.log("AFTER ISO:",new Date(s));
var d = ""
console.log(d.length);
console.log("-----");
var a = true;
console.log(typeof a);
a = JSON.stringify(a);
console.log(typeof a);

console.log("-----");
var b = true;
console.log(typeof b);
b = b.toString();



