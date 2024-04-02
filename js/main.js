const urls = {
  news: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23",
  busTimes:
    "https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1",
  wheather:
    "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric",
  kantine:
    "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json",
  aktivitets: "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed",
};

/**
 * Fetch data from an API
 * @param {string} url  - The URL to fetch data from (required)
 * @param {boolean} json - If the response is JSON or not (optional, default is true)
 * @returns {Promise} - The data from the API
 */
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

async function main() {
  const news = await FetchAPI(urls.kantine);

  console.log(news);
}

main();
