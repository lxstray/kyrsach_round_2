import React, { useEffect, useState } from "react";
import { fetchData, url } from "../api";
import * as module from "../modules.jsx";
import { connect } from 'react-redux';

function Forecast(geo) {
    const lat = "53.9024716"
    const lon = "27.5618225"

    const [forList, setForList] = useState()

    useEffect(()=>{
        fetchData(url.forecast(`lat=${geo.geo.lat}`, `lon=${geo.geo.lon}`),(forecast) => {
            const{
                list: forecastList,
                city:{timezone}
            } = forecast;
            const fiveDaysData = Array.from({ length: 5 }, (_, index) => {
                const icon = forecastList[index * 8].weather[0].icon
                const temp = forecastList[index * 8].main.temp_max
                const date = new Date(forecastList[index * 8].dt_txt)
                return { icon, temp, date };
            });

            setForList(fiveDaysData)
        })
    }, [geo])
    return(
        <section className="section forecast" aria-labelledby="forecast-label" data-5-day-forecast>
            <h2 className="title-2" id="forecast-label">5 days forecast</h2>

            <div className="card card-lg forecast-card">
                <ul>
                    {forList?.map((data, index) => (
                        <li key={index} className="card-item">
                        <div className="icon-wrapper">
                            <img src={`./images/weather_icons/${data.icon}.png`} alt="Overcast Clouds"
                            width={36} height={36} className="weather-icon" />

                            <span className="span">
                                <p className="tittle-2">{`${data.temp}`}&deg;c</p>
                            </span>
                        </div>

                        <p className="label-1">{data.date.getDate()} {module.monthNames[data.date.getMonth()]}</p>
                        <p className="label-1">{module.weekDayNames[data.date.getUTCDay()]}</p>
                    </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    geo: state.geo
});

export default connect(mapStateToProps)(Forecast)