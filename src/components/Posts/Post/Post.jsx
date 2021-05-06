import React from 'react'
import useStyles from './styles.js'
import moment from 'moment'
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { Popover } from '@varld/popover';



const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const set = ()=>{
        console.log('SET')
        setCurrentId(post._id)
    }
    return (
        <Card className={classes.card}>

            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>

            <div className={classes.overlay}>
                <Typography variant='h6'> {post.creator} </Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size='small' onClick={set}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            </div>
            <Popover
                popover={({ visible, close }) => {
                    return (
                        <div className="popover">
                            <img className={classes.img} src={post.selectedFile} />
                        </div>
                    );
                }}
            >
                <Button>View photo.</Button>
            </Popover>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>
                    {(post.tags).map((tag) => (
                        `#${tag}`
                    ))}
                </Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant='h4' gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant='body2' color='textSecondary' >
                    {post.message}
                </Typography>

            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSIze='small'></ThumbUpAltIcon>
                    {` ${post.likeCount}`}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSIze='small'></DeleteIcon>
                </Button>
            </CardActions>

        </Card>
    )
}

export default Post
