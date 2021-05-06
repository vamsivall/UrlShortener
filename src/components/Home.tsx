import React, { useRef, useState } from "react";
import { Container, Typography, Grid, Button, makeStyles, Paper, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {shortenUrl} from "../Utils/UrlHandler";
// @ts-ignore  
import HeroBackground from '../assets/bg.jpg';

const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroBackground})`,
      height: '50%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      color: '#eceff1',
      minHeight: '450px'
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    shortenerPanel: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 2),
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        overflow:'hidden'
    },
    alertLocation: {
        marginTop:'15px'
    }
  }));


const Home: React.FC = () => {
    const [isShortened, setIsShortened] = useState(false);
    const [showError, setShowError] = useState(false);
    const classes = useStyles();
    const shortenerInputRef = useRef(null);
    const buttonRef = useRef(null);

    const triggerButtonClick = () => {
        if (!isShortened) {
            shortenUrl((shortenerInputRef.current as any).value).then(result => {
                (shortenerInputRef.current as any).value = result;
                setIsShortened(true);
            }).catch(error => {
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
            })
        } else {
            navigator.clipboard.writeText((shortenerInputRef.current as any).value);
        }
    }

    const urlChanged = (event) => {
        if (event.target.value == '')
            setIsShortened(false);
    }

    return (
        <React.Fragment>
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    <Typography component="h1" variant="h2" align="center" gutterBottom>
                    Shorter Links, Easier to share
                    </Typography>
                    <Typography variant="h5" align="center" paragraph>
                    This url-shortener won't quite revolutionize url sharing as we know it, but it will impress Vamsi's future teammates at STORD. 
                    And that's quite the achievement for a little app!
                    </Typography>
                    
                </Container>
            </div>
            <Paper elevation={3} className={classes.shortenerPanel}>
                <Grid container spacing={2} justify="center" alignContent="center" alignItems="center">
                    <Grid item md={9} xs={9}>
                        <TextField id="outlined-basic" label="URL to Shorten" variant="outlined" fullWidth inputRef={shortenerInputRef} onChange={urlChanged} /> 
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <Button variant="contained" color="primary" ref={buttonRef} onClick={triggerButtonClick}>
                            {!isShortened ? 'Shorten' : 'Copy' }
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            
            {showError && (
                <Container fixed>
                    <Alert severity="error"className={classes.alertLocation}>Please enter a valid URL and try again</Alert>
                </Container>)}
        </React.Fragment>
    );
}

export default Home;