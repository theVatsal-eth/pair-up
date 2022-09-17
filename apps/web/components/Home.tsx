import React from "react"
import Navbar from "./Navbar";

const Home = ()=>{
    return(
        <div className=" h-[40rem] mt-14 flex w-full align-middle justify-evenly font-Poppins text-2xl">
            <div className=" bg-[#3E3E3E] w-64  font-bold tracking-wide z-20  h-64 flex self-center items-center justify-center text-[#BBF085] rounded-md"><div className="h-min">Easy</div></div>
            <div className="bg-[#3E3E3E] w-64 font-bold  tracking-wide  z-20 h-64 self-center flex items-center justify-center text-[#ECDB81] rounded-md"><div className="h-min">Medium</div></div>
            <div className=" bg-[#3E3E3E] w-64 font-bold tracking-wide  z-20 h-64 self-center flex items-center justify-center text-[#E16D6D] rounded-md"><div className="h-min">Hard</div></div>
        <img src="graphicbottomleft.png" className=" absolute bottom-0 -left-2 z-0" />
        
        
        </div>
        



    )
};

export default Home