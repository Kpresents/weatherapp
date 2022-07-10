var appKey = "b83b9d1920135c00a4a1c045e63034d8";
var submitBtn = document.querySelector("#search");
var inputEl = document.querySelector(".user-input");
var yourcityEl = document.querySelector("#your-city");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");

var searchHistory = [];
var searchHistoryEl = document.querySelector('#search-history');

var day1El = document.querySelector("#day1");
var picture1El = document.querySelector("#picture1");
var temp1El = document.querySelector("#temp1");
var wind1El = document.querySelector("#wind1");
var hum1El = document.querySelector("#hum1");

var day2El = document.querySelector("#day2");
var picture2El = document.querySelector("#picture2");
var temp2El = document.querySelector("#temp2");
var wind2El = document.querySelector("#wind2");
var hum2El = document.querySelector("#hum2");

var day3El = document.querySelector("#day3");
var picture3El = document.querySelector("#picture3");
var temp3El = document.querySelector("#temp3");
var wind3El = document.querySelector("#wind3");
var hum3El = document.querySelector("#hum3");

var day4El = document.querySelector("#day4");
var picture4El = document.querySelector("#picture4");
var temp4El = document.querySelector("#temp4");
var wind4El = document.querySelector("#wind4");
var hum4El = document.querySelector("#hum4");

var day5El = document.querySelector("#day5");
var picture5El = document.querySelector("#picture5");
var temp5El = document.querySelector("#temp5");
var wind5El = document.querySelector("#wind5");
var hum5El = document.querySelector("#hum5");
var cityResultsEl = document.querySelector(".city-results")


function displayWeather(event) {
    event.preventDefault()
    populateWeather(inputEl.value)

}
//Searching City and its corresponding 5 day forecast 
//Add API and specify parameters. 
function populateWeather(city) {
    console.log(city)
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=imperial`;
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var date = moment(data.dt, "X").format(" (MM/DD/YYYY) ")
            var img = document.createElement("img")
            img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            yourcityEl.textContent = data.name + date
            yourcityEl.appendChild(img)
            tempEl.textContent = data.main.temp
            windEl.textContent = data.wind.speed
            humidityEl.textContent = data.main.humidity

// Five day forecast

            var onecallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=${appKey}&units=imperial`;
            fetch(onecallurl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (fivedayData) {
                    console.log(fivedayData);
                    uvEl.textContent = fivedayData.current.uvi
                    var date1 = moment(fivedayData.daily[1].dt, "X").format(" (MM/DD/YYYY) ")
                    day1El.textContent = date1
                    picture1El.src = `http://openweathermap.org/img/wn/${fivedayData.daily[1].weather[0].icon}@2x.png`
                    temp1El.textContent = fivedayData.daily[1].temp.day
                    wind1El.textContent = fivedayData.daily[1].wind_speed
                    hum1El.textContent = fivedayData.daily[1].humidity

                    var date2 = moment(fivedayData.daily[2].dt, "X").format(" (MM/DD/YYYY) ")
                    day2El.textContent = date2
                    picture2El.scr = `http://openweathermap.org/img/wn/${fivedayData.daily[2].weather[0].icon}@2x.png`
                    temp2El.textContent = fivedayData.daily[2].temp.day
                    wind2El.textContent = fivedayData.daily[2].wind_speed
                    hum2El.textContent = fivedayData.daily[2].humidity

                    var date3 = moment(fivedayData.daily[3].dt, "X").format(" (MM/DD/YYYY) ")
                    day3El.textContent = date3
                    picture3El.scr = `http://openweathermap.org/img/wn/${fivedayData.daily[3].weather[0].icon}@2x.png`
                    temp3El.textContent = fivedayData.daily[3].temp.day
                    wind3El.textContent = fivedayData.daily[3].wind_speed
                    hum3El.textContent = fivedayData.daily[3].humidity

                    var date4 = moment(fivedayData.daily[4].dt, "X").format(" (MM/DD/YYYY) ")
                    day4El.textContent = date4
                    picture4El.scr = `http://openweathermap.org/img/wn/${fivedayData.daily[4].weather[0].icon}@2x.png`
                    temp4El.textContent = fivedayData.daily[4].temp.day
                    wind4El.textContent = fivedayData.daily[4].wind_speed
                    hum4El.textContent = fivedayData.daily[4].humidity

                    var date5 = moment(fivedayData.daily[5].dt, "X").format(" (MM/DD/YYYY) ")
                    day5El.textContent = date5
                    picture5El.scr = `http://openweathermap.org/img/wn/${fivedayData.daily[5].weather[0].icon}@2x.png`
                    temp5El.textContent = fivedayData.daily[5].temp.day
                    wind5El.textContent = fivedayData.daily[5].wind_speed
                    hum5El.textContent = fivedayData.daily[5].humidity
// Local storage, only stores new searches 

                    if (searchHistory.includes(data.name) === false) {


                        searchHistory.push(data.name)
                        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                        displayCity()

                    }


                })
        })
}
function displayCity() {
    var data = localStorage.getItem('searchHistory')
    if (data) {
        searchHistory = JSON.parse(data)
        populateWeather(searchHistory[searchHistory.length -1])
        // search history to display dynamic insert
        searchHistoryEl.textContent = ""
        for (var i = 0; i < searchHistory.length; i++) {
            var li = document.createElement('li')
            li.classList.add('list-group-item')
            var btn = document.createElement('button')
            btn.classList = 'w-100 btn-secondary btn-outline-secondary text-black btn-search'
            btn.textContent = searchHistory[i]
            li.appendChild(btn)
            searchHistoryEl.appendChild(li)



        }
        var btnSearch = document.querySelectorAll('.btn-search')
        for (var i = 0; i < btnSearch.length; i++) {
            btnSearch[i].addEventListener('click', function (event) {
                var city = this.textContent
                console.log(city)
                populateWeather(city)
            })
        }

    }
}
//display last city searched
displayCity()



submitBtn.addEventListener("submit", displayWeather)




