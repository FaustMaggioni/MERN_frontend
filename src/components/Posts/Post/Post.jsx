import React, {useState} from 'react'
import useStyles from './styles.js'
import moment from 'moment'
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { Popover } from '@varld/popover';



const Post = ({ post, setCurrentId,setAgregar }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const set = ()=>{
        console.log('SET')
        setCurrentId(post._id)
        setAgregar(true)
    }

    const legusto= post.likes.find((like) => like === (user?.result?.googleId || user?.result?.id))

    const Likes = () => {

        if (post.likes.length > 0) {
            console.log('Post likes: ',post.likes)
            console.log('Cant: ',post.likes.length)
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?.id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }else {
            return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>;
        }
    };

    return (
        <Card className={classes.card}>

            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>

            <div className={classes.overlay}>
                <Typography variant='h6'> {post.name} </Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {   (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
               ( <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size='small' onClick={set}>
                        <MoreHorizIcon fontSize='default'/>
                    </Button>
                </div>
               )
            }
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
                <Button size='small' disabled={!(user?.result) || legusto} color='primary' onClick={()=> dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    (<Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSIze='small'></DeleteIcon>
                    </Button>)
                    }
            </CardActions>

        </Card>
    )
}

export default Post
