import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetching } from "../hooks/useFetching"
import PostService from "../API/PostService"
import MyLoader from "../components/UI/loader/MyLoader"

const PostIdPage = () => {
  const params = useParams()
  console.log("params", params)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostById, isPostLoading, postError] = useFetching(async id => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  const [fetchComments, isComLoading, comError] = useFetching(async id => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
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
      <h2>Комментарии:</h2>
      {comError && <h2>Произошла ошибка: {comError}</h2>}
      {isComLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map(comm => (
            <div style={{ marginTop: "15px" }} key={comm.id}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostIdPage
