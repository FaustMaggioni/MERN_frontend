import React from 'react'
import Post from './Post/Post'
import useStyles from './styles.js'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core'


const Posts = ({ setCurrentId,setAgregar }) => {
    const classes = useStyles()
    const posts = useSelector((state) => state.posts)
    console.log('POSTS', posts)
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post.id} xs={12} sm={6} item>
                        <Post post={post} setAgregar={setAgregar} setCurrentId={setCurrentId}></Post>
                    </Grid>
                ))}

            </Grid>
        )
    )
}

export default Posts
