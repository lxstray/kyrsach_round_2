import React, { useEffect, useState } from "react";
import { fetchData, url } from "../api";
import * as module from "../modules.jsx";
import { connect } from 'react-redux';



function CurrentWeather({geo}) {
    const [temp, setTemp] = useState()
    const [icon, setIcon] = useState()
    const [desc, setDesc] = useState()
    const [currentDate, setCD] = useState()
    const [loc, setLoc] = useState()


    useEffect(()=>{
        fetchData(url.currentWeather(`lat=${geo.lat}`,`lon=${geo.lon}`),(currentWeather)=>{
            const{
                weather,
                dt: dateUnix,
                sys:{sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC},
                main: {temp, feels_like, pressure, humidity},
                visibility,
                timezone
            } = currentWeather;
            const[{description,icon}] = weather;
            setIcon(icon)
            setDesc(description)
            setTemp(currentWeather.main.temp)
            setCD(module.getDate(dateUnix,timezone))
        })
        fetchData(url.reverseGeo(`lat=${geo.lat}`,`lon=${geo.lon}`),([{name,country}])=>{
            setLoc(`${name}, ${country}`);
        })
    }, [geo])



    return(
        <section className="section current-weather" aria-label="current weather" data-current-weather>
            <div className="card card-lg current-weather-card">
                <h2 className="title-2 card-title">now</h2>

                <div className="weapper">
                    <p className="heading">{temp}&deg;<sup>c</sup></p>
                    <img src={`./images/weather_icons/${icon}.png`}  width={64} height={64} alt={desc} className="weather-icon" />
                </div>

                <p className="body-3">{desc}</p>

                <ul className="meta-list">
                    <li className="meta-item">
                        <span className="m-icon">calendar_today</span>
                        <p className="title-3 meta-text">{currentDate}</p>
                    </li>
                    <li className="meta-item">
                        <span className="m-icon">location_on</span>
                        <p className="title-3 meta-text">{loc}</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    geo: state.geo
});

export default connect(mapStateToProps)(CurrentWeather)