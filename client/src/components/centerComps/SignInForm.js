import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    spacing: {
        padding: 10,
    }
}));

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

function SignInForm() {

    // useEffect(()=>{
    //     function callAPI() {
    //         fetch("http://localhost:9000/reactAPI").then
    //     }
    // });

    return (
        <div>
            <h1>Sign In</h1>
            <Formik
            initialValues={{ username: '', password: '' }}
            validate={values =>{
                const errors = {};
                // place errors in string here...
            }}
            onSubmit={async (values, { setSubmitting }) => {
                await sleep(500);
                let tmp = JSON.stringify(values, null, 2);
                alert(tmp);
                setSubmitting(true);
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field type="username" name="username" />
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