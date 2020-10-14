import React, { useState, useEffect } from 'react';
import MovieForm from './MovieForm';

import axios from 'axios';

const initialValues = {
    title: '',
    director: '',
    metascore: '0',
    error: ''
};

const AddMovieForm = props => {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChanges = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/api/movies`. formValues)
            .then(res => {
                console.log('AddMovieForm: handleSubmit: DT: ', res);
            })
            .catch(err => console.error('AddMovieForm: handleSubmit: Error: DT: ', err));
    };

    return(
        <>
            <form 
                className='movie-form'
                onSubmit={handleSubmit}
            >
                <section className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <label htmlFor='director'>Director</label>
                    <label htmlFor='metascore'>MetaScore</label>
                </section>
                <section className='form-group'>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={formValues.title}
                        onChange={handleChanges}
                    />
                    <input
                        type='text'
                        id='director'
                        name='director'
                        value={formValues.director}
                        onChange={handleChanges}
                    />
                    <input
                        type='text'
                        id='metascore'
                        name='metascore'
                        value={formValues.metascore}
                        onChange={handleChanges}
                    />
                </section>
                <button>Add</button>
            </form>
        </>
    )
};

export default AddMovieForm;