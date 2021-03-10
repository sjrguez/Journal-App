import { db } from "../firebase/firebase-config"



export const loadNotes = async (uid) => {
    try {
        const noteSnap = await db.collection(`${uid}/journal/notes`).get();
        const notes = [];
        noteSnap.forEach(hijo => {
            notes.push({...hijo.data(), id: hijo.id});
        })
        return notes;
    } catch (error) { } 
}