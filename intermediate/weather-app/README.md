# Weather App

A weather app built with HTML, CSS, and plain JavaScript. The user searches for a location, or uses GPS, and sees the current weather together with the past and upcoming days. The data comes from free public APIs that do not need an API key.

## Learning Goals

- Fetch data from public APIs with `fetch` and `async/await`
- Chain requests: find a location first, then load its weather
- Handle loading and error states with `try/catch/finally`
- Build the interface with `createElement` and template literals
- Use the browser Geolocation API and handle its error cases
- Turn weather codes into readable text and icons with a lookup object
- Separate past and future data by slicing arrays
- Show live search suggestions while the user types

## Features

- Search by city or district name with a Search button or the Enter key
- Autocomplete: after three characters, up to three location suggestions appear, and Indonesian locations are marked with a flag
- GPS button that uses the current position and shows the place name through reverse geocoding, with a fallback to coordinates
- Current weather card with the location, date, temperature, condition text, and icon
- Four metrics: humidity, maximum wind speed, precipitation volume, and apparent temperature
- Two tabs: **Historical Data** with the previous 92 days, and **Predictive Forecast** with the days after today
- Each day is a small scrollable card with the date, icon, condition, and minimum and maximum temperature
- Loading indicator while data is being fetched
- Error messages that disappear automatically after five seconds
- Soft blue glass-style theme that adapts to small screens

## Project Structure

```
weather-app/
├── index.html    # Empty root, Google Font, and the Lucide icon script
├── style.css     # Glass cards, dashboard grid, tabs, and card styles
└── app.js        # State, API calls, rendering, GPS, and tab logic
```

## Run Locally

No installation or API key is needed. Open `index.html` in a browser, or use the **Live Server** extension in VS Code. An internet connection is required because the app loads weather data, the font, and the icons from the internet.

The GPS button works best on `localhost` (such as Live Server) or on an HTTPS page, because browsers restrict location access on insecure pages.

## What I Learned

- **One request often depends on another.** The weather API needs coordinates, so the app first asks the geocoding API for the latitude and longitude of the place name, then passes them to the forecast request. Splitting these into separate functions keeps each step clear.
- **Loading and errors are part of the interface.** A `try/catch/finally` block shows an error message when a request fails and always hides the loading panel afterward, so the screen never stays stuck on "loading".
- **User input must be encoded in URLs.** `encodeURIComponent` makes sure that spaces and special characters in a place name do not break the request.
- **A lookup object replaces a long `if/else`.** The `wmoDictionary` maps each weather code to a text and an icon name, and a fallback value handles unknown codes, so adding a new code is a one-line change.
- **API data can arrive as parallel arrays.** The daily data has separate arrays for dates, codes, and temperatures, where the same index belongs to the same day. Reading all of them with one index builds each card.
- **Slicing separates past from future.** The request asks for 92 past days, so index 92 is today, the items before it are history, and the items after it are the forecast. This index is tied to the `past_days` value, so changing one means changing the other.
- **Autocomplete needs limits.** Waiting for at least three characters and asking for only three results avoids unnecessary requests and keeps the suggestion list short.
- **The Geolocation API works with callbacks.** `getCurrentPosition` takes a success and an error function, and the error code tells whether permission was denied, the position was unavailable, or something else went wrong, so each case can show a useful message.
- **Icons must be created after the HTML exists.** The Lucide icons are placeholders until `lucide.createIcons()` runs, so it is called again after every render that adds new elements.
- **APIs without keys are safe to publish.** Open-Meteo does not need a key, so there is no secret to hide before pushing the project to GitHub.

## Source

Project specification from [roadmap.sh: Weather App](https://roadmap.sh/projects/weather-app), built with the free [Open-Meteo](https://open-meteo.com/) API instead of Visual Crossing. Reverse geocoding uses [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/), and icons come from [Lucide](https://lucide.dev/).