export default function Items(props) {
    return(
        <div className=" h-[100px] w-[400px] bg-[#2C3333] text-[#ffffff] shadow-lg rounded-lg">
            <h2 className="text-center p-3">{props.title}</h2>
            <p className="text-center">{props.value}</p>
        </div>
    );
} 