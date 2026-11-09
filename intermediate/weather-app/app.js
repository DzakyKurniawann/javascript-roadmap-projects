// 1. APPLICATION MEMORY ENGINE (STATE LAYER)
const appState = {
  weatherData: null,
  activeTab: "past",
  activeCityName: "",
};

// 2. INDUSTRIAL WMO WEATHER CODES DICTIONARY MAP
const wmoDictionary = {
  0: { text: "Clear Sky", icon: "sun" },
  1: { text: "Mainly Clear", icon: "cloud-sun" },
  2: { text: "Partly Cloudy", icon: "cloud" },
  3: { text: "Overcast", icon: "cloud" },
  45: { text: "Foggy", icon: "haze" },
  48: { text: "Depositing Rime Fog", icon: "haze" },
  51: { text: "Light Drizzle", icon: "cloud-drizzle" },
  53: { text: "Moderate Drizzle", icon: "cloud-drizzle" },
  55: { text: "Dense Drizzle", icon: "cloud-drizzle" },
  61: { text: "Slight Rain", icon: "cloud-rain" },
  63: { text: "Moderate Rain", icon: "cloud-rain" },
  65: { text: "Heavy Rain", icon: "cloud-lightning" },
  80: { text: "Slight Rain Showers", icon: "cloud-rain" },
  81: { text: "Moderate Rain Showers", icon: "cloud-lightning" },
  95: { text: "Thunderstorm", icon: "cloud-lightning" },
  96: { text: "Thunderstorm Hail", icon: "cloud-hail" },
  99: { text: "Severe Thunderstorm", icon: "cloud-hail" },
};

function interpretWeatherCode(code) {
  return (
    wmoDictionary[code] || { text: "Unknown Conditions", icon: "help-circle" }
  );
}

