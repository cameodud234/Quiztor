import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

let val = null;

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

function SignUpForm() {
  return(
    <div>
        <h1>Sign Up</h1>
        <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
        }}
        onSubmit={async (values) => {
            await sleep(500);
            let tmp = JSON.stringify(values, null, 2)
            for(let i in values){
                let tmp = i;
                if(i == "firstName") val = values[i];
            }
            alert(tmp);
            console.log(val);
        }}
        >
        {({ isSubmitting }) => (
            <Form>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" placeholder="Jane" />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="jane@acme.com" type="email" />

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
            </Form>
        )}
        </Formik>
    </div>
  );
}

export default SignUpForm;