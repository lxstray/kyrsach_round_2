import CurrentWeather from "./cmpn/curent";
import Forecast from "./cmpn/forecast";
import Highlights from "./cmpn/highlights";
import HourlyForecast from "./cmpn/hourlyforecast";
import Footer from "./cmpn/footer";
import Error404 from "./cmpn/error404";


function Main() {
    return(
        <div className="main">
                <main>
                    <article className="container" data-container>
                        <div className="content-left">
                            <CurrentWeather />
                            <Forecast />
                        </div>

                        <div className="content-right">
                            <Highlights />
                            <HourlyForecast />
                            <Footer />
                        </div>

                        {/* <div className="loading" data-loading></div> */}

                    </article>
                </main>
                <Error404 />
            </div>
    )
}

export default Main