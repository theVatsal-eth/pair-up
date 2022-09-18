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
import { useAddress, useMetamask } from '@thirdweb-dev/react';

interface Props {
  challenges: QueryDocumentSnapshot<DocumentData>[];
  studentName: string;
}

const Challenge: React.FC<Props> = () => {
  const [question, setQuestion] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [score, setScore] = useState<number | null>(null);
  const [option, setOption] = useState<string>('');
  const [challangeAlret, setChallengeAlert] = useState<boolean>(false);
  const [acceptChallenge, setAcceptChallenge] = useState<boolean>(false);
  const [solvingAlert, setSolvingAlert] = useState<string>('');
  const [challenges, setChallenges] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [doneChallenge, setDoneChallenge] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  const address = useAddress()
  const connect = useMetamask()

  const questionCollection = collection(firestore, 'questions');
  const challengesCollection = collection(firestore, 'challenges');

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    if (challenges.length > 0) {
      setChallengeAlert(true);
    }
  }, [challenges]);

  




  useEffect(() => {
    if (score !== null) {
      console.log('socre challage');
      console.log(score);
      const completeChallange = async () => { };

      completeChallange();
      if (score !== null && challenges[0]) {
        console.log(challenges[0].data().fromScore);
        console.log(score);
        if (score > parseInt(challenges[0].data().fromScore)) {
          setSolvingAlert('congratulation you won');
          console.log('you can now increment value on the blockchain');
        } else if (score < challenges[0].data().fromScore) {
          setSolvingAlert('opps you lose');
        } else if (score == challenges[0].data().fromScore) {
          setSolvingAlert('socre level');
        }
      }
    }
  }, [score]);

  useEffect(() => {
    const unsubscribed = onSnapshot(challengesCollection, (snapshot) => {
      setChallenges(
        // snapshot.docs.map((doc) => ({ id: doc.id, to: doc.data().to }))
        snapshot.docs.filter(
          (doc) =>
            doc.data().status == 'pending' && doc.data().to == address
        )
      );
      setChallengeAlert(true)

      console.log('hello khan', challenges);
    });

    const unsubscribedCompleted = onSnapshot(
      challengesCollection,
      (snapshot) => {
        setDoneChallenge(
          // snapshot.docs.map((doc) => ({ id: doc.id, to: doc.data().to }))
          snapshot.docs.filter(
            (doc) =>
              doc.data().status == 'done' && doc.data().from == address
          )
        );
        console.log('hello khan 2');
      }
    );

    return () => {
      unsubscribed();
      unsubscribedCompleted();
    };
  }, [address]);

  // const selectedOption = (e) => {
  //   console.log(e.target.value);
  // };

  const solveChallange = async () => {
    let _score = 0;
    if (option == question[0].data().correct) {
      console.log('correct');
      _score = 100;
      setScore(100);
    } else {
      _score = 0;
      console.log('wrong');

      setScore(0);
    }

    console.log('var value' + _score);

    const _challenge = doc(firestore, `challenges/${challenges[0].id}`);

    // update the doc by setting done to true
    await updateDoc(_challenge, {
      status: 'done',
      toScore: _score,
    });
  };

  const loadQuestion = async () => {
    if (true) {

      
      const questionQuery = query(
        questionCollection,
        where('__name__', '==', challenges[0].data().question_id),
        limit(1)
      );
      const querySnapshot = await getDocs(questionQuery);
      const result: QueryDocumentSnapshot<DocumentData>[] = [];
      querySnapshot.forEach((snapshot) => {
        result.push(snapshot);
      });

      console.log(result)

      setQuestion(result);
    }
  };

  const onAcceptChalleng = () => {
    loadQuestion()
    setChallengeAlert(false);
    setAcceptChallenge(true);
  };

  const onRejectChallange = () => {
    setChallengeAlert(false);
  };

  return (
    <div className="w-full p-40 h-screen">
      <span className='text-left text-3xl'>
        {
          challangeAlret ? 'Challenges you got:' : 'Challenges will show up here: '
        }
      </span>
      {challangeAlret  && (
        <div
          className="flex justify-around items-center gap-20 p-5 rounded-xl mt-10 border border-indigo-500 "
          role="alert">


          <div className="">
            Hey <span className="font-semibold"> {address} </span> you are challenged by abc
          </div>

          <div className='flex gap-28 justify-between'>
            <button
              type="button"
              onClick={onRejectChallange}
              className="bg-indigo-500 p-4 rounded-xl border border-indigo-500 active:bg-transparent"
              aria-label="Close">
              <span className="">Dismiss</span>
            </button>
            <button
              type="button"
              onClick={onAcceptChalleng}
              className="bg-indigo-500 p-4 rounded-xl border border-indigo-500 active:bg-transparent"
              aria-label="Close">
              <span className="">Accept</span>
            </button>

          </div>
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
      {acceptChallenge && question.length > 0 && (
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
