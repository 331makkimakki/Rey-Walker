import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


// SAVE SERVICE DATA
export async function saveServiceData(tabName, tableData){

    await setDoc(
        doc(db, "services", tabName),
        {
            table: tableData
        }
    );

}


// LOAD SERVICE DATA
export async function loadService(tabName){

    const docSnap = await getDoc(
        doc(db, "services", tabName)
    );

    if(docSnap.exists()){

        return docSnap.data().table;

    }

    return null;

}