var side = document.querySelector(".sidebar");

var searchBar = document.querySelector("#searchBar");
var searchBtn = document.querySelector("#searchBtn");
var latestSearch = document.querySelector(".latest-search");
var apiKey = "5baf2d7235863d62db281131097e2219";
var currentDayTime = moment().format("MMMM Do YYYY, h:mma");
$("#currentDayTime").text(currentDayTime);

function forecast(apiOutput) {
    
}

function queryWeather(x, y) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${x}&lon=${y}&appid=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (res) {
    console.log(res);
    var temp = res.current.temp;
    var wind_speed = res.current.wind_speed;
    var humidity = res.current.humidity;
    var uvIndex = res.current.uvi;
    var iconCode = res.current.weather[0].icon;
    var pTemp = $("<p/>");
    var pHumidity = $("<p/>");
    var pWind_speed = $("<p/>");
    var pUV = $("<p/>");
    var iconURL = $("<img/>");

    iconURL.attr("src", `https://openweathermap.org/img/wn/${iconCode}.png`);
    iconURL.css("width", "100px");

    pTemp.text(`Temperature: ${temp}°F`);

    pHumidity.text(`Humidity: ${humidity}`);

    pWind_speed.text(`Wind Speed: ${wind_speed}`);

    pUV.text(`UV Index: ${uvIndex}`);

    $(".result-box").append(iconURL, pTemp, pHumidity, pWind_speed, pUV);

    forecast(res);
  });
}

function coordinateConversion(city) {
  var queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (res) {
    console.log(res);
    var x = res[0].lat;
    var y = res[0].lon;
    console.log(x, y);
    queryWeather(x, y);
  });
}

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  console.log(searchBar.value);
  var searchRes = searchBar.value;
  var lastSearch = $(`
  <p>${searchRes}</p>
  `);
  $(".history").empty();
  $(".history").append(lastSearch);

  coordinateConversion(searchRes);
});
