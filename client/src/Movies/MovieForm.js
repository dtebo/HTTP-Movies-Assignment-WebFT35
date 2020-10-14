import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Movies.css';

const initialValues = {
    title: '',
    director: '',
    metascore: '0',
    stars: [],
    error: ''
};

const MovieForm = props => {
    const [formValues, setFormValues] = useState(initialValues);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                console.log('MovieForm: DT: useEffect: ', res);
            })
            .catch(err => console.error('MovieForm: DT: useEffect: Error: ', err));
    }, []);

    const handleChanges = e => {

    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <>
            <form 
                className='movie-form'
                onSubmit={handleSubmit}
            >
                <section className='form-group'>
                    <label htmlForm='title'>Title</label>
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
            </form>
        </>
    );
};

export default MovieForm;