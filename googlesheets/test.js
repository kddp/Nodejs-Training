var route_positions = [
                       {
                           "name": "KLAS",
                           "lat_is_north": true,
                           "latitude_dmt": 36.06666666666667,
                           "lon_is_east": false,
                           "longitude_dmt": 115.15
                       },
                       {
                           "name": "SHEAD",
                           "lat_is_north": true,
                           "latitude_dmt": 35.88333333333333,
                           "lon_is_east": false,
                           "longitude_dmt": 115.96666666666667
                       }
                   ];
for(var i=0; i < route_positions.length; i++)
{
  console.log(JSON.stringify(route_positions[i]));
}

/*for(var i=0; i < listOfWeatherRequest[recordNum].route_positions.length; i++)
{
  console.log(JSON.stringify(listOfWeatherRequest[recordNum].route_positions[i]));
}*/

console.log("MIN_VALUE",Date.MinValue);
console.log("NULL DATE",new Date("").toJSON());

console.log(new Date(undefined));

var response_datetime;
var temp_datetime1;
var temp_datetime2="123";

if((response_datetime) || (temp_datetime1) || (temp_datetime2))
{
  console.log("Yes it worked");
}
else
{
  console.log("It dint worked");
}


console.log(" ".toString());

var temp_datetime = new Object();
temp_datetime.t = "abcdef";
console.log(temp_datetime.t);

The flight was supposed to depart from [departure airport] at [time], but was delayed by over [number] hours.