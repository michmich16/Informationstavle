// new code________________________


const madApiUrl = 'https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json';
const busApiUrl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1';
const aktivitetApiUrl = 'https://iws.itcn.dk/techcollege/schedules?departmentcode=smed';
const vejrApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric';
const nyhederApiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23';



// Fetch data from the food plan API
const fetchMadApiUrl = fetch(madApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching data from API 1:', error);
    });

// Fetch data from the bus route API
const fetchBusApiUrl = fetch(busApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching data from API 2:', error);
    });

// Fetch data from the activities API
const fetchAktivitetApiUrl = fetch(aktivitetApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching data from API 2:', error);
    });

// Fetch data from the weather API
const fetchVejrApiUrl = fetch(vejrApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching data from API 2:', error);
    });

// Fetch data from the news API
const fetchNyhederApiUrl = fetch(nyhederApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching data from API 2:', error);
    });


// Handle both promises using Promise.all()
Promise.all([fetchBusApiUrl, fetchBusApiUrl, fetchAktivitetApiUrl, fetchVejrApiUrl, fetchNyhederApiUrl])
    .then(data => {
        // Data from API 1
        console.log('Data from Mad-Planner:', data[0]);

        // Data from API 2
        console.log('Data from Bus-Planner:', data[1]);

        // Data from API 3
        console.log('Data from Aktivitet:', data[2]);

        // Data from API 4
        console.log('Data from Vejr:', data[3]);

        // Data from API 5
        console.log('Data from Nyheder:', data[4]);

        // Here you can do something with both sets of data
    })
    .catch(error => {
        console.error('Error handling multiple fetch requests:', error);
    });
