import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeletingNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const {active: note} = useSelector(state => state.notes)
    // const [note, setNote] = useState(note)
    const [formValues, handleInputChange, reset] = useForm(note)
    const {body, title} = formValues;
    
    const activeId = useRef(note.id)

    useEffect(() => {
            if(activeId.current !== note.id) {
                reset(note)
                activeId.current = note.id;
            }
    }, [note, reset])


    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}) )

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(
            startDeletingNote(activeId.current)
        )
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes_title-input"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>


                {
                    note.url &&
                    (
                        <div className="notes_image">
                            <img 
                                src={note.url}
                                alt={title}
                            />
                        </div>
                    )
                }

            </div>

                {
                    activeId.current &&
                    (
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                                Eliminar nota

                        </button>

                    )
                }
        </div>
    )
}
