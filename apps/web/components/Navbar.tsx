import React from "react"
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

const Navbar = ()=>{
    return(
        <div className="nav flex align-middle justify-between fixed inset-0   min-w-full h-20 px-20 py-12">
            <div className="  hover:text-indigo-400      transition-colors logo w-[25%] text-4xl font-bold tracking-wide font-Poppins text-[#6A67E5] flex h-min self-center hover:cursor-pointer">
                Quiz Dapp</div>
            <div className="nav-options flex text-xl text-slate-300  w-[60%]">
                <ul className=" list-none flex w-full justify-around self-center">
                    <Link href="/"><li className=" flex h-min self-center hover:cursor-pointer hover:text-white transition-colors ">Home</li></Link>
                    <Link href="dashboard"><li className=" flex h-min self-center hover:cursor-pointer hover:text-white transition-colors  ">Dashboard</li></Link>
                    <a><li className=" flex h-min self-center hover:cursor-pointer hover:text-white transition-colors ">Players</li></a>
                    <a><li className=" flex h-min self-center hover:cursor-pointer hover:text-white transition-colors ">About</li></a>
                </ul>
            </div>
            <div className="flex h-max self-center connbutton w-[15%] z-20 connect"><ConnectWallet accentColor="#6A67E5" colorMode="dark"  /></div>
            <img src="graphictopright.png" className="absolute top-0 -right-4 z-2 pointer-events-none select-none"/>            
        </div>

    )
};
export default Navbar