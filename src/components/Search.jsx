import React, {useState} from "react";
export default function Search({onLocationChange}) {
    const [location, setLocation] = useState("");
    const handleChange = (e) =>{
        setLocation(e.target.value)
    }
    const handleclick = () => {
        if (location.trim() === "") {
            setError(true);
            return; 
          }
          onLocationChange(location);
    }

    return (
        <div className="w-[1000px] flex justify-center gap-3 ">
            <input type="text"
            id="location"
            className="px-3 py-2 border border-gray-300 rounded-md w-[500px] h-[40px]"
            placeholder="Search For Places"
             value={location} 
             onChange={handleChange}/>
            <button onClick={handleclick} className="w-[140px] h-[40px] leading-6 text-[17px] bg-[#8F43EE] text-[#ffffff] tracking-[0.2px] rounded-md"> search</button>
        </div>
    );
};