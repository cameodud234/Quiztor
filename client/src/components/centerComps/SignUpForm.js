import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';


const useStyles = makeStyles(() => ({
    spacing: {
        padding: 10,
    }
}));

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

function SignUpForm() {

    const classes = useStyles();

    return(
        <div>
            <h1>Sign Up</h1>
            <Formik
            initialValues={{
                username: '',
                // email: '',
                password: ''
            }}
            validate={values => {
                const errors = {};
                if (values.username || values.password == ""){
                    errors.username = 'Required';
                    errors.password = 'Required';
                }
                // if (!values.email) {
                // errors.email = 'Required';
                // } else if (
                // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                // errors.email = 'Invalid email address';
                // }
                return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await sleep(500);
                // let tmp = JSON.stringify(values, null, 3);
                setSubmitting(true);
                axios.post('http://localhost:3001/users', {
                    username: values.username,
                    // email: values.email,
                    password: values.password
                })
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field name="username" placeholder="username"/>
                        <ErrorMessage name="username" component="div" />
                    </div>

                    {/* <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" placeholder="jane@acme.com" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div> */}

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" placeholder="Password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    {/* <div>
                        <label htmlFor="password_match">Match Password</label>
                        <Field name="password_match" placeholder="Match Password" type="password" />
                    </div> */}

                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </Form>
            )}

        </Formik>
    </div>
  );
}

export default SignUpForm;