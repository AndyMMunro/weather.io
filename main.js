
$(document).ready(function () {

    // local storage call for buttons
    let history = JSON.parse(window.localStorage.getItem("city"));
    if (history == null) {
        history = []
    }
    // this runs the localStorage though the button propigation
    for (let i = 0; i < history.length; i++) {
        searchHistBtnRend(history[i]);
    }
    // console.log(history);

    // this changes the location variable to city var in the .then function 

    $(".searchBtn").on("click", function (event) {
        // Preventing the buttons default behavior when clicked 
        // (which is submitting a form)
        event.preventDefault();

        // if (city !== '') {
        // searchHistBtnRend(city);
        // }
        var cityInput = $(".city-search-text").val().trim();

        searchHistBtnRend(cityInput);

        currentWeather(cityInput);

        forecast(cityInput);

        clear()

    });

    // for current weather temp wind humdity API call

    function currentWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=79e878a8b6f5bfce841612e4037403ac"

        $.ajax({
            url: queryURL,
            method: "GET"

            // Performing GET requests
        }).then(function (resp) {

            // console.log(city, "looking for me");

            if (history.indexOf(city) == -1) {
                history.push(city)
                window.localStorage.setItem("city", JSON.stringify(history))
            }

            // console.log(resp);
            // Create a new table row element
            var tRow = $("<tr>").addClass("data-rows");
            // This is why we can create and save a reference to a td in the same statement we update its text
            var tempCalc = ((resp.main.temp) - 273) * 1.8 + 32;

            // temp conversion from K to F

            var fTemp = $("<td>").text(parseInt(tempCalc))

            // console.log(fTemp)
            var lat = resp.coord.lat
            var lon = resp.coord.lon
            var location = $("<td>").text(resp.name);
            var humidityTd = $("<td>").text(resp.main.humidity);
            var windSpeedTd = $("<td>").text(resp.wind.speed);
            var windDegTd = $("<td>").text(resp.wind.deg);

            // Append the newly created table data to the table row
            tRow.append(location, fTemp, humidityTd, windSpeedTd, windDegTd);

            // Append the table row to the table body
            $("tbody").append(tRow);
            $(".display-4").append(resp.name)

            uvIndex(lat, lon)

        });
    }
    // uv index call and post
    function uvIndex(lat, lon) {
        // console.log(lat, lon);
        var queryUvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&cnt=1&APPID=79e878a8b6f5bfce841612e4037403ac`
        $.ajax({
            url: queryUvURL,
            method: "GET"
        }).then(function (resp3) {
            // console.log(resp3);
            var uV = $("<td>").text(resp3.value);
            $(".data-rows").append(uV)
        });
    }
    // forecast call
    function forecast(city) {

        var queryForcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=79e878a8b6f5bfce841612e4037403ac"

        $.ajax({
            url: queryForcastURL,
            method: "GET"

        }).then(function (resp1) {
            console.log(resp1)

            var head5 = $(".card-body-1")
            var location = $("<h5>").text(resp1.city.name);
            var forecastDate = $("<h5>").text(resp1.list[0].dt_txt);
            var humidity = $("<h5>").text(resp1.list[0].main.humidity);
            var clouds = $("<h5>").text(resp1.list[0].weather[0].description);

            // temp conversion from K to F
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;
            var temp = $("<h5>").text(parseInt(tempCalcFore));
            // console.log(lat, lon);
            head5.append(location, forecastDate, humidity, clouds, temp)


            var head5 = $(".card-body-2")
            var location = $("<h5>").text(resp1.city.name);

            var forecastDate = $("<h5>").text(resp1.list[8].dt_txt);
            var humidity = $("<h5>").text(resp1.list[8].main.humidity);
            var clouds = $("<h5>").text(resp1.list[8].weather[0].description);
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;
            var temp = $("<h5>").text(parseInt(tempCalcFore));
            // temp conversion from K to F

            // console.log(forcastDate);
            head5.append(location, forecastDate, humidity, clouds, temp)

            var head5 = $(".card-body-3")
            var location = $("<h5>").text(resp1.city.name);

            var forecastDate = $("<h5>").text(resp1.list[16].dt_txt);
            var humidity = $("<h5>").text(resp1.list[16].main.humidity);
            var clouds = $("<h5>").text(resp1.list[16].weather[0].description);
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;
            var temp = $("<h5>").text(parseInt(tempCalcFore));

            head5.append(location, forecastDate, humidity, clouds, temp)

            var head5 = $(".card-body-4")
            var location = $("<h5>").text(resp1.city.name);

            var forecastDate = $("<h5>").text(resp1.list[24].dt_txt);
            var humidity = $("<h5>").text(resp1.list[24].main.humidity);
            var clouds = $("<h5>").text(resp1.list[24].weather[0].description);
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;
            var temp = $("<h5>").text(parseInt(tempCalcFore));
            // temp conversion from K to F

            // console.log(forecastDate);
            head5.append(location, forecastDate, humidity, clouds, temp)

            var head5 = $(".card-body-5")
            var location = $("<h5>").text(resp1.city.name);

            var forecastDate = $("<h5>").text(resp1.list[32].dt_txt);
            var humidity = $("<h5>").text(resp1.list[32].main.humidity);
            var clouds = $("<h5>").text(resp1.list[32].weather[0].description);
            // temp conversion from K to F
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;

            var temp = $("<h5>").text(parseInt(tempCalcFore));

            // console.log(forcastDate);
            head5.append(location, forecastDate, humidity, clouds, temp)

        });
    };
    // clear fields function
    function clear() {
        // $(".city-search-text").empty();
        $(".city-search-text").val('');
        $(".display-4").empty();
        $("tbody").empty();
        $(".card-body-1").empty();
        $(".card-body-2").empty();
        $(".card-body-3").empty();
        $(".card-body-4").empty();
        $(".card-body-5").empty();

    }
    // create buttons function 
    function searchHistBtnRend(city) {
        console.log(city);
        // grabbing button propigation location 
        var searchHistBtnLoc = $(".search-hist");
        // creating button element  
        var button = $("<button>");
        button.addClass("prevSerHistBtn");
        // creating text to be displayed on button 
        button.text(city);
        // appending button to div 
        searchHistBtnLoc.prepend(button);
        // return button.text(city);
        // console.log(button.text(city));
    };

    $(".prevSerHistBtn").on("click", function (event) {
        // console.log(prevSerHistBtn.innerText);
        // console.log("button is being clicked");

        let cityHist = $(this).text();
        // console.log(cityHist);

        currentWeather(cityHist);
        forecast(cityHist);
        clear();
    })


});



