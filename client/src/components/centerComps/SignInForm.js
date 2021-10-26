import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
        await sleep(500);
        //let vals = JSON.stringify(values,0,3);
        setSubmitting(true);
        
        await axios.get('http://localhost:9000/login', {
            username: values.username,
            password: values.password
        })
        .then((res) => {
            values.username = "";
            values.password = "";
        })
        .catch((err) => console.log(err));
        console.log(values);
    },
  });

  return (
    <div>
        <Typography component="h1" variant="h4">
                Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="username"
                name="username"
                label="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit" >
                Submit
            </Button>
        </form>
    </div>
  );
};


export default SignInForm;