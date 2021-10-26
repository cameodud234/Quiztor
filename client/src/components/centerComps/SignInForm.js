import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    spacing: {
        padding: 10,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
);

function SignInForm() {

    const classes = useStyles();

    return (
        <div>
            <Typography component="h1" variant="h4">
                Sign in
            </Typography>
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
                    axios.get('http://localhost:9000/signup', {
                        username: values.username,
                        email: values.email,
                        password: values.password
                    })
                    .then((res) => console.log(`logger: ${res.data}`))
                    .catch(err => console.log(err));
                }}
                >
                {({ isSubmitting }) => (
                    
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid> */}
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default SignInForm;