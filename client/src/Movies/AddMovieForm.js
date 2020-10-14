import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialValues = {
    title: '',
    director: '',
    metascore: '0',
    stars: []
};

const AddMovieForm = ({ insertMovie }) => {
    const [formValues, setFormValues] = useState(initialValues);

    const { push } = useHistory();

    const handleChanges = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
        console.log(formValues);
    };

    const addMovie = () => {
        insertMovie(formValues);
    };

    const handleSubmit = e => {
        e.preventDefault();

        addMovie();
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