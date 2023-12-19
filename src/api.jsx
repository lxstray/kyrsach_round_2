// const apiKey= "f438a41785d1f14df5629deb473d4047";
// const apiKey= "511c0d53e786d6e701870951d85c605d";
// const apiKey = "5d7396c8e1ba8f9d6d687524a0e081b5";
// const apiKey = "f438a41785d1f14df5629deb473d4047";
const apiKey = "4b3ec0219c313e8315d94bd622c15928";

export const fetchData = (URL,callback)=>{
    fetch(`${URL}&appid=${apiKey}`)
    .then(res=>res.json())
    .then(data=>callback(data))
}

export const url ={
    currentWeather(lat,lon){
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
    },

    forecast(lat,lon){
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
    },
    airPollution(lat,lon){
        return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
    },
    reverseGeo(lat,lon){
        return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
    },
    //https://api.openweathermap.org/geo/1.0/direct?q=min&limit=5&appid=f438a41785d1f14df5629deb473d4047

    geo(query){
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    }
}