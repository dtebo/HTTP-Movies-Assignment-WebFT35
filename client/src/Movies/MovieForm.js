import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import './Movies.css';

const initialValues = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
};

const MovieForm = props => {
    const [formValues, setFormValues] = useState(initialValues);
    const params = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                console.log('MovieForm: DT: useEffect: ', res);

                setFormValues(res.data);
            })
            .catch(err => console.error('MovieForm: DT: useEffect: Error: ', err));
    }, []);

    const handleChanges = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, formValues)
            .then(res => {
                console.log('movieForm: handleSubmit: DT: ', res);

                push(`/movies/${params.id}`);
            })
            .catch(err => console.error('MovieForm: handleSubmit: Error: DT: ', err));
    };

    return (
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
                <button>Update</button>
            </form>
        </>
    );
};

export default MovieForm;