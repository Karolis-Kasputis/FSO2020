const lodash = require('lodash')
const Blog = require('../models/Blog')
const User = require('../models/User')
const dummy = (blogs) => {
 return 1
}


const blogList = [
    {
        likes: 5,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e89e9c19f701a338f2f887e"
        },
        {
        likes: 5,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e89e9eab719de34939ecd7a"
        },
        {
        likes: 5,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e89e9ecb719de34939ecd7b"
        },
        {
        likes: 5,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e89e9edb719de34939ecd7c"
        },
        {
        likes: 5,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e89e9edb719de34939ecd7d"
        },
        {
        likes: 5,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e89f95d6f2fc43efa4fd8de"
        },
        {
        likes: 0,
        title: "React Patterns",
        author: "Michael Chan",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        user: "5e8a21396fa2455467b11a55",
        id: "5e8a00ed476033447a77543f"
        }
] 
/* const userList = [
    {
        username: 'Uzi',
        name: 'User name',
        //password: 'pazzword',
        passwordHash:'$2b$10$yvj3FQPipLVoyR062Bf13OcWXnvYtUfK0.es7e/NpiNjU1yw48ysq'
    },
    {
        username: 'Karolis',
        name: 'Karoliz Ka',
        //password: 'puzzleword',
        id: "5e8a21396fa2455467b11a55",
        passwordHash:'$2b$10$qDuG3e.YDS.vMYiMTQOCceVCqWwiKhSlFFlrf9SbU.bUP2ARr3cAC'
    },    
    {
        username: 'Piotr',
        name: 'Peter Peterobich',
        //password: 'buzzword',
        passwordHash:'$2b$10$83eVYoSdO25kiCPMd.fijOPGaH25F3Lddsdm/VAGf7Y3D/EsVTJiO'
    },
] */ 

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const totalLikes = (blogPosts) => {
    const arrOfLikes = blogPosts.map(blog => blog.likes)
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    return arrOfLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogPosts) => {
    let favoritePost 
        if (blogPosts.length > 0){
            favoritePost = blogPosts.reduce(
                    (maxPost, currentPost) => 
                        (maxPost.likes  > currentPost.likes)
                        ? { title: maxPost.title, author: maxPost.author,  likes: maxPost.likes }
                        : currentPost 
            , { likes : 0 })
        }
    

    return favoritePost
}

const mostBlogs = (blogList) => {
    return(
        lodash(blogList)
            .groupBy('author')
            .map( (authorBlogs, id) => ({
                author: id,
                blogs: authorBlogs.length
            }))
            .value()
    )
}

const mostLikes = (blogsArray) => {
    return (
        lodash(blogsArray)
            .groupBy('author')
            .map( (authorBlogs, id) => ({
                author: id,
                likes: lodash.sumBy(authorBlogs, 'likes')
            }))
            .value()
    )
        
    
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs,
    blogList,
    blogsInDb,
    usersInDb,
    //userList
}