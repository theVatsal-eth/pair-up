import React from "react"
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = ()=>{
    return(
        <div className="nav flex align-middle justify-between fixed inset-0 border-black  min-w-full h-20 px-20 py-12">
            <div className="border-2 logo w-[25%] text-4xl font-bold tracking-wide font-Poppins text-[#6A67E5] flex h-min self-center">
                Quiz Dapp</div>
            <div className="nav-options flex text-xl text-slate-300  w-[60%]">
                <ul className=" list-none flex w-full justify-around self-center">
                    <li className=" flex h-min self-center ">Home</li>
                    <li className=" flex h-min self-center ">Report</li>
                    <li className=" flex h-min self-center ">Players</li>
                    <li className=" flex h-min self-center ">Challenges</li>
                    <li className=" flex h-min self-center ">About</li>
                </ul>
            </div>
            <div className="flex border-2 h-max self-center connbutton w-[15%] "><ConnectWallet accentColor="#6A67E5" colorMode="dark"  /></div>

            
        </div>

    )
};
export default Navbar