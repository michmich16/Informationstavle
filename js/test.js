const urls = {
    news: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23",
    busTimes: "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1",
    weather: "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric",
    kantine: "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json",
    aktivitets: "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed",
};

async function FetchAPI(url, json = true) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `There was an error: ${response.status} - ${response.statusText}`
        );
    }

    let data;

    if (json) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    return data;
}

Promise.all([
    FetchAPI(urls.news),
    FetchAPI(urls.busTimes),
    FetchAPI(urls.weather),
    FetchAPI(urls.kantine),
    FetchAPI(urls.aktivitets),
]).then(([news, busTimes, weather, kantine, aktivitets]) => {
    console.log(busTimes);
    displayData(news.items.map(val => val.title).join(" "), 'news-data');
    displayData(busTimes.MultiDepartureBoard.Departure.map(val => `${val.line} ${val.stop} ${val.time}`).join("<hr class='bus-divider'>"), 'bus-data', 'bus-time');
    displayData(`${weather.name} ${weather.main.temp}°C`, 'weather-data', 'weather');

    const currentWeekDay = new Date().toLocaleDateString('da-DK', { weekday: 'long' });
    const currentDate = new Date().toLocaleDateString('da-DK', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });

    kantine.Days.forEach(day => {
        const dayName = day.DayName.toLowerCase();
        const dish = day.Dish;

        let displayText = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} - ${dish}`;
        if (dayName === currentWeekDay.toLowerCase()) {
            displayText += " (Today)";
        }

        displayData(displayText, 'kantine-data', 'kantine');
        // Add a divider after each day
        displayData('<hr class="kantine-divider">', 'kantine-data');
    });

    const formatDateToDaninsh = (date) => {
        return new Date(date).toLocaleDateString('da-DK', { weekday: 'long' });
    }

    // Filter aktivitets based on current date
    const currentDateFormatted = new Date().toISOString().split('T')[0];
    const filteredAktivitets = aktivitets.value.filter(val => val.StartDate.split('T')[0] === currentDateFormatted);
    displayData(filteredAktivitets.map(val => ` ${val.Room} - ${val.Education} -${formatDateToDaninsh(val.StartDate)} - ${val.Subject}`).join("<span>"), 'aktivitets-data', 'aktivitets');

}).catch(error => console.error('Error fetching data:', error));

function displayData(data, elementId, className = "") {
    const element = document.getElementById(elementId);

    if (data) {
        const p = document.createElement('p');
        p.innerHTML = data;
        if (className !== "") {
            p.classList.add(className);
        }
        element.appendChild(p);
    }
}