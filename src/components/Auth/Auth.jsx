import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container,TextField} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input'
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {signin,signup} from '../../actions/auth'


const Auth = () => {
    const classes = useStyles()
    const [isSignUp,setIsSignUp] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState= {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    }
    const [formData,setFormData] = useState(initialState)

    const handleSubmit= (e) =>{
        e.preventDefault()
        if(isSignUp){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const handleShowPassword = () => setShowPassword(!showPassword);
    const switchMode = () =>{
        setIsSignUp((prevIsSignUp)=> !prevIsSignUp)
        setShowPassword(false)
    }

    const googleFailure = (error) =>{
        console.log('Google sign in was unsuccessful. Try again.')
        console.log(error)
    }
    const googleSuccess = async (res) =>{
        console.log('SUCCESS')
        const result= res?.profileObj //evita error de que res no exista
        const token= res?.tokenId
        try{
            dispatch({type:'AUTH',data: {result,token}})
            history.push('/')
        }catch(error){
            console.log(error)
        }
        
    }


        return (
            <Container component={'main'} maxWidth={'xs'}>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant={'h5'}>
                        {isSignUp? ('Sign Up') : ('Sign In')}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input
                                            name={'firstName'}
                                            label={'First Name'}
                                            handleChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                        <Input
                                            name={'lastName'}
                                            label={'Last Name'}
                                            handleChange={handleChange}
                                            half
                                        />
                                    </>
                                )
                            }
                            <Input name='email' label={'Email Address'} handleChange={handleChange} type='email'/>
                            <Input name={'password'} label={'Password'} handleShowPassword={handleShowPassword} handleChange={handleChange} type={showPassword ? 'text' : 'password'}/>
                            {
                                isSignUp && <Input name={'confirmPassword'} label={'Repeat Password'} handleChange={handleChange} type={'password'}/>
                                }
                        </Grid>
                        <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} className={classes.submit}>
                            {isSignUp? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId={'669428016837-gquhb2en6o71g34tl78m86g6j8gdj9jr.apps.googleusercontent.com'}
                            render={(renderProps) =>(
                                <Button className={classes.googleButton}
                                        color={'primary'} fullWidth
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        startIcon={<Icon/>}
                                        variant={'contained'}
                                >
                                    Sign in with your Google Account
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <Grid container justify={'flex-end'}>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp? ('Already have an account? SIGN IN') : ('Don´t you have an account? SIGN UP')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        );
}

export default Auth;
