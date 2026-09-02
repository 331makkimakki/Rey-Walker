import { db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


// =========================
// SAVE SERVICE DATA
// =========================
export async function saveServiceData(tabName, tableData){

    await setDoc(
        doc(db, "services", tabName),
        {
            table: tableData
        }
    );

}


// =========================
// LOAD SERVICE DATA
// =========================
export async function loadService(tabName){

    const docSnap = await getDoc(
        doc(db, "services", tabName)
    );

    if(docSnap.exists()){

        return docSnap.data().table;

    }

    return null;

}


// =========================
// SAVE NMAX INFO
// =========================
export async function saveNmaxInfo(currentOdo, lastUpdated, summaryDate){

    await setDoc(
        doc(db, "nmax", "info"),
        {
            currentOdo: currentOdo,
            lastUpdated: lastUpdated,
            summaryDate: summaryDate
        },
        { merge: true }
    );

}

// =========================
// LOAD NMAX INFO
// =========================
export async function loadNmaxInfo(){

    const docSnap = await getDoc(
        doc(db, "nmax", "info")
    );

    if(docSnap.exists()){

        return docSnap.data();

    }

    return null;

}