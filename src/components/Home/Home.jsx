import React, {useEffect, useState} from 'react'
import {Button, Container, Grid, Grow} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "../../styles";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";

const Home = () =>{
    const [agregar, setAgregar] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return(
        <Grow in >
            <Container>
                {!agregar && (<Button onClick={() => setAgregar(true)}> Add post</Button>)}
                <Grid className={classes.mainContainer} container justify='space-between' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setAgregar={setAgregar} setCurrentId={setCurrentId}> </Posts>
                    </Grid>
                    {agregar && (
                        <Grid item xs={12} sm={4}>
                            <Form setAgregar={setAgregar} currentId={currentId} setCurrentId={setCurrentId}></Form>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home