// =========================================================
// REYWALKER NOTES — FIREBASE
// =========================================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const notesRef = doc(db, "notes", "reywalkerNotes");

export async function saveNotesToFirebase(notes) {
    await setDoc(notesRef, {
        notes: notes
    });
}

export async function loadNotesFromFirebase() {

    const noteDoc = await getDoc(notesRef);

    if (!noteDoc.exists()) {
        return null;
    }

    const data = noteDoc.data();

    return Array.isArray(data.notes)
        ? data.notes
        : [];
}