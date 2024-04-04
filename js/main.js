// Call the renderData function to display data
renderData();

fetchAllData();

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function fetchAllData() {
    const madApiUrl = 'https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json';
    const busApiUrl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1';
    const aktivitetApiUrl = 'https://iws.itcn.dk/techcollege/schedules?departmentcode=smed';
    const vejrApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric';
    const nyhederApiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23';

    try {
        const madData = await fetchData(madApiUrl);
        console.log('Data from Mad-Planner:', madData);

        const busData = await fetchData(busApiUrl);
        console.log('Data from Bus-Planner:', busData);

        const aktivitetData = await fetchData(aktivitetApiUrl);
        console.log('Data from Aktivitet:', aktivitetData);

        const vejrData = await fetchData(vejrApiUrl);
        console.log('Data from Vejr:', vejrData);

        const nyhederData = await fetchData(nyhederApiUrl);
        console.log('Data from Nyheder:', nyhederData);

        // Here you can do something with all the data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// Function to render data in cards
async function renderData() {
    const container = document.querySelector('.container');
    const data = await fetchData();

    if (!data) {
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const body = document.createElement('p');
        body.textContent = item.body;

        card.appendChild(title);
        card.appendChild(body);
        container.appendChild(card);
    });
}


