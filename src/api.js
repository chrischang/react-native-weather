import _ from 'lodash'
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=9957861c93a1f9e0c055ae9e1e9204d7'

var kelvinToF = function(kelvin) {
	return Math.round((kelvin - 273.15) * 1.8 + 32) + '˚F';
}

module.exports = function(laitutde, longitude) {
	var url = `${rootUrl}&lat=${laitutde}&lon=${longitude}`;
	console.log(url);
	return fetch(url)
		.then((response) => response.json())
		.then((json) => {
			return {
				city: json.name,
				temperature: kelvinToF(json.main.temp),
				description: _.capitalize(json.weather[0].description)
			}
		})
		.catch((error) => {
			console.log(error)
		})
}