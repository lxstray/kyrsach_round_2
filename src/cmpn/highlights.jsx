import React, { useEffect, useState } from "react";
import { fetchData, url } from "../api";
import * as module from "../modules.jsx";
import { connect } from 'react-redux';





function Highlights(geo) {
    const [aqi, setAqi] = useState()
    const [no2, setNo2] = useState()
    const [o3, setO3] = useState()
    const [so2, setSo2] = useState()
    const [pm2_5, setPm2_5] = useState()
    const [aqiTxt, setAqiTxt] = useState()
    const [aqiMes, setAqiMes] = useState()

    const [sunrise, setSunrise] = useState()
    const [sunset, setSunset] = useState()

    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [visibility, setVisibility] = useState()
    const [feel_like, setFeelLike] = useState()


    useEffect(()=>{
        fetchData(url.airPollution(`lat=${geo.geo.lat}`,`lon=${geo.geo.lon}`),(airPollution)=>{
            const[{
                main :{aqi},
                components: {no2, o3, so2, pm2_5}
            }]=airPollution.list;
            setAqi(aqi)
            setNo2(no2)
            setO3(o3)
            setSo2(so2)
            setPm2_5(pm2_5)
            setAqiTxt(module.aqiText[aqi].level)
            setAqiMes(module.aqiText[aqi].message)
        })

        fetchData(url.currentWeather(`lat=${geo.geo.lat}`,`lon=${geo.geo.lon}`),(currentWeather)=>{
            const{
                weather,
                dt: dateUnix,
                sys:{sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC},
                main: {temp, feels_like, pressure, humidity},
                visibility,
                timezone
            } = currentWeather;

            setSunrise(module.getTime(sunriseUnixUTC,timezone))
            setSunset(module.getTime(sunsetUnixUTC,timezone))

            setHumidity(humidity)
            setPressure(pressure)
            setVisibility(visibility)
            setFeelLike(feels_like)
        })

    }, [geo])

    return(
        <section className="section highlights" aria-labelledby="highlights-label" data-highlights>
            <div className="card card-lg">
                <h2 className="title-2" id="highlights-label">todays highlights</h2>

                <div className="highlights-list">
                    <div className="card card-sm highlight-card one">
                        <h3 className="title-3">air quality index</h3>

                        <div className="wrapper">
                            <span className="m-icon">air</span>

                            <ul className="card-list">
                                <li className="card-item">
                                    <p className="title-1">{pm2_5}</p>
                                    <p className="label-1">PM<sub>2.5</sub></p>
                                </li>

                                <li className="card-item">
                                    <p className="title-1">{so2}</p>
                                    <p className="label-1">SO<sub>2</sub></p>
                                </li>

                                <li className="card-item">
                                    <p className="title-1">{no2}</p>
                                    <p className="label-1">NO<sub>2</sub></p>
                                </li>

                                <li className="card-item">
                                    <p className="title-1">{o3}</p>
                                    <p className="label-1">O<sub>3</sub></p>
                                </li>
                            </ul>
                        </div>

                        <span className={`badge aqi-${aqi} label-${aqi}`} title={`${aqiMes}`}>
                            {aqiTxt}
                        </span>
                    </div>

                    <div className="card card-sm highlight-card two">
                        <h3 className="title-3">sunrise & sunset</h3>

                        <div className="card-list">
                            <div className="card-item">
                                <span className="m-icon">clear_day</span>

                                <div>
                                    <p className="label-1">sunrise</p>
                                    <p className="title-1">{sunrise}</p>
                                </div>
                            </div>

                            <div className="card-item">
                                <span className="m-icon">clear_night</span>

                                <div>
                                    <p className="label-1">sunset</p>
                                    <p className="title-1">{sunset}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card card-sm highlight-card">
                        <h3 className="title-3">humidity</h3>
                        <div className="wrapper">
                            <span className="m-icon">humidity_percentage</span>

                            <p className="title-1">{humidity}<sup>%</sup></p>
                        </div>
                    </div>

                    <div className="card card-sm highlight-card">
                        <h3 className="title-3">pressure</h3>
                        <div className="wrapper">
                            <span className="m-icon">airwave</span>

                            <p className="title-1">{pressure}<sup>hPa</sup></p>
                        </div>
                    </div>

                    <div className="card card-sm highlight-card">
                        <h3 className="title-3">visibility</h3>
                        <div className="wrapper">
                            <span className="m-icon">visibility</span>

                            <p className="title-1">{visibility/1000}<sup>km</sup></p>
                        </div>
                    </div>

                    <div className="card card-sm highlight-card">
                        <h3 className="title-3">feel like</h3>
                        <div className="wrapper">
                            <span className="m-icon">thermostat</span>

                            <p className="title-1">{feel_like}<sup>&deg;c</sup></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    geo: state.geo
});

export default connect(mapStateToProps)(Highlights)