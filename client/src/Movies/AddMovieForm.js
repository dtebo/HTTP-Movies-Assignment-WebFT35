import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialValues = {
    title: '',
    director: '',
    metascore: 0,
    stars: ","
};

const AddMovieForm = ({ insertMovie, setMovieList }) => {
    const [formValues, setFormValues] = useState(initialValues);

    const { push } = useHistory();

    const handleChanges = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
        console.log(formValues);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newMovie = {
            ...formValues,
            stars: formValues.stars.split(","),
        };

        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                console.log('AddMovieForm: handleSubmit: DT: ', res);
                
                setMovieList(res.data);
                
                push('/');
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
                        type='number'
                        id='metascore'
                        name='metascore'
                        value={parseInt(formValues.metascore)}
                        onChange={handleChanges}
                    />
                </section>
                <button>Add</button>
            </form>
        </>
    )
};

export default AddMovieForm;