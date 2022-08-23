var side = document.querySelector(".sidebar");

var searchBar = document.querySelector("#searchBar");
var searchBtn = document.querySelector("#searchBtn");
var latestSearch = document.querySelector(".latest-search");
var apiKey = "5baf2d7235863d62db281131097e2219";
var currentDayTime = moment().format("MMMM Do YYYY, h:mma");
$("#currentDayTime").text(currentDayTime);

function forecast(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (apiOutput) {
    console.log(apiOutput);

    $(".forecast").empty();

    for (var i = 0; i < 40; i += 7) {
      var currDateConvert = new Date(apiOutput.list[i].dt * 1000).toISOString();
      var currDate = currDateConvert.split("T")[0]; //["Fri", "Apr", "22", "2022", ""]
      var temp = apiOutput.list[i].main.temp;
      console.log(currDate);
      console.log(temp);
      var humidity = apiOutput.list[i].main.humidity;
      var wind_speed = apiOutput.list[i].wind.speed;
      var iconCode = apiOutput.list[i].weather[0].icon;
      var futureCard = $(`
        <div class="card">
  <div class="card-body">
    <h5 class="card-title"></h5>
    <h6class="card-text">Date: ${currDate}</h6>
    <img src="https://openweathermap.org/img/wn/${iconCode}.png" style="width:100px" alt="" ></img>
    <p class="card-text">Temp: ${temp}°F</p>
    <p class="card-text">Humidity: ${humidity}</p>
    <p class="card-text">Wind: ${wind_speed}</p>
  </div>
</div>
    `);

      $(".forecast").append(futureCard);
    }

  });

}

function queryWeather(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (res) {
    console.log(res);
    var temp = res.main.temp;
    var wind_speed = res.wind.speed;
    var humidity = res.main.humidity;
    //doesn't appear to carry UV Index in the free version documentation
    var uvIndex = 1;
    var iconCode = res.weather[0].icon;
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
    $(".result-box").empty();
    $(".result-box").append(iconURL, pTemp, pHumidity, pWind_speed, pUV);
    // $(".result-box").append(pTemp, pHumidity, pWind_speed, pUV);

    forecast(lat, lon);
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
    var lat = res[0].lat;
    var lon = res[0].lon;
    console.log(lat, lon);
    queryWeather(lat, lon);
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
