import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    spacing: {
        padding: 10,
    }
}));

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

function SignInForm() {

    const classes = useStyles();

    return (
        <div>
            <h1>Sign In</h1>
            <Formik
            initialValues={{ username: '', password: '' }}
            validate={values =>{
                const errors = {};
                if(values.username == ''){
                    errors.username = 'Required';
                }
                if(values.password == ''){
                    errors.password = 'Required'
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                await sleep(500);
                setSubmitting(true);
                axios.get('http://localhost:3001/users', {
                    username: values.username,
                    // email: values.email,
                    password: values.password
                }).then((response) => console.log(response)).catch(err => console.log(err));
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field type="username" name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password" name="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                
                
                
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
            </Formik>
        </div>
    );
}

export default SignInForm;