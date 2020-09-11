const key = 'ae79f44407a13edcb7b72adfd53b9334';

let cityName = '';

const sendButton = document.getElementById('send-button');

function weather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
	.then(function(resp) { return resp.json() })
	.then(function(data) {
		drawWeather(data);
	})
	.catch(function() {
		document.getElementById('location').innerHTML = 'Sorry, there appears to have been an error';
	});
}
function drawWeather(d) {
  let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  let description = d.weather[0].description; 
	
  document.getElementById('description').innerHTML = description;
  document.getElementById('temp').innerHTML = fahrenheit + 'F' + '&deg;';
  document.getElementById('location').innerHTML = d.name;
  
  if (description.indexOf('rain') > 0) {
      document.body.className = 'rainy';
  } else if (description.indexOf('cloud') > 0) {
      document.body.className = 'cloudy';
  } else if (description.indexOf('sunny') > 0) {
  	document.body.className = 'sunny';
  } else {
  	document.body.className = 'clear';
  }
}

window.onload = function() {
	weather('Chicago');
};

sendButton.onclick = function () {
    let cityName = document.getElementById('city-name').value;
    weather(cityName);
    cityName.innerHTML = '';
    cityName.placeholder.innerHTML = '';
};