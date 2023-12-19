import React, { useEffect, useState } from "react";
import { fetchData, url } from "../api";
import { connect } from 'react-redux';
import { updateGeo } from "../action";
import {Link} from 'react-router-dom';

let searchTimeOutDuration = 500;

const loadingAnim = ()=>{
    const loading = document.querySelector("[data-loading]");
    loading.style.display="grid";
    setTimeout(() => {
        loading.style.display="none";
    }, 500);
}

function Header({ geo, dispatch }) {

    const updateGeoHandler = (newLat, newLon, event) => {
        event.preventDefault();
        setActiveMenu("")
        const newGeo = { lat: newLat, lon: newLon };
        dispatch(updateGeo(newGeo));
        loadingAnim()
      };

    const currentGeo = () => {
            loadingAnim()
            if('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        const newGeo = { lat: latitude, lon: longitude };
                        dispatch(updateGeo(newGeo));
                    }
                )
            }
    }

    const [activeMenu, setActiveMenu] = useState("")
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchTimeOut, setSearchTimeOut] = useState(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            setSearching("");
        } else {
            setSearching("searching");
        }

        if (searchValue) {
            clearTimeout(searchTimeOut);
            setSearchTimeOut(
                setTimeout(() => {
                    fetchData(url.geo(searchValue), (locations) => {
                        setSearching("");
                        setSearchResult(locations);
                    });
                }, searchTimeOutDuration)
            );
        }
    }, [searchValue]);

    return (
        <header className="header">
            <div className="container">
                <a href="#" className="logo">
                    <Link to="/" onClick={loadingAnim}>
                    <img
                        src="./images/logo.png"
                        width={364}
                        height={58}
                        alt="logo"
                    />
                    </Link>
                </a>

                <div className={`search-view ${activeMenu}`} data-search-view>
                    <div className="search-wrapper">
                        <input
                            type="search"
                            name="search"
                            placeholder="search city ... "
                            autoComplete="off"
                            className={`search-field ${searching}`}
                            data-search-field
                            onChange={handleInputChange}
                            value={searchValue}
                        />

                        <span className="m-icon leading-icon">search</span>

                        <button
                            className="icon-btn leading-icon has-state"
                            aria-label="close search"
                            data-search-toggler
                            onClick={()=>setActiveMenu("")}
                        >
                            <span className="m-icon">arrow_back</span>
                        </button>


                    </div>

                    <div className="search-result" data-search-result>
                        {searchResult.length > 0 && (
                            <ul className="view-list" data-search-list>
                                {searchResult.map(
                                    ({ name, lat, lon, country, state }) => (
                                        <li className="view-item" key={name} onClick={()=>setActiveMenu("")}>
                                            <span className="m-icon">
                                                location_on
                                            </span>
                                            <div>
                                                <p className="item-title">
                                                    {name}
                                                </p>
                                                <p className="label-2 item-subtitle">
                                                    {state || ""} {country}
                                                </p>
                                            </div>
                                            <a
                                                onClick={(event) => updateGeoHandler(lat, lon, event)}
                                                href={`#`}
                                                className="item-link has-state"
                                                aria-lable={`${name} weather`}
                                                data-search-toggler

                                            ></a>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="header-actions">
                    <button
                        className="icon-btn has-state"
                        aria-label="open search"
                        data-search-toggler
                        onClick={()=>setActiveMenu("active")}
                    >
                        <span className="m-icon icon">search</span>
                    </button>

                    <a
                        href="#/current-location"
                        className="btn-primary has-state"
                        onClick={currentGeo}
                    >
                        <span className="m-icon">my_location</span>
                        <span className="span">current location</span>
                    </a>

                    <Link to="/map" onClick={loadingAnim}>
                    <a
                        href="#"
                        className="btn-primary has-state cloudy_icon"
                    >
                        <span className="m-icon">cloudy_snowing</span>
                    </a>
                    </Link>
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = (state) => ({
    geo: state.geo
});

export default connect(mapStateToProps)(Header);
