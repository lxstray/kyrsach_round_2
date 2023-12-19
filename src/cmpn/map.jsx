import { connect } from 'react-redux';

function Map(geo) {
    return(
        <div className="map-container">
            <iframe
            className='map'
            src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=${geo.geo.lat}&lon=${geo.geo.lon}&zoom=10`}>
        </iframe>
        </div>
    )
}

const mapStateToProps = (state) => ({
    geo: state.geo
});

export default connect(mapStateToProps)(Map)