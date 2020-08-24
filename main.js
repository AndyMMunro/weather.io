
$(document).ready(function () {

    var city;
    var citySearchLocation = [];

    $(".searchBtn").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        city = $(".city-search-text").val().trim();
        // this sets variable location to city variable of the input 
        var location = city;
        // this changes the location variable to city var in the .then function 
        location = city;

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
        // var queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=79e878a8b6f5bfce841612e4037403ac"
        var queryForcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=79e878a8b6f5bfce841612e4037403ac"

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

            var forecastDate = $("<h5>").text(resp1.list[6].dt_txt);
            var humidity = $("<h5>").text(resp1.list[6].main.humidity);
            var clouds = $("<h5>").text(resp1.list[6].weather[0].description);
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

            var forecastDate = $("<h5>").text(resp1.list[26].dt_txt);
            var humidity = $("<h5>").text(resp1.list[26].main.humidity);
            var clouds = $("<h5>").text(resp1.list[26].weather[0].description);
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;
            var temp = $("<h5>").text(parseInt(tempCalcFore));
            // temp conversion from K to F

            // console.log(forecastDate);
            head5.append(location, forecastDate, humidity, clouds, temp)

            var head5 = $(".card-body-5")
            var location = $("<h5>").text(resp1.city.name);

            var forecastDate = $("<h5>").text(resp1.list[36].dt_txt);
            var humidity = $("<h5>").text(resp1.list[36].main.humidity);
            var clouds = $("<h5>").text(resp1.list[36].weather[0].description);
            // temp conversion from K to F
            var tempCalcFore = ((resp1.list[0].main.temp) - 273) * 1.8 + 32;

            var temp = $("<h5>").text(parseInt(tempCalcFore));

            // console.log(forcastDate);
            head5.append(location, forecastDate, humidity, clouds, temp)

        });


        // for current weather temp wind humdity API call
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=79e878a8b6f5bfce841612e4037403ac"
        $.ajax({
            url: queryURL,
            method: "GET"

            // Performing GET requests
        }).then(function (resp) {
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

        clear();
        // console.log(citySearchText);
        var citySearchText = $(".city-search-text")
        // console.log(location);
        if (city !== '') {
            searchHistBtnRend(city);
        }
        // return location;
        setStorage();
    });

    function clear() {
        // $(".city-search-text").empty();
        $(".city-search-text").val('');
        $(".display-4").empty();
        $(".card-body-1").empty();
    }

    function searchHistBtnRend(city) {


        // grabbing button propigation location 
        var searchHistBtnLoc = $(".search-hist");
        // creating button element  
        var button = $("<button>");
        button.addClass("prevSerHistBtn");
        // creating text to be displayed on button 
        button.text(city);
        // appending button to div 
        searchHistBtnLoc.append(button);

    }

    // $(".prevSerHistBtn").on("click", function (event) {

    //     location = button.text(localStorage);

    // });

    function setStorage() {
        let locationStorage = JSON.parse(localStorage.getItem("location"));

        console.log(city);
        if (locationStorage == null) {
            let temp = [city];
            localStorage.setItem("location", temp)
        }
        else {
            locationStorage.push(city);
            localStorage.setItem("location", JSON.stringify(locationStorage))
        }

    }


    function getStorage() {

        let locationStorage = JSON.parse(localStorage.getItem("location"))
        $(locationStorage).each(function (idx, el) {

            searchHistBtnRend(locationStorage[idx]);

        })



    }

    getStorage();

    // console.log(searchHistBtnRend())

});

