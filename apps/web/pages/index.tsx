import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Home from '../components/Home';

const Index: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="flex flex-col gap-5 mt-14 justify-center items-center">
        <h1 className='text-8xl font-bold  text-transparent bg-clip-text bg-gradient-to-r font-Poppins from-green-300 via-blue-500 to-purple-600'>PairUp!</h1>
        <p className='text-3xl font-medium'>Pair with your friends and challenge them to quiz!</p>
        <Link href='/quiz'><a className='p-4 mt-8 border-none bg-indigo-800 rounded-xl text-2xl font-bold hover:bg-indigo-700'>Play Now!</a></Link>
      </div>

      <div className='flex items-center justify-center gap-12 mt-14'>
        <div className='bg-indigo-800 border rounded-xl  border-blue-500 p-8 h-80 aspect-square flex items-center text-3xl font-bold font-Poppins justify-center'>
          <span>Play A Quiz</span>
        </div>
        <div className='bg-indigo-800 border rounded-xl border-blue-500 p-8 text-3xl font-bold font-Poppins aspect-square flex items-center shadow-xl'>
          <span>Challenge a player</span>
        </div>
        <div className='bg-indigo-800 border rounded-xl border-blue-500 p-8 h-80 text-3xl font-bold font-Poppins aspect-square flex items-center justify-center'>
          <span>Win NFTs!!</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
