import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Location from "./components/Location.jsx";
import Icon from "./components/Icon.jsx";
function App() {
  const Items =({title,value}) =>(
    <div className=" h-[100px] w-[350px] bg-[#8F43EE] text-[#ffffff] shadow-lg rounded-lg">
            <h2 className="text-center p-3 text-xl font-medium">{title}</h2>
            <p className="text-center">{value}</p>
        </div>
  );
  const [locationData, setLocationData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const onLocationChange = (location) => {
    setLocationData(location);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (locationData !== null) {
        setLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/weather?q=${encodeURIComponent(
              locationData
            )}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
          );
          const result = await response.json();
          console.log('Weather data fetched:', result);
          setData(result);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [locationData]);

  return (
    <div className="bg-[#20262E] min-h-screen p-5">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <Search onLocationChange={onLocationChange} />
        </div>
        <div className="flex flex-col md:flex-row mt-24 px-10">
        <div className="w-full md:w-2/3 md:ml-4">
          <Location />
        </div>
        <div className=" md:w-2/3 md:ml-4 pl-6">
          { data ? (
            <div>
              <div className="flex justify-center items-center">
                <p className="font-medium text-3xl text-center text-white">{data.weather[0].description}</p>
                <Icon img={data.weather[0]}/>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex flex-col gap-4">
                  <Items title="Temperature" value={data.main.temp}/>
                  <Items title="Pressure" value={data.main.pressure} />
                </div>
                <div className="flex flex-col gap-4">
                  <Items title="Humidity" value={data.main.humidity} />
                  <Items title="Wind Speed" value={data.wind.speed} />
                </div>
              </div>
            </div>
          ) : (
            <p className="font-medium text-2xl text-center text-white">Search for any location</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;