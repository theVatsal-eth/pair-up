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
import Challenge from './Challenge';

interface Props {
  studentName: string;
}

const Quiz: React.FC<Props> = ({ studentName }) => {
  const [question, setQuestion] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [isChallenged, setIsChallenged] = useState<Boolean>(true);
  const [loading, setLoading] = useState<Boolean>(true);
  const [score, setScore] = useState<Number>(0);
  const [questionId, setQuestionId] = useState<String>('');
  const [option, setOption] = useState<String>('');
  const [challengedStudent, setChallengedStudent] = useState<String>();
  const [isQuizSubmited, setIsQuizSubmited] = useState<Boolean>(false);
  const [challenges, setChallenges] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [students, setStudents] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  //   const [quizz, setQuizz] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const [c, setC] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const challengesCollection = collection(firestore, 'challenges');
  const questionCollection = collection(firestore, 'questions');
  const studentsCollection = collection(firestore, 'students');
  //   const quizzCollection = collection(firestore, 'quizzes');

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    const studentstQuery = query(
      studentsCollection,

      limit(10)
    );

    try {
      const querySnapshot = await getDocs(studentstQuery);
      const result: QueryDocumentSnapshot<DocumentData>[] = [];
      querySnapshot.forEach((snapshot) => {
        result.push(snapshot);
      });

      setStudents(result);
    } catch (error) {
      console.log(error);
    }
  };

  // const selectedOption = (e) => {
  //   console.log(e.target.value);
  // };

  const handleQuizSubmit = () => {
    setIsQuizSubmited(true);
    let correctAnswer = '';

    console.log(correctAnswer);
    if (option == question[0].data().correct) {
      setScore(100);
    } else {
      setScore(0);
    }
  };

  const handleChallengeSubmit = async () => {
    console.log('clcked challelj');
    if (question[0]) {
      // console.log(`studentName: ${studentName}`);
      // console.log(`challengedStudent: ${challengedStudent}`);
      // console.log(`challengingStudentScore:${score}`);
      // console.log(`challengedStudentScore:""`);
      // console.log(`level: ${question[0].data().level}`);
      // console.log(`questionId: ${question[0].data().id}`);
      // console.log(`status: pending`);

      // get the current timestamp
      const timestamp: string = Date.now().toString();
      // create a pointer to our document
      const _challenge = doc(firestore, `challenges/${timestamp}`);
      // structure the todo data
      let _quesionId = '';
      question.forEach((element) => {
        _quesionId = element.id;
      });
      const challaengeData = {
        from: studentName,
        to: challengedStudent,
        fromScore: score,
        questionId: _quesionId,
        toScore: '',
        status: 'pending',
      };

      try {
        //add the document
        await setDoc(_challenge, challaengeData);
        //   setC(todoData);
        //   getChallenges();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loadQuestion = async (level: string) => {
    console.log('click');
    const questionQuery = query(
      questionCollection,
      where('level', '==', level),
      limit(1)
    );
    const querySnapshot = await getDocs(questionQuery);
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });

    result.forEach((element) => {
      setQuestionId(element.id);
    });

    setQuestion(result);
  };

  return (
    <div>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <button
          className="btn btn-blue"
          onClick={() => loadQuestion('easy')}>
          Easy
        </button>
        <br />
        <br />
        <button
          className="btn btn-blue"
          onClick={() => loadQuestion('medium')}>
          Medium
        </button>
        <br />
        <br />
        <button
          className="btn btn-blue"
          onClick={() => loadQuestion('hard')}>
          Hard
        </button>
        <br />
        <br />
        <button className="btn btn-green">socre: {score}</button>
        <div className="mt-10 font-bold text-center flex flex-col gap-y-2 w-1/2 m-auto">
          {/* <form onSubmit={handleQuizSubmit}> */}
          <h1>Quiz</h1>
          {question.map((data) => (
            <div key={data.id} className="flex flex-col gap-y-2">
              <h3>{data.data().value}</h3>
              {data.data().answers &&
                data.data().answers.map((answer:string) => (
                  <button
                    onClick={(e) => setOption(answer)}
                    key={answer}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    {answer}
                  </button>

                  // <option key={student.id}>{student.data().name}</option>
                ))}
            </div>
          ))}
          <br />
          <button onClick={handleQuizSubmit}>Submit</button>
          {/* </form> */}
          {/* <form onSubmit={handleQuizSubmit}>
          {question.map((data) => (
            <>
              <div key={data.id}>{data.data().value}</div>
              <select
                className="block appearance-none w-1/2 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={(e) => setOption(e.target.value)}>
                {data.data().answers &&
                  data
                    .data()
                    .answers.map((answer) => <option>{answer}</option>)}
              </select>
            </>
       
          <br></br>
          <br></br>
          <input type="submit" />
        </form> */}
          <br /> <br />
          {isQuizSubmited && (
            <div className="mt-10 font-bold text-center flex flex-col gap-y-2 w-1/2 m-auto">
              <h1>Select name</h1>
              <div className="flex flex-col gap-y-2">
                {students.map((student) => (
                  <button
                    onClick={(e) => setChallengedStudent(student.data().name)}
                    key={student.id}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    {student.data().name}
                  </button>

                  // <option key={student.id}>{student.data().name}</option>
                ))}
              </div>
              <button onClick={handleChallengeSubmit}>Submit challenge</button>
            </div>
          )}
          <div />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
