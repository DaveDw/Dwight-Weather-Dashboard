var side = document.querySelector(".sidebar");

var searchBar = document.querySelector('.SearchBar')
var searchBtn = document.querySelector("#searchBtn");
var latestSearch = document.querySelector(".latest-search");
var apiKey = "5baf2d7235863d62db281131097e2219";
var currentDayTime = moment().format('MMMM Do YYYY, h:mma');;
$("#currentDayTime").text(currentDayTime);

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var city = $(".searchBar").val().trim();

});
