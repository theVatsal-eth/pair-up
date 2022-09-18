import React from "react"
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

const Navbar = () => {
    return (

        <>
            <div className=" flex items-center justify-evenly  px-5 py-8">
                <div className=" text-4xl font-bold tracking-wide font-Poppins text-[#6A67E5] h-min text-center">
                    PairUp
                </div>
                <div className="flex text-xl text-slate-300  w-[60%]">
                    <ul className=" list-none flex w-full justify-around self-center">
                        <Link href="/"><li className=" flex h-min self-center cursor-pointer ">Home</li></Link>
                        <Link href="report"><li className=" flex h-min self-center cursor-pointer ">Report</li></Link>
                        <Link href="quiz"><li className=" flex h-min self-center cursor-pointer ">Quiz</li></Link>
                        <a><li className=" flex h-min self-center cursor-pointer ">Players</li></a>
                        <a><li className=" flex h-min self-center cursor-pointer ">About</li></a>
                    </ul>
                </div>
                <div className="flex h-max items-center z-20 connect">
                    <ConnectWallet accentColor="#6A67E5" colorMode="dark" />
                </div>
            </div>
            <img src="graphictopright.png" className="absolute top-0 -right-0 z-0 pointer-events-none select-none" />

        </>


    )
};
export default Navbar