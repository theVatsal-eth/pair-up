import React from "react"
import Navbar from "./Navbar"

const Report =()=>{
    return(
        <>
        <div className="  h-[40rem] mt-14  z-20 flex w-full align-middle justify-evenly font-Poppins text-2xl">
            <div className="  w-1/2 flex justify-center items-center">
                <div className=" h-[21rem] flex flex-col justify-between w-1/2 items-center">
                    <div className="flex  h-72 w-3/4"><img src="pfp.png" className=" object-cover" /></div>
                    <div className="flex  w-full text-center justify-center"><div className="w-min "> Address</div></div>
                </div>
            </div>
            <div className=" w-1/2 flex justify-center items-center px-9">
                <div className=" h-[20rem] w-[36rem] flex flex-col justify-between pb-6">
                    <div className="w-full  text-center h-[28%] flex self-start items-center rounded-lg pl-3 bg-[#3E3E3E]"><div className=" h-min">Easy challenges <span className=" underline      decoration-[#BBF085]">won</span>: </div></div>
                    <div className="w-full  text-center h-[28%] flex  items-center rounded-lg pl-3 bg-[#3E3E3E]"><div className=" h-min">Medium challenges <span className="underline decoration-[#ECDB81]">won</span>:</div></div>
                    <div className="w-full  text-center h-[28%] flex  items-center rounded-lg pl-3 bg-[#3E3E3E]"><div className=" h-min">Hard challenges <span className="underline decoration-[#E16D6D]">won</span>:</div></div>
                </div>
                </div>            
        </div>
        </>
    )

};

export default Report;