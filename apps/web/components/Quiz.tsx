import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { setDoc, onSnapshot } from 'firebase/firestore';

import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  where,
} from '@firebase/firestore';

const Quiz = () => {
  const [questions, setQuestions] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<String>('ahmad');
  const [username, setUsername] = useState<String>('');
  const [challenges, setChallenges] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [students, setStudents] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [quizz, setQuizz] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const [c, setC] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const challengesCollection = collection(firestore, 'challenges');
  const questionCollection = collection(firestore, 'questions');
  const studentsCollection = collection(firestore, 'students');
  const quizzCollection = collection(firestore, 'quizzes');

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    const studentstQuery = query(
      studentsCollection,
      where('name', '!=', input),
      limit(10)
    );
    const querySnapshot = await getDocs(studentstQuery);
    const result = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    console.log(result);
    setStudents(result);
  };

  const getQuizz = async () => {
    const quizzQuery = query(quizzCollection, limit(1));
    const querySnapshot = await getDocs(quizzQuery);
    const result = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    setQuestions(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(input);
  };

  const loadQuizz = async (e, level) => {
    // const quizzQuery = query(
    //   quizzCollection,
    //   where('level', '==', level),
    //   limit(10)
    // );
    // const querySnapshot = await getDocs(quizzQuery);
    // const result: QueryDocumentSnapshot<DocumentData>[] = [];
    // querySnapshot.forEach((snapshot) => {
    //   result.push(snapshot.doc());
    // });
    // result.forEach((abc) => {});
    // console.log(result);
    // setQuizz(result);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <input type="submit" />
      </form>

      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase text-xs font-bold mb-4">
          Challenge Friend
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state">
            {students &&
              students.map((student) => (
                <option key={student.id}>{student.data().name}</option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <button className="btn btn-blue" onClick={(e) => loadQuizz(e, 'easy')}>
        Easy
      </button>
      <button className="btn btn-blue" onClick={(e) => loadQuizz(e, 'medium')}>
        Medium
      </button>
      <button className="btn btn-blue" onClick={(e) => loadQuizz(e, 'hard')}>
        Easy
      </button>

      <div className="flex flex-col w-full">
        <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5">
          <input type="radio" className="w-6 h-6 bg-black" />
          <p className="ml-6 text-white">True</p>
        </div>
      </div>
    </>
  );
};

export default Quiz;
