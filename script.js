async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const resultDiv = document.getElementById("result");

    if (location === "") {
        resultDiv.innerHTML = "⚠️ Please enter a location.";
        return;
    }

    const apiKey = "d52a352d1d024e69887174709252110";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `❌ ${data.error.message}`;
        } else {
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;

            resultDiv.innerHTML = `
                🌍 Location: <b>${data.location.name}, ${data.location.country}</b><br>
                🌡️ Temperature: <b>${temp}°C</b><br>
                ☁️ Condition: <b>${condition}</b><br>
                <img src="https:${icon}" alt="${condition}" />
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = "❌ Error fetching weather data.";
        console.error(error);
    }
}
