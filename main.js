
$(document).ready(function () {


    $(".searchBtn").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var city = $(".city-search-text").val().trim();
        // this sets variable location to city variable of the input 
        var location = city;
        // this changes the location variable to city var in the .then function 
        location = city;

        // url: "http://api.openweathermap.org/data/2.5/uvi?appid=548213dc11f704275b9979eff9e7e8cc&lat=" + lat + "&lon=" + lon,

        // UV index API key 
        // var queryURL1 = "api.openweathermap.org/data/2.5/uvi?q=" + lat + lon + "&APPID=79e878a8b6f5bfce841612e4037403ac"

        // UV index API call variables 
        // var lat = $(resp1.cord.lat)
        // var lon = $(resp1.cord.lon)


        // forecast call
        var queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=79e878a8b6f5bfce841612e4037403ac"

        $.ajax({
            url: queryForcastURL,
            method: "GET"

        }).then(function (resp1) {
            console.log(resp1)

            var head5 = $(".card-body")
            var forecastDate = $("<h5>").text(resp1.list[0].dt_txt);
            var humidity = $("<h5>").text(resp1.list[0].main.humidity);
            var clouds = $("<h5>").text(resp1.list[0].weather[0].description);
            var temp = $("<h5>").text(parseInt(tempCalc));
            // temp conversion from K to F
            var tempCalc = (parseInt(resp1.list[0].main.temp) - 273) * 1.8 + 32;

            // console.log(forcastDate);
            head5.append(forecastDate, humidity, clouds, temp)

        });




        // temp wind humdity API call
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=79e878a8b6f5bfce841612e4037403ac"
        $.ajax({
            url: queryURL,
            method: "GET"

            // Performing GET requests
        }).then(function (resp) {
            console.log(resp);
            // Create a new table row element
            var tRow = $("<tr>");
            // This is why we can create and save a reference to a td in the same statement we update its text
            var tempCalc = ((resp.main.temp) - 273) * 1.8 + 32;
            // temp conversion from K to F

            var fTemp = $("<td>").text(parseInt(tempCalc))

            // console.log(fTemp)
            var humidityTd = $("<td>").text(resp.main.humidity);
            var windSpeedTd = $("<td>").text(resp.wind.speed);
            var windDegTd = $("<td>").text(resp.wind.deg);

            // Append the newly created table data to the table row
            tRow.append(fTemp, humidityTd, windSpeedTd, windDegTd);
            // Append the table row to the table body
            $("tbody").append(tRow);
            $(".display-4").append(resp.name)

        });



        clear();
        // console.log(citySearchText);

        var citySearchText = $(".city-search-text")

        console.log(location);
        if (city !== '') {
            searchHistBtnRend(city);
        }


        // /        var tempLocation = JSON.parse(localStorage.getItem("location"))
        //         tempLocation.push(city)

        //         localStorage.setItem("location", JSON.stringify(tempLocation))


        //         return location;


    });

    function clear() {
        // $(".city-search-text").empty();
        $(".city-search-text").val('');
        $(".display-4").empty();
    }

    function searchHistBtnRend(city) {
        // grabbing button propigation location 
        var searchHistBtnLoc = $(".search-hist");


        // creating button element  
        var button = $("<button>");
        button.addClass("prevSerHistBtn");
        // creating text to be 
        //displayed on button 
        button.text(city);
        // appending button to div 
        searchHistBtnLoc.append(button);


    }

    $(".prevSerHist").on("click", function (event) {

        location = button.text(city);

    });

    // console.log(searchHistBtnRend())
});

