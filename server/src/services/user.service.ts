import { collection, doc, DocumentData, getDoc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "../database/firestore";
import * as bcrypt from 'bcrypt'
import { userRouter } from "../routers/user.router";
const userCollection = collection(db, 'Users')

export async function createDog(dogInfo: any) {
    const result = await addDoc(userCollection, dogInfo)
    console.log('result: ', result)
}

export async function upsertUser(userInfo, userId?:string): Promise<string> {
    const randomID = (Math.floor(Math.random()*100000).toString())
    userId = userId || randomID
    const userRef = await doc(db, 'Users', userId)

    // deal with password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);
    userInfo.password = hashedPassword;

    const result = await setDoc(userRef, userInfo)
    return userId;
}

async function findUsersByUsername(username): Promise<DocumentData[]> {
    const userNameQuery = query(userCollection, where("username", "==", username))
    const userDocs = await getDocs(userNameQuery)
    if(userDocs) {
        let users: DocumentData[] = [];
        userDocs.forEach((user) => {
        users.push(user.data())
        })
        return users;
    } else return [];
}

export async function authenticate(username:string, password:string): Promise<boolean> {
    const users = await findUsersByUsername(username);
    if(users.length !== 1)return false
    else{
        const user = users[0]
        const resultCompare = await bcrypt.compare(password, user.password)
        return resultCompare;
    }
}

export async function readUserById(userId:string) {
    console.log('Reading User');
    const userRef = await doc(db, 'Users', userId);
    const userDocument = await getDoc(userRef);
    if(userDocument.exists()) {
        return userDocument.data()
    }
    return null;
}