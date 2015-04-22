var today = new Date();
var month = today.getMonth();
var day = today.getDate();
var year = today.getFullYear();

var d1 = new Date(year,month,day);
var d2 = "2015-01-15T20:51:04.000Z";

console.log("d1---",d1.toISOString());
console.log("d2---",d2);

console.log(d2 > d1);

/*if(d2 > d1){
	console.log(d1 + " is > "+d2);
}*/