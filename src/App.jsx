import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Location from "./components/Location.jsx";
import Icon from "./components/Icon.jsx";
import temperature from "./assets/temperature.png";
import pressure from "./assets/pressure.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
function App() {
  const Items =({title,value,img}) =>(
    <div className=" h-[150px] w-[350px] flex gap-4 items-center bg-[#8F43EE] text-[#ffffff] shadow-lg rounded-lg">
          <img  className="h-[40%] ml-6" src={img}></img>
            <div>
              <h2 className="text-center px-5 text-xl">{title}</h2>
              <p className="text-center text-3xl font-medium">{value}</p>
            </div>
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
                <div className="flex flex-col gap-6">
                  <Items title="Temperature" value={data.main.temp} img={temperature}/>
                  <Items title="Pressure" value={data.main.pressure} img={pressure}/>
                </div>
                <div className="flex flex-col gap-6">
                  <Items title="Humidity" value={data.main.humidity} img={humidity}/>
                  <Items title="Wind Speed" value={data.wind.speed} img={wind}/>
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