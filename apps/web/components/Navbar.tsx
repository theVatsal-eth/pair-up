import React from "react"
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

const Navbar = ()=>{
    return(
        <div className="nav flex align-middle justify-between fixed inset-0   min-w-full h-20 px-20 py-12">
            <div className="logo w-[25%] text-4xl font-bold tracking-wide font-Poppins text-[#6A67E5] flex h-min self-center">
                Quiz Dapp</div>
            <div className="nav-options flex text-xl text-slate-300  w-[60%]">
                <ul className=" list-none flex w-full justify-around self-center">
                    <Link href="/"><li className=" flex h-min self-center ">Home</li></Link>
                    <Link href="report"><li className=" flex h-min self-center ">Report</li></Link>
                    <a><li className=" flex h-min self-center ">Players</li></a>
                    <a><li className=" flex h-min self-center ">Challenges</li></a>
                    <a><li className=" flex h-min self-center ">About</li></a>
                </ul>
            </div>
            <div className="flex h-max self-center connbutton w-[15%] z-20 connect"><ConnectWallet accentColor="#6A67E5" colorMode="dark"  /></div>
            <img src="graphictopright.png" className="absolute top-0 -right-4 z-2 pointer-events-none select-none"/>            
        </div>

    )
};
export default Navbar