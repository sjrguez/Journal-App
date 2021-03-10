import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import { Types } from "../types/types"
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

        dispatch(
            activeNote(doc.id, newNote)
        )

        dispatch(
            addNewNote(doc.id, newNote)
        )
    }
}

export const activeNote = (id, note) => {
    return {
        type: Types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}


export const addNewNote = (id, note) => {
    return {
        type: Types.notesAddNew,
        payload: {
            id,
            ...note
        }
    }
}


export const startLoadingNotes = (id) => {
    return async  (dispatch) => {
        const notes = await loadNotes(id);
        dispatch(
            setNotes(notes)
        )

    }
}

export const setNotes = (notes) => {
    return {
        type: Types.notesLoad,
        payload: notes
    }
}


export const startSaveNote = (note) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth

        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        if(!note.url) delete note.url;
        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore)
            Swal.fire('Saved', note.title, 'success')
            
            dispatch(
                refreshNote(note)
            )
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
        
    }
}


export const refreshNote = (note) => {
    return {
        type: Types.notesUpdated,
        payload: {
            ...note
        }
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {

        Swal.fire({
            title: "Uploading...",
            text: "Please wait...",
            allowOutsideClick: false,
            onBeforeOpen: () =>{
                Swal.showLoading()
            },
            showConfirmButton: false

        })
        const { active:activeNote } = getState().notes

        try {
            const fileUrl = await fileUpload(file);
            activeNote.url = fileUrl
            dispatch(
                startSaveNote(activeNote)
            )
        } catch (error) {
            
        } finally {
            Swal.close()
        }


    }
}

export const startDeletingNote = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        try {
            await db.doc(`${uid}/journal/notes/${id}`).delete();
            dispatch(
                deleteNote(id)
            )
            
            Swal.fire({
                title: "Deleted!",
                icon: "success"
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteNote = (id) => {
    return {
        type: Types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return {
        type: Types.notesLogoutCleaning
    }
}