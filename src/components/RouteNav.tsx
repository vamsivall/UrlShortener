import React, { useEffect, useRef} from "react";
import { useHistory, useParams } from "react-router-dom";
import { getOriginalUrl,INVALID_SLUG,URL_INVALID,SLUG_NOTFOUND } from "../Utils/UrlHandler";
import { Container, LinearProgress, Typography, makeStyles  } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  redirectContainer: {
    position: 'absolute',
    left: 'calc(100vw - 1400px)',
    top: '50%',
  }
}));


interface IParamTypes {
  slug: string;
}

const RouteNav = () => {
  const classes = useStyles();
  const contentRef = useRef(null);
  const { slug } = useParams<IParamTypes>();
  const history = useHistory();

  
  useEffect(() => {
    getOriginalUrl(slug).then(result => {
        window.location.replace(result);
    }).catch(error => {
        switch (error) {
            case INVALID_SLUG:
            case SLUG_NOTFOUND:
            default:
              (contentRef.current as any).textContent = "Looks like we couldnt find that. Sending you back ...";
                break;
        }

        setTimeout(() => {
          history.push("/")
        },2000);
    })
  });
  return (
    <Container maxWidth="md" className={classes.redirectContainer} >
      <Typography component="h5" variant="h5" align="center" gutterBottom  ref={contentRef}>
        Redirecting...
      </Typography>
      <LinearProgress />
    </Container>
  );
}

export default RouteNav;
