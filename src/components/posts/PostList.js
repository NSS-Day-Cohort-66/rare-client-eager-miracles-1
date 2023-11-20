import { useState, useEffect} from "react"


export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])


    const fetchAllPosts = async () => {
        const response = await fetch('http://localhost:8000/posts', {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
},
        })
        const posts = await response.json()
        setAllPosts(posts)
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])



    return (
        <div>Hi!</div>
    )
}