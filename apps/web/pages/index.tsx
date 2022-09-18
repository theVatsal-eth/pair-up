import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Quiz from '../components/Quiz';
import Navbar from '../components/Navbar';
import Home from '../components/Home';

const Index: NextPage = () => {
  return (
    <div className="flex">
      
      <Home />
      {/* <Quiz /> */}
    </div>
  );
};

export default Index;
