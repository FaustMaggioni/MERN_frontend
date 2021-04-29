import * as api from '../api/index.js'

// create actions creaters

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        console.log('DATA', data)
        try {
            const x = dispatch({ type: 'FETCH_ALL', payload: data });
        } catch (e) {
            console.log(e)
        }
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: 'UPDATE', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        console.log('DISPATCH DELETE')
        dispatch({ type: 'DELETE', payload: id })
    } catch (error) {
        console.log(error)
    }
}
