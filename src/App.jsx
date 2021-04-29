import React, { useEffect, useState } from 'react'
import { Container, AppBar, Grow, Typography, Grid, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import memories from './images/memories.png'
import useStyles from './styles.js'

const App = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const [agregar, setAgregar] = useState(false)
    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Container maxwidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' alig='center'> Memories </Typography>
                <img className={classes.image} src={memories} alt='memories' height='60' />
            </AppBar>
            <Grow in >
                <Container>

                    {!agregar && (<Button onClick={() => setAgregar(true)}> Add post</Button>)}
                    <Grid container justify='space-between' spacing={3}>
                        {agregar && (
                            <Grid item xs={12} sm={4}>
                                <Form setAgregar={setAgregar} currentId={currentId} setCurrentId={setCurrentId}></Form>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}> </Posts>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App
