//update user info
export const create = (userId, token, post)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` },
        body: post
        })
        .then(response=>{
        return response.json();
    })
        .catch(err=>console.log(err))
};

//create list of posts
export const list =() =>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts`,{
        method: "GET"
            })
        .then(response=>{
        return response.json();
    })
        .catch(err=>console.log(err))
};

//create  a single post view
export const singlePost =(postId) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method: "GET"
            })
        .then(response=>{
        return response.json();
    })
        .catch(err=>console.log(err))
};

export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//remove post
export const remove = (postId, token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
                } 
            })
        .then(response=>{
        return response.json();
    })
        .catch(err=>console.log(err))
};

//update user info
export const update = (postId, token, post)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` },
        body: post
        })
        .then(response=>{
            console.log(response);
           
        return response.json();
    })
        .catch(err=>console.log(err))
};