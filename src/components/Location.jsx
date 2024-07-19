import React, { useEffect, useState } from "react";
export default function Location() {
    const [lat ,setLat] = useState(null);
    const [long ,setLong] = useState(null);
    const [data, setData] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");


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
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentDate(
                `${now.getDate()} ${now.toLocaleString("default", {
                  month: "short",
                })}`
              );
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
      
    return () => clearInterval(interval);
    }, [lat, long]);

    
    return (
        <div>  
            <div className="w-[400px] bg-[#8F43EE] p-10 text-[#CBE4DE] h-[max-content] shadow-lg rounded-lg">
                {data ? (
                    <div>
                        <h3 className="text-center font-bold  text-2xl">{data.name}</h3>
                        <p className="text-center font-medium text-md my-2">{currentDate} ,{currentTime}</p>
                        <h2 className="text-center mt-5 text-4xl">{data.main.temp}°C</h2>
                        <p className="mt-2 text-center font-medium text-md">{data.weather[0].description}</p>
                        <ul className="mt-5">
                            <li className="text-center mb-2">Pressure: {data.main.pressure}</li>
                            <li className="text-center mb-2">Humidity: {data.main.humidity}</li>
                            <li className="text-center mb-2">Wind Speed: {data.wind.speed}</li>
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
