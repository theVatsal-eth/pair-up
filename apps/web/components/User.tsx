import { addDoc, collection, DocumentData, getDocs, limit, query, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';
import Quiz from './Quiz';

const User = () => {

    const [userNameList, setUserNameList] = useState<string[]>([])
    const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const studentsCollection = collection(firestore, 'students');

    const address = useAddress()

    useEffect(() => {
        getFriends().then(() => console.log("Calling frens first!"))
        const userNameList: string[] = []
        users.forEach((user) => {
            console.log("setting users")
            userNameList.push(user.data().name)
        })
        setUserNameList(userNameList)
        console.log(userNameList, "first")
    }, [])

    useEffect(() => {
        getFriends().then(() => console.log("Calling frens first!"))
        const userNameList: string[] = []
        users.forEach((user) => {
            console.log("setting users")
            userNameList.push(user.data().name)
        })
        setUserNameList(userNameList)
        console.log(userNameList, "first")
    }, [address])

    

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
            setUsers(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (address && userNameList.length > 0) {
            getFriends().then(() => { console.log("Frens are here!") })
            console.log(userNameList, "second")
            if (!userNameList.includes(address)) {
                const data = {
                    name: address,
                }
                addDoc(studentsCollection, data)
                    .then(() => {
                        console.log("Done!")
                    })
            }
        }
    }, [address, userNameList])

    if (address) {
        return (
            <>
                <Quiz studentName={address} />
            </>
        )
    }

    return (
        <ConnectWallet accentColor="#6A67E5" colorMode="dark" />
    )

}

export default User