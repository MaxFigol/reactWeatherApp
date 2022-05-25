
import Spinner from '../spinner/Spinner'
import WeatherService from '../../service/WeatherService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudBolt, faSun, faCloud, faCloudSun} from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState} from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const {getWeatherCity} = WeatherService();
    const [weathers, setWeather] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchCity, setSearchCity] = useState('')
    
    useEffect (() => {
        updateWeather();
    },[])

    const transformWeater = (res) =>{
        const trans = {
            name: res.name,
            description: res.weather[0].description,
            temp: Math.round(res.main.temp),
            wind: res.wind.speed,
            humidity: res.main.humidity
        }
        return trans;
    }

    const setLoad = () => {
        setLoading(false);
    }

    const setTrue = () => {
        setLoading(true)
    } 

    const updateWeather = (newCity) => {
        setTrue()
        getWeatherCity(newCity).then(res => transformWeater(res)).then(res => setWeather(res));
        setTimeout(setLoad, 1000)
    }

    const onChangeValue = (e) => {
        setSearchCity(e.target.value);
    } 

    const searchNewCity = (e) => {
        e.preventDefault()
        updateWeather(searchCity)
        setSearchCity('')
    }

    
    const load = loading ? <Spinner/> : null;
    const content = !loading ? <View weather={weathers}/> : null;
    return(
        <>
            <div className='weatherbody'>
                {load}
                {content}
            </div>
            <div className='button'>
                <button className='btn london' onClick={() => updateWeather('london')}>Лондон</button>
                <button className='btn zp' onClick={() => updateWeather('zaporizhia')}>Запорожье</button>
                <button className='btn berlin' onClick={() => updateWeather('berlin')}>Берлин</button>
            </div>
            <form onSubmit={searchNewCity}>
                <input placeholder='Одесса' value={searchCity} className='input' type="text" onChange={onChangeValue}/>
                <button className='search-button'>Найти город</button>
            </form>
        </>
        
    )
}

const View = ({weather}) => {
    const {name, description, temp, wind, humidity} = weather;
    let img = faCloudBolt;
    
    switch(description){
        case 'пасмурно': img = faCloud;
        break;
        case 'ясно': img = faSun;
        break;
        case 'небольшая облачность' : img = faCloudSun;
        break;
        case 'облачно с прояснениями' : img = faCloudSun;
        break;
    }
    return(
        <>
             <div className='weatherinfo'>
                <FontAwesomeIcon icon={img}/>
                <span className='weather'>{description}</span>
                <p className='humidity'>Влажность {humidity}%</p>
                </div>
            <div className='info'>
                <p className='city'>{name}</p>
                <p className='temp'>{temp}C</p>
                <p className='wind'>Ветер {wind} м/с</p>
            </div>
        </>
    )
}





export default WeatherApp;