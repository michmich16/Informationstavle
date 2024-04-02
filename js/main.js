// MAD PLAN API--------------------------------------------------

// Define the URL for the API endpoint
const madApiUrl = 'https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json';

// Select the container where the menu will be displayed
const menuContainer = document.getElementById('mad-html');

// Make a GET request to the API endpoint using Fetch API
fetch(madApiUrl)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Display the menu data in HTML
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation with madApiUrl:', error);
    });

// BUS ROUTE API--------------------------------------------------

const busApiUrl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1'

fetch(busApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Display the menu data in HTML
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation with busApiUrl:', error);
    });

// Aktivitets API--------------------------------------------------


const aktivitetApiUr = 'https://iws.itcn.dk/techcollege/schedules?departmentcode=smed'

fetch(aktivitetApiUr)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Display the menu data in HTML
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation with aktivitetApiUrl:', error);
    });


// Weather API--------------------------------------------------


const vejrApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric'

fetch(vejrApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Display the menu data in HTML
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation with vejrApiUrl:', error);
    });



    const nyhederApiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23'

fetch(nyhederApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Display the menu data in HTML
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation with nyhederApiUrl:', error);
    });


    