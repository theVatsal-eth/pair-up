import React from 'react'
import Navbar from '../components/Navbar'

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <div className=" h-screen ">
                <Navbar />
                {children}
            </div>
            <img src="graphicbottomleft.png" className=" absolute bottom-0 -left-2 z-0 pointer-events-none select-none" />

        </>
    )
}

export default Layout