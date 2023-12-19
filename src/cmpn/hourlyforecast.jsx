import React, { useEffect, useState } from "react";
import { fetchData, url } from "../api";
import * as module from "../modules.jsx";
import { connect } from 'react-redux';

function HourlyForecast(geo) {
    const [wData, setWData] = useState()
    const [wiData, setWiData] = useState()

    useEffect(()=>{
        fetchData(url.forecast(`lat=${geo.geo.lat}`,`lon=${geo.geo.lon}`),(forecast)=>{
            const{
                list: forecastList,
                city:{timezone}
            } = forecast;
            const weatherData = Array.from({ length: 8 }, (_, index) => {
                const time = `${module.getTime(forecastList[index+4].dt,timezone)}`;
                const temperature = `${forecastList[index+4].main.temp}°C`;
                const iconSrc = `./images/weather_icons/${forecastList[index+4].weather[0].icon}.png`;
                return { time, temperature, iconSrc };
            });
            setWData(weatherData)

            const windData = Array.from({ length: 8 }, (_, index) => {
                const time = `${module.getTime(forecastList[index+4].dt,timezone)}`;
                const speed = `${parseInt(module.mps_to_kmh(forecastList[index+4].wind.speed))}`;
                const iconSrc = `./images/weather_icons/direction.png`;
                const style = {transform: `rotate(${forecastList[index+4].wind.deg - 180}deg)`}
                return { time, speed, iconSrc, style };
            });

            setWiData(windData)
        })
    }, [geo])


    return (
        <section className="section hourly-forecast" aria-label="hourly forecast" data-hourly-forecast>
            <h2 className="title-2">today at</h2>
            <div className="slider-container">
                <ul className="slider-list" data-temp>
                    {wData?.map((data, index) => (
                    <li key={index} className="slider-item">
                    <div className="card card-sm slider-card">
                        <p className="body-3">{data.time}</p>

                        <img
                        src={data.iconSrc}
                        width={48}
                        height={48}
                        loading="lazy"
                        alt="Weather Icon"
                        className="weather-icon"
                        />
                        <p className="body-3">{data.temperature}</p>
                    </div>
                    </li>
                    ))}
                </ul>

                <ul className="slider-list" data-wind>
                    {wiData?.map((data, index) => (
                        <li key={index} className="slider-item">
                        <div className="card card-sm slider-card">
                            <p className="body-3">{data.time}</p>

                            <img
                            src={data.iconSrc}
                            width={48}
                            height={48}
                            loading="lazy"
                            alt="Wind Icon"
                            className="weather-icon"
                            style={data.style}
                            />
                            <p className="body-3">{data.speed} <br /> km/h</p>
                        </div>
                        </li>
                ))}
                </ul>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    geo: state.geo
});

export default connect(mapStateToProps)(HourlyForecast);
