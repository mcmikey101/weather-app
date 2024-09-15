import '../styles/home.css'
import { useState, useEffect } from 'react'
export default function Home() {

    const [temp, setTemp] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [weather, setWeather] = useState('')

    async function getCoordinates(city: string) {
        const request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=0807c0448d35beb3996c63b486bea581`)
        const data = await request.json()
        return data
    }
    async function getWeather(choice: string) {
        const city: any = await getCoordinates(choice)
        const lon: string = String(city[0].lon)
        const lat: string = String(city[0].lat)
        console.log(lon, lat)
        const request = await fetch(`https://ru.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0807c0448d35beb3996c63b486bea581`)
        const data = await request.json()
        setTemp(data.main.temp)
        setSpeed(data.wind.speed)
        console.log(data)
        console.log(data.main.temp, data.wind.speed)
        console.log(temp, speed)
    }
    return (
        <>  
            <button onClick={() => getWeather('Moscow')}>Test</button>
            <div className="homepage">
                <div className="maincont">
                    <div className="todaycont">
                        <div className="temp">{temp} C</div>
                        <div className="image"></div>
                        <div className="weather">
                            <p className="weathername">{weather}</p>
                            <span className="windspeed">Wind speed: {speed} m/s</span>
                        </div>
                    </div>
                    <div className="topcont">
                        <p className="topplace">Hottest today: </p>
                        <p className="topplace">Coldest today: </p>
                        <p className="topplace">Fastest wind today: </p>
                    </div>
                </div>
                <div className="weekcont">
                    <div className="weekday mon">Monday
                        <p className="weekdaytemp">14</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                    <div className="weekday tue">Tuesday
                        <p className="weekdaytemp">12</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                    <div className="weekday wed">Wednesday
                        <p className="weekdaytemp">13</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                    <div className="weekday thr">Thursday
                        <p className="weekdaytemp">15</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                    <div className="weekday fri">Friday
                        <p className="weekdaytemp">18</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                    <div className="weekday sat">Saturday
                        <p className="weekdaytemp">19</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                    <div className="weekday sun">Sunday
                        <p className="weekdaytemp">21</p>
                        <p className="weekdayweather">Rain</p>
                    </div>
                </div>
            </div>
        </>
    )
}