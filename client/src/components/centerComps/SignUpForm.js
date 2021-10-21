import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';


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
    const [userData, setUserData] = useState();

    useEffect(() => {

        function sendUserData() {
          fetch("http://localhost:9000/reactAPI")
            .then(res => res.text())
              .then(res => { setUserData(res); });
        }
    
        sendUserData();
    
    });

    return(
        <div>
            <h1>Sign Up</h1>
            <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={async (values) => {
                await sleep(500);
                let tmp = JSON.stringify(values, null, 3);
                console.log(tmp);
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field name="username" placeholder="username"/>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" placeholder="jane@acme.com" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" placeholder="Password" type="password" />
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