function formatLocalDate(dateString) {
  const options = { weekday: "short", day: "numeric", month: "short" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// 3. COMPLETE JAVASCRIPT ELEMENT RUNTIME ENGINE (GENERATING HTML INTERFACES)
const root = document.getElementById("root");

// Phase 1 Component: Shell Construction
const searchCard = document.createElement("div");
searchCard.className = "glass-card";
searchCard.innerHTML = `
      <div class="search-wrapper">
        <div class="search-input-group">
          <i data-lucide="search"></i>
          <input type="text" id="cityInput" placeholder="Enter city or district name..." autocomplete="off">
        </div>
        <button class="btn btn-primary" id="searchBtn"><i data-lucide="search"></i> Search</button>
        <button class="btn btn-gps" id="gpsBtn" title="Use GPS Location"><i data-lucide="map-pin"></i> GPS</button>
        <div class="suggestions-box" id="suggestionsBox"></div>
      </div>
    `;
root.appendChild(searchCard);

// Phase 2 Components: Notification Panels
const loadingPanel = document.createElement("div");
loadingPanel.className = "status-panel status-loading";
loadingPanel.id = "loadingPanel";
loadingPanel.innerHTML = `<i data-lucide="loader-2" class="animate-spin"></i> Synchronization in progress, fetching satellite arrays...`;
root.appendChild(loadingPanel);

const errorPanel = document.createElement("div");
errorPanel.className = "status-panel status-error";
errorPanel.id = "errorPanel";
root.appendChild(errorPanel);

// Phase 3 Components: Dashboard Interface Setup
const dashboardSection = document.createElement("div");
dashboardSection.className = "dashboard-grid";
dashboardSection.innerHTML = `
      <div class="glass-card current-header-card">
        <h2 id="currentLocationName" style="font-size: 1.35rem;">Awaiting Query Selection</h2>
        <p id="currentDateText" style="font-size: 0.85rem; color: var(--text-muted);">---</p>
        <div id="currentWeatherIcon"><i data-lucide="cloud-sun" style="width: 64px; height: 64px; color: var(--primary);"></i></div>
        <div class="current-temp-big" id="currentTemp">--°</div>
        <span id="currentStatusText" style="font-weight: 600; background: #e0f2fe; padding: 0.25rem 1rem; border-radius: 20px; font-size: 0.9rem;">--</span>
      </div>
      <div class="glass-card">
        <h3 style="margin-bottom: 1rem; font-size: 1rem; color: var(--text-muted);">Real-time Weather Diagnostics</h3>
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="metric-icon-box"><i data-lucide="droplets"></i></div>
            <div class="metric-info"><p>Humidity</p><p id="metricHumidity">-- %</p></div>
          </div>
          <div class="metric-item">
            <div class="metric-icon-box"><i data-lucide="wind"></i></div>
            <div class="metric-info"><p>Max Wind Velocity</p><p id="metricWind">-- km/h</p></div>
          </div>
          <div class="metric-item">
            <div class="metric-icon-box"><i data-lucide="cloud-rain"></i></div>
            <div class="metric-info"><p>Precipitation Vol</p><p id="metricPrecip">-- mm</p></div>
          </div>
          <div class="metric-item">
            <div class="metric-icon-box"><i data-lucide="thermometer"></i></div>
            <div class="metric-info"><p>Apparent Feels</p><p id="metricApparent">-- °C</p></div>
          </div>
        </div>
      </div>
    `;
root.appendChild(dashboardSection);

// Phase 4 Components: Historic and Predictive Browsing Lists
const tabsContainer = document.createElement("div");
tabsContainer.className = "glass-card tabs-container";
tabsContainer.innerHTML = `
      <div class="tabs-header">
        <button class="tab-btn active" id="tabPastBtn">Historical Data (92 Days)</button>
        <button class="tab-btn" id="tabForecastBtn">Predictive Forecast (16 Days)</button>
      </div>
      <div class="cards-scroll-container" id="pastCardsContainer">
        <div style="padding: 2rem; color: var(--text-muted); text-align: center; width: 100%;">Initiate location retrieval processing matrices.</div>
      </div>
      <div class="cards-scroll-container hidden" id="forecastCardsContainer"></div>
    `;
root.appendChild(tabsContainer);

// 4. RETRIEVE POST-GENERATION CONTROL ELEMENTS FROM RUNTIME DOM
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const gpsBtn = document.getElementById("gpsBtn");
const suggestionsBox = document.getElementById("suggestionsBox");
const pastCardsContainer = document.getElementById("pastCardsContainer");
const forecastCardsContainer = document.getElementById(
  "forecastCardsContainer"
);
const tabPastBtn = document.getElementById("tabPastBtn");
const tabForecastBtn = document.getElementById("tabForecastBtn");

// 5. AUTOCOMPLETE ALGORITHM FUNCTIONALITY (Max 3 Suggestions)
cityInput.addEventListener("input", async () => {
  const query = cityInput.value.trim();
  if (query.length < 3) {
    suggestionsBox.style.display = "none";
    return;
  }

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=3&language=en&format=json`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      suggestionsBox.innerHTML = "";
      data.results.forEach((loc) => {
        const admin1 = loc.admin1 ? `, ${loc.admin1}` : "";
        const countryMarker = loc.country_code === "ID" ? "🇮🇩 " : "📍 ";

        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerHTML = `<i data-lucide="map-pin" style="width:16px;height:16px;"></i> <span>${countryMarker}<strong>${loc.name}</strong>${admin1}</span>`;

        div.addEventListener("click", () => {
          cityInput.value = loc.name;
          suggestionsBox.style.display = "none";
          appState.activeCityName = `${loc.name}${admin1}`;
          executeWeatherPipeline(loc.latitude, loc.longitude, loc.timezone);
        });
        suggestionsBox.appendChild(div);
      });
      lucide.createIcons();
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.style.display = "none";
    }
  } catch (err) {
    console.error("Autocomplete exception occurred: ", err);
  }
});

document.addEventListener("click", (e) => {
  if (!cityInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
    suggestionsBox.style.display = "none";
  }
});

// 6. GEO-POSITIONING AND NAVIGATION TRIGGER HANDLERS
searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    renderErrorDisplay(
      "Location query parameter text space cannot remain empty."
    );
    return;
  }
  resolveManualGeocoding(cityName);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

gpsBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    renderErrorDisplay(
      "Your browsing application platform denies access to high-accuracy GPS APIs."
    );
    return;
  }

  toggleLoadingState(true);
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      appState.activeCityName = `GPS Coordinate Lock Point (${lat.toFixed(
        2
      )}, ${lon.toFixed(2)})`;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        if (data && data.address) {
          const district =
            data.address.suburb ||
            data.address.village ||
            data.address.municipality ||
            "";
          const city = data.address.city || data.address.regency || "";
          appState.activeCityName = district ? `${district}, ${city}` : city;
        }
      } catch (e) {
        console.log(
          "Reverse-geocoding resolution failed. Defaulting to coordinate nomenclature fallback logic."
        );
      }

      executeWeatherPipeline(
        lat,
        lon,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    },
    (error) => {
      toggleLoadingState(false);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          renderErrorDisplay(
            "GPS location query access authorization denied by Client User Settings."
          );
          break;
        case error.POSITION_UNAVAILABLE:
          renderErrorDisplay(
            "Satellite telemetry position array structures currently unresolvable."
          );
          break;
        default:
          renderErrorDisplay(
            "An unknown hardware synchronization exception halted GPS tracking systems."
          );
      }
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
});

// 7. HISTORIC METEOROLOGICAL API CONNECTIONS
async function resolveManualGeocoding(cityName) {
  toggleLoadingState(true);
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=1&language=en&format=json`;
    const req = await fetch(url);
    const res = await req.json();

    if (!res.results || res.results.length === 0) {
      renderErrorDisplay(
        `Target location descriptor "${cityName}" cannot be cross-referenced across international registries.`
      );
      toggleLoadingState(false);
      return;
    }

    const loc = res.results[0];
    appState.activeCityName = `${loc.name}${
      loc.admin1 ? ", " + loc.admin1 : ""
    }`;
    executeWeatherPipeline(loc.latitude, loc.longitude, loc.timezone);
  } catch (err) {
    renderErrorDisplay(
      "Geocoding connection matrix failed. Network error exception thrown."
    );
    toggleLoadingState(false);
  }
}

async function executeWeatherPipeline(latitude, longitude, timezone) {
  toggleLoadingState(true);
  try {
    const tzSafe = encodeURIComponent(timezone);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&past_days=92&forecast_days=16&timezone=${tzSafe}`;

    const req = await fetch(url);
    appState.weatherData = await req.json();

    processAndRenderView();
  } catch (err) {
    renderErrorDisplay(
      "Meteorological API payload transfer failed. Station array offline."
    );
  } finally {
    toggleLoadingState(false);
  }
}

// 8. ROBUST PROCESSING ARRAY EXTRACTOR (SLICING & CLEAR DOM INJECTION)
function processAndRenderView() {
  const data = appState.weatherData;
  if (!data) return;

  // --- SECTION A: PERSISTENT HOISTED DASHBOARD DISPLAY ---
  document.getElementById("currentLocationName").textContent =
    appState.activeCityName;
  document.getElementById("currentDateText").textContent = formatLocalDate(
    data.current.time
  );
  document.getElementById("currentTemp").textContent = `${Math.round(
    data.current.temperature_2m
  )}°C`;

  const currentCondition = interpretWeatherCode(data.daily.weather_code[92]); // Index 92 indicates Current Real Day Location
  document.getElementById("currentStatusText").textContent =
    currentCondition.text;
  document.getElementById(
    "currentWeatherIcon"
  ).innerHTML = `<i data-lucide="${currentCondition.icon}" style="width: 64px; height: 64px; color: var(--primary);"></i>`;

  document.getElementById(
    "metricHumidity"
  ).textContent = `${data.current.relative_humidity_2m} %`;
  document.getElementById(
    "metricWind"
  ).textContent = `${data.daily.wind_speed_10m_max[92]} km/h`;
  document.getElementById(
    "metricPrecip"
  ).textContent = `${data.daily.precipitation_sum[92]} mm`;
  document.getElementById("metricApparent").textContent = `${Math.round(
    data.daily.apparent_temperature_max[92]
  )} °C`;

  // --- SECTION B: ISOLATING IMMUTABLE ARRAYS VIA SYSTEMATIZED INDICES SLICING ---
  const timeLineArray = data.daily.time;

  const historicalMetrics = {
    date: timeLineArray.slice(0, 92),
    wmo: data.daily.weather_code.slice(0, 92),
    maxT: data.daily.temperature_2m_max.slice(0, 92),
    minT: data.daily.temperature_2m_min.slice(0, 92),
  };

  const forecastMetrics = {
    date: timeLineArray.slice(93),
    wmo: data.daily.weather_code.slice(93),
    maxT: data.daily.temperature_2m_max.slice(93),
    minT: data.daily.temperature_2m_min.slice(93),
  };

  // --- SECTION C: CARD RENDER MATRIX PROCESSING (ZERO RE-DUPLICATION ELEMENT METHOD) ---
  pastCardsContainer.innerHTML = "";
  forecastCardsContainer.innerHTML = "";

  // Constructing Historical Row Nodes
  for (let i = 0; i < historicalMetrics.date.length; i++) {
    const condition = interpretWeatherCode(historicalMetrics.wmo[i]);
    const subCard = generateMiniatureCardWidget(
      formatLocalDate(historicalMetrics.date[i]),
      condition.icon,
      condition.text,
      Math.round(historicalMetrics.minT[i]),
      Math.round(historicalMetrics.maxT[i])
    );
    pastCardsContainer.appendChild(subCard);
  }

  // Constructing Forecast Row Nodes
  for (let i = 0; i < forecastMetrics.date.length; i++) {
    const condition = interpretWeatherCode(forecastMetrics.wmo[i]);
    const subCard = generateMiniatureCardWidget(
      formatLocalDate(forecastMetrics.date[i]),
      condition.icon,
      condition.text,
      Math.round(forecastMetrics.minT[i]),
      Math.round(forecastMetrics.maxT[i])
    );
    forecastCardsContainer.appendChild(subCard);
  }

  lucide.createIcons();
}

// Factory Module producing mini weather objects
function generateMiniatureCardWidget(
  dateString,
  iconName,
  statusText,
  minTemperature,
  maxTemperature
) {
  const card = document.createElement("div");
  card.className = "weather-data-card";
  card.innerHTML = `
        <span class="card-date">${dateString.split(",")[0]}</span>
        <span style="font-size:0.75rem; color:var(--text-muted);">${
          dateString.split(",")[1] || ""
        }</span>
        <i data-lucide="${iconName}" style="color:var(--primary); margin: 0.25rem 0;"></i>
        <span style="font-size:0.8rem; font-weight:600; min-height:32px; display:flex; align-items:center; justify-content:center;">${statusText}</span>
        <div class="card-temp-range">
          <span style="color:var(--text-muted); font-weight:400;">${minTemperature}°</span> / <strong>${maxTemperature}°</strong>
        </div>
      `;
  return card;
}

// 9. HIGH PERFORMANCE CSS-DRIVEN TAB SWITCH SYSTEM
tabPastBtn.addEventListener("click", () => {
  tabPastBtn.classList.add("active");
  tabForecastBtn.classList.remove("active");
  pastCardsContainer.classList.remove("hidden");
  forecastCardsContainer.classList.add("hidden");
  appState.activeTab = "past";
});

tabForecastBtn.addEventListener("click", () => {
  tabForecastBtn.classList.add("active");
  tabPastBtn.classList.remove("active");
  forecastCardsContainer.classList.remove("hidden");
  pastCardsContainer.classList.add("hidden");
  appState.activeTab = "forecast";
});

// 10. SYSTEM TELEMETRY CONTROL INTERFACES
function toggleLoadingState(show) {
  loadingPanel.style.display = show ? "flex" : "none";
  if (show) errorPanel.style.display = "none";
}

function renderErrorDisplay(errorMessageString) {
  errorPanel.textContent = errorMessageString;
  errorPanel.style.display = "flex";
  setTimeout(() => {
    errorPanel.style.display = "none";
  }, 5000);
}

// Initial load asset render execution
lucide.createIcons();
