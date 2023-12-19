import React from "react";
import "./index.css";
import Header from "./cmpn/header"
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './store';
import Main from './main'
import Map from "./cmpn/map";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" exact Component={Main} />
                    <Route path="/map" Component={Map} />
                </Routes>
                <div className="loading" data-loading></div>
            </Router>
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
