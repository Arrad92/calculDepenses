import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Divider, Typography, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { Link,useHistory } from 'react-router-dom';
import { Field, Form, useForm } from 'react-final-form';

import Logo from './../../assets/images/exphandle.png';
import { AuthenticationService } from '../../services/auth.service';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.black,
        height: '100vh',
        minHeight: '100%',
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    card: {
        overflow: 'visible',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
            width: '50%',
        },
        maxWidth: '475px',
        margin: '24px auto',
    },
    content: {
        padding: theme.spacing(5, 4, 3, 4),
    },
    forgot: {
        textDecoration: 'none',
        paddingLeft: '16px',
    },
    margin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
}));


const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const signIn = (values)=>{
        AuthenticationService().login(values.username,values.password).then((res)=>{
            dispatch({type:'login'});
            history.push("/dashboard/default");
            
        }).catch((err)=>{
            setError('Incorrect login or password');
        });
    }

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={11} sm={7} md={6} lg={4}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Grid container direction="column" spacing={4} justify="center">
                            <Grid item xs={12}>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Typography color="textPrimary" gutterBottom variant="h2">
                                            Sign in
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{color:'red'}}>
                                            {error}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <RouterLink to="/" className={classes.icon}>
                                            <img alt="Auth method" src={Logo} style={{width:'170px'}} />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Form onSubmit={signIn}>
                                    {({
                                        handleSubmit,
                                        invalid,
                                        submitErrors,
                                        errors,
                                        touched,
                                        ...otherProps
                                         })=>(
                                            <form onSubmit={handleSubmit}>
                                                <Field name="username">
                                            {({ input, meta }) => (
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                label="Email Address / Username"
                                                margin="normal"
                                                name="username"
                                                type="text"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                            />
                                            )}
                                            </Field>
                                            <Field name="password">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Password"
                                                margin="normal"
                                                name="password"
                                                type="password"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                            <Divider />
                                            <Button
                                                type="submit"
                                            >
                                                Sign in
                                            </Button>
                                            </form>
                                    )}
                                </Form>
                            </Grid>
                            
                            
                        </Grid>
                        
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Login;
