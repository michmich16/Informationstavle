const urls = {
    news: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23",
    busTimes: "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1",
    weather: "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric",
    kantine: "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json",
    aktivitets: "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed",
};

async function FetchAPI(url, json = true) {
    const response = await fetch(url);

    // If the response is not ok, throw an error
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
    displayData(news, 'news-data');
    displayData(busTimes, 'bus-data');
    displayData(weather, 'weather-data');
    displayData(kantine, 'kantine-data');
    displayData(aktivitets, 'aktivitets-data');
}).catch(error => console.error('Error fetching data:', error));

function displayData(data, elementId) {
    const element = document.getElementById(elementId);
    if (data) {
        if (typeof data === 'string') {
            element.innerText = data;
        } else {
            element.innerText = JSON.stringify(data, null, 2);
        }
    } else {
        element.innerText = 'Data not available';
    }
}