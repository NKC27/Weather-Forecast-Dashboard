
    var API_KEY = '5a38587bb876207d38825820b4844cd0';
     // Target Elements of Page
    var cityInput = $('#city');
    var buttonSearch = $('#citySearch');
    var cardTime = $('#dateDays');
    //card id's
    var iconW = $('#icon');
    var temp = $('#temperature');
    var hum = $('#humidity');
    var UVindex = $('#UVIndex');
    // seacrh history id
    var prevCity = $('#prevCity');

    buttonSearch.on('click', function() {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.val() + 
        "&appid=5a38587bb876207d38825820b4844cd0&units=metric")
    .then(function (res) {
        return res.json();
    })
    .then(function (data)  {
        console.log(data);
    });
    })

    

//     var weatherFormEl = document.getElementById("weatherForm");

//     weatherFormEl.addEventListner("submit", function (event) {
//     event.preventDefault();

//     var weatherLocationCity = document.getElementById("weatherLocationCity").value.trim();

//     fetch(
//         "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherLocationCity + 
//         "&appid=5a38587bb876207d38825820b4844cd0&units=metric"
//         )
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function (data) {
//         var forecastDays = [];



//         for(var i = 0; i < data.list.length; i++) {
//             var weatherInfo = data.list[i];

//             var date = weatherInfo.dt_txt.split(" ")[0];


//         }
//     });
// });