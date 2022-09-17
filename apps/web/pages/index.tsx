import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Quiz from '../components/Quiz';
import Navbar from '../components/Navbar';
import LevelSelect from '../components/LevelSelect';

const Index: NextPage = () => {
  return (
    <div className="flex">
      <Navbar />
      <LevelSelect />
      {/* <Quiz /> */}
    </div>
  );
};

export default Index;
