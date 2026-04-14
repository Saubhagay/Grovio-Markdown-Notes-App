import { useState, useEffect, useRef } from 'react';
import * as api from '../services/api';

export const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [saveStatus, setSaveStatus] = useState('Saved');
    const saveTimeoutRef = useRef(null);
    const lastSavedSignatureRef = useRef('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const data = await api.getNotes();
        setNotes(data);
    };

    const addNote = async () => {
        const newNote = { title: 'New Note', content: '' };
        const created = await api.createNote(newNote);
        const createdNote = { id: created.id, ...newNote };

        setNotes((prev) => [createdNote, ...prev]);
        setCurrentNote(createdNote);
        lastSavedSignatureRef.current = JSON.stringify(createdNote);
        setSaveStatus('Saved');
    };

    const updateCurrentNote = (note) => {
        setCurrentNote(note);
        setSaveStatus('Unsaved changes');
        setNotes((prev) => prev.map((item) => (item.id === note.id ? note : item)));
    };

    const deleteNoteById = async (id) => {
        await api.deleteNote(id);
        setNotes((prev) => prev.filter((note) => note.id !== id));
        if (currentNote?.id === id) setCurrentNote(null);
    };

    const selectNote = (note) => {
        setCurrentNote(note);
        lastSavedSignatureRef.current = JSON.stringify(note);
        setSaveStatus('Saved');
    };

    useEffect(() => {
        if (!currentNote?.id) return undefined;

        const signature = JSON.stringify(currentNote);
        if (signature === lastSavedSignatureRef.current) {
            setSaveStatus('Saved');
            return undefined;
        }

        setSaveStatus('Saving...');
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(async () => {
            try {
                await api.updateNote(currentNote.id, currentNote);
                lastSavedSignatureRef.current = signature;
                setSaveStatus('Saved');
            } catch (error) {
                setSaveStatus('Save failed');
            }
        }, 600);

        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [currentNote]);

    return {
        notes,
        currentNote,
        saveStatus,
        fetchNotes,
        addNote,
        updateCurrentNote,
        deleteNoteById,
        selectNote,
    };
};