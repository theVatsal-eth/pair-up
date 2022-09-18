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
  updateDoc,
} from '@firebase/firestore';

interface Props {
  challenges: QueryDocumentSnapshot<DocumentData>[];
  studentName: string;
}

const Challenge: React.FC<Props> = ({ challenges, studentName }) => {
  const [question, setQuestion] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number | null>(null);
  const [option, setOption] = useState<String>('');
  const [challangeAlret, setChallengeAlert] = useState<boolean>(true);
  const [acceptChallenge, setAcceptChallenge] = useState<boolean>(false);
  const [solvingAlert, setSolvingAlert] = useState<String>('');

  const questionCollection = collection(firestore, 'questions');
  useEffect(() => {
    loadQuestion();
  }, [acceptChallenge]);

  useEffect(() => {
    if (score !== null) {
      const completeChallange = async () => {
        const _challenge = doc(firestore, `challenges/${challenges[0].id}`);

        // update the doc by setting done to true
        await updateDoc(_challenge, {
          status: 'done',
          toScore: score,
        });
      };

      completeChallange();
      if (score !== null) {
        console.log(challenges[0].data().fromScore);
        console.log(score);
        if (score > parseInt(challenges[0].data().fromScore)) {
          setSolvingAlert('congratulation you won');
          console.log('you can now increment value on the blockchain');
        } 
        else if (score == parseInt(challenges[0].data().fromScore)) {
          setSolvingAlert("It was a tie!");
        }
        else {
          setSolvingAlert('opps you lose');
        }
      }
    }
  }, [score]);

  // const selectedOption = (e) => {
  //   console.log(e.target.value);
  // };

  const solveChallange = async () => {
    if (option == question[0].data().correct) {
      setScore(100);
    } else {
      setScore(0);
    }
  };

  const loadQuestion = async () => {
    if (challenges[0]) {
      const questionQuery = query(
        questionCollection,
        where('__name__', '==', challenges[0].data().questionId),
        limit(1)
      );
      const querySnapshot = await getDocs(questionQuery);
      const result: QueryDocumentSnapshot<DocumentData>[] = [];
      querySnapshot.forEach((snapshot) => {
        result.push(snapshot);
      });

      setQuestion(result);
    }
  };

  const onAcceptChalleng = () => {
    setChallengeAlert(false);
    setAcceptChallenge(true);
  };

  const onRejectChallange = () => {
    setChallengeAlert(false);
  };

  return (
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      {challangeAlret && (
        <div
          id="alert-border-1"
          className="flex p-4 mb-4 bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200"
          role="alert">
          <svg
            className="flex-shrink-0 w-5 h-5 text-blue-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"></path>
          </svg>

          <div className="ml-3 text-sm font-medium text-blue-700">
            Hey <span className="font-semibold"> {studentName} </span> you are
          </div>

          <button
            type="button"
            onClick={onRejectChallange}
            className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8"
            data-dismiss-target="#alert-border-1"
            aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <button
            type="button"
            onClick={onAcceptChalleng}
            className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8"
            data-dismiss-target="#alert-border-1"
            aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
        </div>
      )}
      {solvingAlert.length > 0 && (
        <div
          id="alert-border-1"
          className="flex p-4 mb-4 bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200"
          role="alert">
          <svg
            className="flex-shrink-0 w-5 h-5 text-blue-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"></path>
          </svg>

          <div className="ml-3 text-sm font-medium text-blue-700">
            {solvingAlert}
          </div>

          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8"
            data-dismiss-target="#alert-border-1"
            aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      )}
      {acceptChallenge && (
        <div className="mt-10 font-bold text-center flex flex-col gap-y-2 w-1/2 m-auto">
          {/* <form onSubmit={handleQuizSubmit}> */}
          <h1>Quiz</h1>
          {question &&
            question.map((data) => (
              <div key={data.id} className="flex flex-col gap-y-2">
                <h3>{data.data().value}</h3>
                {data.data().answers &&
                  data.data().answers.map((answer: string) => (
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
          <button onClick={solveChallange}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Challenge;
