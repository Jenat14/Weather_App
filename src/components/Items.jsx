export default function Items(cont) {
    return(
        <div className=" h-[100px] w-[350px] bg-[#8F43EE] text-[#ffffff] shadow-lg rounded-lg">
            <h2 className="text-center p-3 text-xl font-medium">{cont.title}</h2>
            <p className="text-center">{cont.value}</p>
        </div>
    );
} 