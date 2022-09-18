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
import Challenge from '../pages/challenge';

interface Props {
  studentName: string;
}

const Quiz: React.FC<Props> = ({ studentName }) => {
  const [question, setQuestion] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [isChallenged, setIsChallenged] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [questionId, setQuestionId] = useState<string>('');
  const [option, setOption] = useState<string>('');
  const [challengedStudent, setChallengedStudent] = useState<string>();
  const [isQuizSubmited, setIsQuizSubmited] = useState<boolean>(false);
  const [level, setLevel] = useState<'easy' | 'medium' | 'hard' | undefined>()

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

  const handleQuizSubmit = (challenge: boolean = false) => {
    if (option.length === 0) {
      console.log('exiting the function')
      return
    }
    setIsQuizSubmited(true);

    if (!challenge) {
      loadQuestion(level)
    }
    let correctAnswer = '';

    console.log(correctAnswer);
    if (option == question[0].data().correct) {
      setScore(100);
    } else {
      setScore(0);
    }
  };

  const handleChallengeSubmit = async () => {
    console.log('clicked challenge');
    if (question[0]) {
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

  const loadQuestion = async (level: 'easy' | 'medium' | 'hard' | undefined) => {

    if (!level) return

    console.log('click');
    setLevel(level)
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
    <div className='flex flex-col items-center'>
      <span className='text-4xl font-bold mb-10'>Your Score: {score}</span>
      {!challengedStudent && !isQuizSubmited &&
        <>
          <span className='self-start'>
            Select a level:
          </span>
          <div className="w-full flex justify-around gap-8 text-2xl mt-2">

            <button
              className={`border border-indigo-500 p-5 rounded-xl ${level === 'easy' ? 'bg-indigo-500' : ''
                }`}
              onClick={() => loadQuestion('easy')}>
              Easy
            </button>
            <button
              className={`border border-indigo-500 p-5 rounded-xl ${level === 'medium' ? 'bg-indigo-500' : ''
                }`}
              onClick={() => loadQuestion('medium')}>
              Medium
            </button>
            <button
              className={`border border-indigo-500 p-5 rounded-xl ${level === 'hard' ? 'bg-indigo-500' : ''
                }`}
              onClick={() => loadQuestion('hard')}>
              Hard
            </button>
          </div>
        </>
      }


      {level && question && !isQuizSubmited && <div className="mt-10 font-bold text-center flex flex-col gap-2 w-full m-auto">
        <h1 className='text-2xl font-bold'>Quiz</h1>
        {question.map((data) => (
          <div key={data.id} className="flex flex-col gap-2 justify-center">
            <h3 className='font-medium self-start'>{data.data().value}</h3>
            {data.data().answers &&
              data.data().answers.map((answer: string) => (
                <button
                  onClick={(e) => setOption(answer)}
                  key={answer}
                  className={`border border-indigo-500 p-4 rounded-xl ${option === answer ? 'bg-indigo-500' : ''
                    } `}>
                  {answer}
                </button>

                // <option key={student.id}>{student.data().name}</option>
              ))}
          </div>
        ))}
        <div className='flex justify-around gap-2'>
          <button className='p-5 bg-indigo-500 self-start rounded-xl active:border-indigo-500' onClick={() => handleQuizSubmit()}>Submit</button>
          <button className='p-5 bg-indigo-500 self-start rounded-xl active:border-indigo-500' onClick={() => handleQuizSubmit(true)}>Submit &amp; Challenge</button>
        </div>

        <div />
      </div>}
      {isQuizSubmited && (
        <div className="mt-10 font-bold flex flex-col gap-2 m-auto">
          <h1>Select player: </h1>
          <div className="flex flex-col gap-y-2">
            {students.map((student) => (
              <button
                onClick={() => setChallengedStudent(student.data().name)}
                key={student.id}
                className={`font-semibold text-center p-4 border border-indigo-500 rounded-xl ${challengedStudent === student.data().name ? 'bg-indigo-500' : ''
                  }`}>
                {student.data().name}
              </button>

              // <option key={student.id}>{student.data().name}</option>
            ))}
          </div>
          <button className='p-5 self-center mt-4 rounded-xl bg-indigo-500 border border-indigo-500 active:bg-transparent' onClick={handleChallengeSubmit}>Submit challenge</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
