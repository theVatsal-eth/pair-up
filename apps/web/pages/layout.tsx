import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import React from 'react'
import Navbar from '../components/Navbar'

const activeChainId = ChainId.Mumbai;


type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <ThirdwebProvider desiredChainId={activeChainId}>
                <div className=" h-screen flex flex-col justify-between ">
                    <Navbar />
                    {children}
                    <footer className='h-20 text-right p-8 text-base font-Poppins font-semibold '>
                        <span className=''>Made with 💙 by Ehsan, Samarth &amp; Vatsal</span>
                    </footer>
                </div>
                <img src="graphicbottomleft.png" className=" absolute bottom-0 -left-2 z-0 pointer-events-none select-none" />
            </ThirdwebProvider>
        </>
    )
}

export default Layout