// TutorFunctions.js

export const handleEdit = (id, tutors, setEditedTutor) => {
    const tutorToEdit = tutors.find(tutor => tutor.id === id);
    setEditedTutor({ ...tutorToEdit });
};

export const handleSave = (editedTutor, tutors, setTutors, setEditedTutor) => {
    const updatedTutors = tutors.map(tutor => {
        if (tutor.id === editedTutor.id) {
            return { ...editedTutor, isEditing: false };
        }
        return tutor;
    });
    setTutors(updatedTutors);
    // Call API to update database with the edited tutor information
    setEditedTutor(null);
};

export const handleDelete = (id, tutors, setTutors) => {
    const updatedTutors = tutors.filter(tutor => tutor.id !== id);
    setTutors(updatedTutors);
    // Call API to delete tutor from the database
};

export const handleChange = (e, editedTutor, setEditedTutor) => {
    setEditedTutor({ ...editedTutor, [e.target.name]: e.target.value });
};
