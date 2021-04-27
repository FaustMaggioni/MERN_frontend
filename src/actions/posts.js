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
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};


