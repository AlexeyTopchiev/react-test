import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetching } from "../hooks/useFetching"
import PostService from "../API/PostService"
import MyLoader from "../components/UI/loader/MyLoader"

const PostIdPage = () => {
  const params = useParams()
  console.log("params", params)

  const [post, setPost] = useState({})
  const [fetchPostById, isPostLoading, postError] = useFetching(async id => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  console.log("post", post)
  useEffect(() => {
    fetchPostById(params.id)
  }, [])

  return (
    <div>
      <h1>You're open page post id = {params.id} </h1>
      {postError && <h2>Произошла ошибка: {postError}</h2>}

      {isPostLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
    </div>
  )
}

export default PostIdPage
