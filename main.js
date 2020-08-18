
$(document).ready(function () {


    $(".searchBtn").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();

        function clear() {
            $(".city-search-text").empty();
        }

        clear();

        // This line grabs the input from the textbox
        var city = $(".city-search-text").val().trim();

        var location = city;

        location = city;

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=79e878a8b6f5bfce841612e4037403ac"


        $.ajax({
            url: queryURL,
            method: "GET"

            // Performing GET requests
        }).then(function (resp) {
            // console.log(resp);
            // Create a new table row element
            var tRow = $("<tr>");
            // This is why we can create and save a reference to a td in the same statement we update its text
            // temp conversion from K to F
            var tempCalc = ((resp.main.temp) - 273) * 1.8 + 32;

            var fTemp = $("<td>").text(parseInt(tempCalc))

            // console.log(fTemp)
            var humidityTd = $("<td>").text(resp.main.humidity);
            var windSpeedTd = $("<td>").text(resp.wind.speed);
            var windDegTd = $("<td>").text(resp.wind.deg);
            // var uVIndevTd = $("<td>").text(resp.UV);
            // Append the newly created table data to the table row
            tRow.append(fTemp, humidityTd, windSpeedTd, windDegTd);
            // Append the table row to the table body
            $("tbody").append(tRow);
            $(".display-4").append(resp.name)

        });

        function searchHistBtnRend() {

            var searchHistBtnLoc = $("search-hist");

            // creating button element  
            var button = $("<button>");

            // creating text to be 
            //displayed on button 
            var text = $("buttons").append(city);

            // appending text to button 
            $("button").append(text);

            // appending button to div 
            $("searchHistBtnLoc").append(button);
        }
        searchHistBtnRend();

        console.log(location);
        return location;


    });


    // console.log(location)
});

