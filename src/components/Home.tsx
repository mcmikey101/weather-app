import '../styles/home.css'
import { useState, useEffect } from 'react'

interface Day {
    date: string,
    temperature: number,
    weather: string
}

export default function Home(props: any) {

    const [city, setCity] = useState('')
    const [system, setSystem] = useState(props.system)
    const [speedmeasure, setSpeedmeasure] = useState('m/s')
    const [tempmeasure, setTempmeasure] = useState('C')
    const [imgsrc, setImgsrc] = useState('')
    const [temp, setTemp] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [weather, setWeather] = useState('')
    const [lon, setLon] = useState(0)
    const [lat, setLat] = useState(0)
    const [forecast, setForecast] = useState({
        day1: {
            date: '',
            temperature: 0,
            weather: ''
        },
        day2: {
            date: '',
            temperature: 0,
            weather: ''
        },
        day3: {
            date: '',
            temperature: 0,
            weather: ''
        },
        day4: {
            date: '',
            temperature: 0,
            weather: ''
        },
        day5: {
            date: '',
            temperature: 0,
            weather: ''
        },
    })
    async function getForecast() {
        const request = await fetch(`https://ru.api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${system}&appid=0807c0448d35beb3996c63b486bea581`)
        const data = await request.json()
        let day1: Day = {date: data.list[7].dt_txt, temperature: data.list[7].main.temp, weather: data.list[7].weather[0].description}
        let day2: Day = {date: data.list[15].dt_txt, temperature: data.list[15].main.temp, weather: data.list[15].weather[0].description}
        let day3: Day = {date: data.list[23].dt_txt, temperature: data.list[23].main.temp, weather: data.list[23].weather[0].description}
        let day4: Day = {date: data.list[31].dt_txt, temperature: data.list[31].main.temp, weather: data.list[31].weather[0].description}
        let day5: Day = {date: data.list[39].dt_txt, temperature: data.list[39].main.temp, weather: data.list[39].weather[0].description}
        setForecast({
            day1: day1,
            day2: day2,
            day3: day3,
            day4: day4,
            day5: day5,
        })
    }
    async function getCoord() {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        })
        console.log(lat, lon)
        const req = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=city&apiKey=4d11bf3daa514b5e8e81050b8111cde9`)
        const cityname = await req.json()
        console.log(cityname.features[0].properties.address_line2)
        setCity(cityname.features[0].properties.address_line2)
    }
    async function getWeather() {
        getCoord()
        getForecast()
        const request = await fetch(`https://ru.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${system}&appid=0807c0448d35beb3996c63b486bea581`)
        const data = await request.json()
        setTemp(data.main.temp)
        setSpeed(data.wind.speed)
        setWeather(data.weather[0].main)
        if (weather == "Clouds") {
            setImgsrc('few_clouds.png')
        }
        else if (weather == "Clear") {
            setImgsrc('sun.png')
        }
        else if (weather == "Thunderstorm") {
            setImgsrc('thunder.png')
        }
        else if (weather == "Snow") {
            setImgsrc('snow.png')
        }
        else if (weather == "Rain") {
            setImgsrc('rain.png')
        }
        else if (weather == "Drizzle") {
            setImgsrc('rain.png')
        }
        else if (weather == "Mist") {
            setImgsrc('mist.png')
        } else {
            setImgsrc('few_clouds.png')
        }
    }
    useEffect(() => {
        if (props.system == 'metric') {
            setSystem('metric')
            setSpeedmeasure('meters/s')
            setTempmeasure('C')
        } else {
            setSystem('imperial')
            setSpeedmeasure('miles/h')
            setTempmeasure('F')
        }
        getWeather()
    }, [props.system, system])
    return (
        <>  
            <div className="homepage">
                <div className="maincont">
                    <div className="todaycont">
                        <div className="temp">{temp} {tempmeasure}</div>
                        <div className="image">
                            <img className='image' src={`src/assets/${imgsrc}`}/>
                            <p className="city">{city}</p>
                        </div>
                        <div className="weather">
                            <p className="weathername">{weather}</p>
                            <span className="windspeed">Wind speed: {speed} {speedmeasure}</span>
                        </div>
                    </div>
                </div>
                <div className="weekcont">
                    <div className="weekday mon">{forecast.day1.date}
                        <p className="weekdaytemp">{forecast.day1.temperature} {tempmeasure}</p>
                        <p className="weekdayweather">{forecast.day1.weather}</p>
                    </div>
                    <div className="weekday mon">{forecast.day2.date}
                        <p className="weekdaytemp">{forecast.day2.temperature} {tempmeasure}</p>
                        <p className="weekdayweather">{forecast.day2.weather}</p>
                    </div>
                    <div className="weekday mon">{forecast.day3.date}
                        <p className="weekdaytemp">{forecast.day3.temperature} {tempmeasure}</p>
                        <p className="weekdayweather">{forecast.day3.weather}</p>
                    </div>
                    <div className="weekday mon">{forecast.day4.date}
                        <p className="weekdaytemp">{forecast.day4.temperature} {tempmeasure}</p>
                        <p className="weekdayweather">{forecast.day4.weather}</p>
                    </div>
                    <div className="weekday mon">{forecast.day5.date}
                        <p className="weekdaytemp">{forecast.day5.temperature} {tempmeasure}</p>
                        <p className="weekdayweather">{forecast.day5.weather}</p>
                    </div>
                </div>
            </div>
        </>
    )
}