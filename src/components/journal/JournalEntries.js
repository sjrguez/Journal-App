import React from 'react'
import { useSelector } from 'react-redux'
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {
    const { notes } = useSelector(state => state.notes)

    return (
        <div className="journal_entries">
            {
                notes.map(entry => (
                    <JournalEntry key={entry.id} {...entry} />
                ))
            }            
        </div>
    )
}
