import React, { useState } from 'react'
import useStyles from './styles.js'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'


const Form = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(createPost(postData))
        } catch (error) {
            console.log(error);
        }

    }
    const clear = () => { }
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tag: '',
        selectedFile: '',
    })

    return (
        <Paper className={classes.paper}>
            <form autoComplete='on' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'> Creating a Memory </Typography>
                <TextField
                    name='creator' variant='outlined'
                    label='Creator' fullWidth
                    value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField
                    name='title' variant='outlined'
                    label='Title' fullWidth
                    value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField
                    name='message' variant='outlined'
                    label='Message' fullWidth
                    value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField
                    name='tags' variant='outlined'
                    label='Tags' fullWidth
                    value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    ></FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant='contained' size='large' fullWidth color='primary' type='submit'>
                    Submit
                </Button>
                <Button variant='contained' size='small' fullWidth color='secondary' onClick={clear}>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form
