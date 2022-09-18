import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Home from '../components/Home';

const Index: NextPage = () => {
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <h1 className='text-8xl font-bold  text-transparent bg-clip-text bg-gradient-to-r font-Poppins from-green-300 via-blue-500 to-purple-600'>PairUp!</h1>
        <p className='text-3xl font-medium'>Pair with your friends and chllenge them to quiz!</p>
      </div>
    </>
  );
};

export default Index;
