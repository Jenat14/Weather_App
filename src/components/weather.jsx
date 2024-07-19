import React from "react";

const Weather = ({ weather }) => {
    
    return (
        <div  className="w-[800px] h-[300px] p-10 bg-[#CAE6B2] mx-auto mt-20">
            <h1 className="text-center font-bold text-2xl">Weather Data</h1>
            <p className="mt-2 text-center font-medium text-base">{weather.weather[0].description}</p>
            <ul className="mt-5">
                <li className="text-center">Temprature:  {weather.main.temp}</li>
                <li className="text-center">Pressure:  {weather.main.pressure}</li>
                <li className="text-center">Humidity:  {weather.main.humidity}</li>
                <li className="text-center">Wind Speed:  {weather.wind.speed}</li>
            </ul>    
        </div>
    );
};

export default Weather;