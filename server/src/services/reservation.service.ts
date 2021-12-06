import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, setDoc } from "@firebase/firestore"
import { getDocs } from "firebase/firestore";
import { db } from "../database/firestore"
const reservationCollection = collection(db, 'reservations')

export async function createReservation(reservationInfo) {
    const result = await addDoc(reservationCollection, reservationInfo);
}

export async function getReservation() {
    var data: any [] = []
    const querySnapshot = await getDocs(collection(db, 'reservations'));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
    });
    return data;
}

export async function deleteReservation(reservationID: string) {
    const reservationRef = await doc(db, 'reservations', reservationID);
    await deleteDoc(reservationRef);
    return reservationID;
}
