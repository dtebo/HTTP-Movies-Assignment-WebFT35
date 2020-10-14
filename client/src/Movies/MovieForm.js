import React, { useState, useEffect } from 'react';

const initialValues = {
    title: '',
    director: '',
    metascore: 0,
    stars: [],
    error: ''
};

const MovieForm = props => {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChanges = e => {

    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <>
            <h1>MovieForm here...</h1>
        </>
    );
};

export default MovieForm;