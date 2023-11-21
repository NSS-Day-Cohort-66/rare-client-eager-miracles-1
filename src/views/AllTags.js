import { useEffect, useState } from "react"



export const AllTags = () => {

    const [tags, setTags] = useState([])

    const getAllTags = () => {
        return fetch("http://localhost:8000/tags").then(res => res.json())
    }

    useEffect(() => {
        getAllTags().then((tagsArray) => {
            setTags(tagsArray)
        })
    },[])


    return (
        <div>Hello World</div>
    )
}