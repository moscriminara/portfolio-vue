const WeatherPage = {
    template: `
        <div id="weather" class="page">
            <div class="box">
                <input type="text" v-model="location" placeholder="Enter a location" @keyup.enter="goWeather">
                <button @click="goWeather">o.k.</button>
            </div>

            <transition name="fade" mode="out-in">
                <div v-if="weather" class="weatherBox">
                    <h1>{{ weather.name }} <span>in</span> {{ weather.country }}</h1>
                    <h2 class="content">Temperature: <span>{{ weather.temperature }} °C</span></h2>
                    <h2 class="content">Wind Speed: <span>{{ weather.windspeed }} km/h</span></h2>
                    <br>
                    <h2 class="content">Latitude: {{ weather.latitude }}</h2>
                    <h2 class="content">Longitude: {{ weather.longitude }}</h2>
                </div>
                <h1 v-else-if="result">{{ result }}</h1>
            </transition>

            <div v-if="tips">
                <a class="content" style="margin-top:5%;">This is a weather page.</a>
                <a class="content" style="margin:3% auto 10% auto;">You can actually search the weather.</a>
            </div>
        </div>
    `,
    data() {
        return {
            location: '',
            weather: null,
            result: null,
            tips: true
        }
    },
    methods: {
        async goWeather() {
            try {
                if (!this.location.trim()) {
                    this.result = "Enter something bro.";
                    return;
                }
                
                this.result = "Searching...";
                this.tips = '';
                this.weather = null;

                const locUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${this.location.trim()}&count=10&language=en&format=json`;
                const locRes = await fetch(locUrl);
                const locData = await locRes.json();

                if (!locData.results) {
                    this.result = `I can't help you bro.`;
                    return;
                }

                const { latitude, longitude, name, admin1, country } = locData.results[0];

                const wthUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
                const wthRes = await fetch(wthUrl);
                const wthData = await wthRes.json();

                const wth = wthData.current_weather;

                this.result = '';

                this.weather = {
                    name, admin1, country,
                    temperature: wth.temperature,
                    windspeed: wth.windspeed,
                    latitude,
                    longitude
                };

            } catch (err) {
                this.error = "I think it's the network issue.";
            } finally {
                this.tips = null
            }
        }
    }
    
}