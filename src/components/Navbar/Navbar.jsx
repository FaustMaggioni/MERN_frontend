import React, {useState,useEffect} from 'react'
import {AppBar, Avatar, Button, Typography, Toolbar} from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from './styles'
import {Link,useHistory, useLocation} from 'react-router-dom'
import {useDispatch}  from "react-redux";



const Botones = ({user,setIniciando,setUser}) =>{
    const dispatch= useDispatch()
    const classes = useStyles()
    const history = useHistory()


    const logout = () =>{
        console.log('LOGOUT')
        dispatch({type: 'LOG_OUT'})
        history.push('/')
        setUser(null)
        setIniciando(false)
    }


    if(user){
        return(
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant='h6'>
                    {user.result.name}
                </Typography>
                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
                    Logout
                </Button>
            </div>
        )
    }else{
        return(
            <Button component={Link} to='/auth' variant='contained' color={'primary'} onClick={()=>setIniciando(true)}>
                Sign In
            </Button>
        )
    }
}

const Navbar = ({}) =>{
    const classes = useStyles()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const location= useLocation()
    const [iniciando,setIniciando]= useState(false)
    console.log(user)

    useEffect(() => {
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
        setIniciando(false)
    }, [location]);
    
    return(
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to='/' className={classes.heading} variant='h2' alig='center'> Memories </Typography>
                    <img className={classes.image} src={memories} alt='memories' height='60' />
                </div>
                <Toolbar className={classes.toolbar}>
                    {!iniciando? (<Botones setUser={setUser} setIniciando={setIniciando} user={user}></Botones>) :(<span></span>)}
                </Toolbar>
            </AppBar>
    )
}

export default Navbar