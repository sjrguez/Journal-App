import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch()
    const {active: note} = useSelector(state => state.notes)
    const noteDate = moment(note.date)

    const handleSave = () => {
        dispatch(
            startSaveNote(note)
        )
    }


    const handlePicctureClick = () => {
        document.querySelector("#fileSelector").click();

    }

    const handleFileChange = ({target}) => {
        console.log({file: target.files});
        const file = target.files[0];
        
        if(!file) return;
        dispatch(
            startUploading(file)
        )

    }
    
    return (
        <div className="notes_appbar">
            <span>{noteDate.format('MMMM Do YYYY')}</span>
            <input 
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={ handleFileChange }
                id="fileSelector"
            />
            <div>
                <button
                    className="btn"
                    onClick={handlePicctureClick}
                >Picture</button>

                <button
                    className="btn"
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
    )
}
