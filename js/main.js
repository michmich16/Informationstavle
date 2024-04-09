const urls = {
    news: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23",
    busTimes:
        "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1",
    weather:
        "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric",
    kantine:
        "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json",
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
])
    .then(([news, busTimes, weather, kantine, aktivitets]) => {
        console.log(busTimes);
        console.log(aktivitets);
        displayData(news.items.map((val) => val.title).join(" "), "news-data");

        // Funktion der siger hvor mange minutter der er til næste bus: tid er i formatet "11:33" osv
        const minutterTilNæsteBus = (time) => {
            const now = new Date();
            const busTime = new Date();
            const [hours, minutes] = time.split(":");
            busTime.setHours(hours);
            busTime.setMinutes(minutes);
            const diff = busTime - now;
            const total = Math.floor(diff / 60000);

            if (total < 0) {
                return "Bussen er kørt";
            } else if (total < 60) {
                return `${total} minutter`;
            } else if (total === 60) {
                return "1 time";
            } else {
                return `${Math.floor(total / 60)} timer og ${total % 60} minutter`;
            }
        };

        console.log(busTimes);

        // Display only the first 5 items from the Departure array
        displayData(
            busTimes.MultiDepartureBoard.Departure.slice(0, 5).map(
                (val) => `${val.line} ${val.stop} ${minutterTilNæsteBus(val.time)}`
            ).join("<hr class='bus-divider'>"),
            "bus-data",
            "bus-time"
        );

        displayData(
            `${weather.name} ${weather.main.temp}°C`,
            "weather-data",
            "weather"
        );

        const currentWeekDay = new Date().toLocaleDateString("da-DK", {
            weekday: "long",
        });
        const currentDate = new Date().toLocaleDateString("da-DK", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        kantine.Days.forEach((day) => {
            const dayName = day.DayName.toLowerCase();
            const dish = day.Dish;

            let displayText = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)
                } - ${dish}`;
            if (dayName === currentWeekDay.toLowerCase()) {
                displayText += " (Idag)";
            }

            displayData(displayText, "kantine-data", "kantine");
            // Add a divider after each day
            displayData('<hr class="kantine-divider">', "kantine-data");
        });

        const formatTime = (date) => {
            return new Date(date).toLocaleTimeString("da-DK", {
                hour: "2-digit",
                minute: "2-digit",
            });
        };
        // Filter aktivitets based on current date and education
        const currentDateFormatted = new Date().toISOString().split("T")[0];
        const filteredAktivitets = aktivitets.value.filter((val) => {
            return val.StartDate.split("T")[0] === currentDateFormatted && (val.Education === "Webudvikler" || val.Education === "Grafisk Teknik");
        });

        // Sort aktivitets data based on time
        filteredAktivitets.sort((a, b) => {
            const timeA = new Date(a.StartDate).getTime();
            const timeB = new Date(b.StartDate).getTime();
            return timeA - timeB;
        });

        displayData(
            filteredAktivitets.map(
                (val) =>
                    `${val.Room} - ${val.Education} - ${formatTime(val.StartDate)} - ${val.Subject}`
            ),
            "aktivitets-data",
            "aktivitets"
        );
    })
    .catch((error) => console.error("Error fetching data:", error));

function displayData(data, elementId, className = "") {
    const element = document.getElementById(elementId);

    if (data) {
        const dataArray = Array.isArray(data) ? data : [data]; // Ensure data is an array
        dataArray.forEach((item, index) => {
            const p = document.createElement("p");
            p.innerHTML = item;
            if (className !== "") {
                p.classList.add(className);
            }
            element.appendChild(p);
            // Add underline after each p element
            if (className === "aktivitets" && index < dataArray.length - 1) {
                const hr = document.createElement("hr");
                hr.classList.add("aktivitets-divider"); // Add a specific class to the hr element
                element.appendChild(hr);
            }
        });
    }
}
// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Function to update the date
function updateDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateString = `${day}-${month}-${year}`;
    document.getElementById('date').textContent = dateString;
}

// Update the date every second
setInterval(updateDate, 1000);