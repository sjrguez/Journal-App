import React from 'react'
import Moment from 'moment'
import { activeNote } from '../../actions/notes'
import { useDispatch } from 'react-redux'
export const JournalEntry = (note) => {
    // body,title,date, id, url
    const noteDate = Moment(note.date)
    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch(
            activeNote(note.id, note)
        )
    }


    return (
        <div
            className="journal__entry pointer animate__animated animate__slideInLeft animate__faster"
            onClick={handleEntryClick}
        >
            {
                note.url &&
                (   <div
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${note.url})`
                        }}
                    ></div>
                )
                
            
            }

            <div className="journal__entry-body">
                <p className="journal__entry-tittle">
                    {note.title}
                </p>

                <p className="journal__entry-content">
                    { note.body }

                </p>
            </div>
                

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}