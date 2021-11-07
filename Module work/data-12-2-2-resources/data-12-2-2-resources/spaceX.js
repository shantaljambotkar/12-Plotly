const url = "https://api.spacexdata.com/v2/launchpads";

// receivedData = d3.json(url).then(receivedData => console.log(receivedData));

// var lists = receivedData.map()

// var topFiveCityNames = topFiveCities.map(city => city.City);

// var spaceXResults = d3.json(url)
// console.log(spaceXResults)
// var data = Object.keys(spaceXResults).map(function (num){
//     return num[0].latitude.longitute
// })

// console.log(data)
// var spaceXResults = d3.json(url)

d3.json(url).then(spaceXResults => console.log(spaceXResults.map(item => [item.location.latitude, item.location.longitude])));
// d3.json(url).then(spaceXResults => console.log(spaceXResults.map(item => item.location.latitude)));  

// d3.json(url).then(spaceXResults => console.log(spaceXResults.map(item => item.location.longitude)));  
 // return item['location']['latitude']
// }));

// var data = Object.keys.spaceXResults.map(item => item[0])

// console.log(data)