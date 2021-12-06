import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, setDoc } from "@firebase/firestore"
import { getDocs, updateDoc } from "firebase/firestore";
import { db } from "../database/firestore"
const reservationCollection = collection(db, 'reservations')

// Create a new reservation
export async function createReservation(reservationInfo) {
    const result = await addDoc(reservationCollection, reservationInfo);
}

// Get all reservations
export async function getReservation() {
    var data: any [] = []
    const querySnapshot = await getDocs(collection(db, 'reservations'));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.id, doc.data());
    });
    return data;
}

// Get a specific reservation by ID
export async function getReservationID(reservationID: string) {
    var data: any;
    const querySnapshot = await getDocs(collection(db, 'reservations'));
    querySnapshot.forEach((doc) => {
        if (doc.id === reservationID) {
            console.log(doc.id, " => ", doc.data());
            data = doc.data();
            console.log('Data: ' ,data);
        }
    });
    return data;
}

// Delete a reservation by ID
export async function deleteReservation(reservationID: string) {
    const reservationRef = await doc(db, 'reservations', reservationID);
    await deleteDoc(reservationRef);
    return reservationID;
}

// Put a reservation by ID
export async function putReservation(reservationID: string, reservationInfos) {
    const reservationRef = await doc(db, 'reservations', reservationID);

    // Add a new reservation to the "reservation" array.
    await updateDoc(reservationRef, reservationInfos)

    return reservationID;
}
