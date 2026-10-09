import { db } from "./firebase.js";
import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// =====================================
// SAVE FUNDS DATA
// =====================================
export async function saveFundsData(fundsData) {


await setDoc(
    doc(db, "funds", "payments"),
    fundsData,
    { merge: true }
);


}

// =====================================
// LOAD FUNDS DATA
// =====================================
export async function loadFundsData() {


const docSnap = await getDoc(
    doc(db, "funds", "payments")
);

if (docSnap.exists()) {
    return docSnap.data();
}

return null;


}
