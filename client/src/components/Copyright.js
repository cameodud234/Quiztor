import { Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      color: "#cfe8fc",
    },
  }));

function Copyright() {

    const classes = useStyles();

    return (
      <Typography variant="body2" color="textSecondary" align="center" className={classes.root}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/cameodud234/Quiztor">
          Quiztor
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Copyright;