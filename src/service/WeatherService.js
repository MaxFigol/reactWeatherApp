
const WeatherService = () => {
    const city = 'kyiv';
    const getWeather = async (url) => {
        const response = await fetch(url, {method: 'GET'});
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    const getWeatherCity = (newCity = city) => {
        return getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=59c4e120ccc4fbdee41d2da8eba22e37&lang=ru&units=metric`);
    }

    

    return {getWeatherCity};
    
}

export default WeatherService;