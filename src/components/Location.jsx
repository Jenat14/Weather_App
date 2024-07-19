import React, { useEffect, useState } from "react";
import Items from "./Items";
export default function Location() {
    const [lat ,setLat] = useState(null);
    const [long ,setLong] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            }
        );
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (lat !== null && long !== null) {
                console.log('Fetching weather data for coordinates:', lat, long);
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
                    );
                    const result = await response.json();
                    setData(result);
                } catch(error) {
                    console.log("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [lat, long]);
    return (
        <div>  
            <div className="w-[400px] bg-[#2C3333] p-10 text-[#CBE4DE] h-[max-content] shadow-lg rounded-lg">
                <h1 className="text-center font-bold  text-2xl">Current Weather</h1>
                {data ? (
                    <div>
                        <p className="mt-2 text-center font-medium text-base">Location: {data.name}</p>
                        <p className="mt-2 text-center font-medium text-xl">{data.weather[0].description}</p>
                        <ul className="mt-5">
                            <li className="text-center bg-[#CBE4DE] text-[#2C3333] h-[30px] rounded-md mb-2">Temperature: {data.main.temp}°C</li>
                            <li className="text-center bg-[#CBE4DE] text-[#2C3333] h-[30px] rounded-md mb-2">Pressure: {data.main.pressure}</li>
                            <li className="text-center bg-[#CBE4DE] text-[#2C3333] h-[30px] rounded-md mb-2">Humidity: {data.main.humidity}</li>
                            <li className="text-center bg-[#CBE4DE] text-[#2C3333] h-[30px] rounded-md mb-2">Wind Speed: {data.wind.speed}</li>
                        </ul>                   
                    </div>  
                ) : (
                    <div className="flex place-content-center mt-10">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
