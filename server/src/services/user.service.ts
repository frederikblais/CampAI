import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, setDoc } from "@firebase/firestore"
import { db } from "../database/firestore"
import * as bcrypt from 'bcrypt';
import { getDocs, query, where } from "firebase/firestore";
const userCollection = collection(db, 'users')

export async function createUser(userInfo) {
    const result = await addDoc(userCollection, userInfo)
    console.log('result: ', result);
}

export async function upsertUser(userInfo, userId?: string) {
    const randomId = Math.floor(Math.random() * 100000).toString()
    userId = userId || randomId
    const userRef = await doc(db, 'users', userId)

    // deal with the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt)
    userInfo.password = hashedPassword;

    await setDoc(userRef, userInfo)
    return userId;
}

async function findUsersByUsername(username): Promise<DocumentData[]> {
    const userNameQuery = query(userCollection, where("username", "==", username))
    const userDocs = await getDocs(userNameQuery)
    if (userDocs) {
        let users: DocumentData[] = [];
        userDocs.forEach((user) => {
            users.push(user.data())
        })
        return users;
    } else return [];
}

export async function authenticate(username: string, password: string): Promise<boolean> {

    const users = await findUsersByUsername(username);
    if(users.length !== 1) return false;
    else {
        const user = users[0];
        const resultCompare = await bcrypt.compare(password, user.password)
        return resultCompare;
    }

}

export async function updateUser(userInfo, userId: string): Promise<string> {
    const userRef = await doc(db, 'users', userId)
    await setDoc(userRef, userInfo, { merge: true })
    return userId;
}

export async function readUserById(userId: string) {
    console.log('Reading user')
    const userRef = await doc(db, 'users', userId);
    const userDocument = await getDoc(userRef);
    if (userDocument.exists()) {
        return userDocument.data()
    }
    return null;
}

export async function deleteUser(userId: string) {
    const userRef = await doc(db, 'users', userId);
    await deleteDoc(userRef);
    return userId;
}