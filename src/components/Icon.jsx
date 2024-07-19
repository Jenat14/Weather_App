export default function Icon(img) {
    console.log(img)
    return(
        <div className="flex justify-center items-center">
            <img
            src={`http://openweathermap.org/img/wn/${img.img.icon}.png`}
            alt={img.img.description}
            className="h-[100px]"
              />
        </div>
    );
} 