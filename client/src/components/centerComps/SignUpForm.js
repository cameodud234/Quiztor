import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    spacing: {
        padding: 10,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
    margin: theme.spacing(3, 0, 2),
    },
}));

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

function SignUpForm() {

    const classes = useStyles();

    return(
        <div>
            <Typography component="h1" variant="h4">
                Sign up
            </Typography>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
                validate={values => {
                    const errors = {};
                    if (values.username == ''){
                        errors.username = 'Required';
                    }
                    if(values.password == ''){
                        errors.password = 'Required';
                    }
                    if (!values.email) {
                    errors.email = 'Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    await sleep(500);
                    setSubmitting(true);
                    await axios.post('http://localhost:9000/signup', {
                        username: values.username,
                        email: values.email,
                        password: values.password
                    })
                    .then((response) => console.log(response))
                    .catch((err) => err.status(401).send());
                }}
                >
                {({ isSubmitting }) => (
                    <Form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid> */}
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    className={classes.submit}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Form>
            )}

            </Formik>
    </div>
  );
}

export default SignUpForm;