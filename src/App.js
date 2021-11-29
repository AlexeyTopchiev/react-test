import React, { useState, useMemo } from "react"
import "./styles/App.css"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import PostFilter from "./components/PostFilter"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "bb", body: "zz" },
    { id: 2, title: "aa", body: "ff" },
    { id: 3, title: "cc", body: "dd" }
  ])

  const [filter, setFilter] = useState({ sort: "", query: "" })

  const sortedPosts = useMemo(() => {
    // console.log("sortedPosts run")
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    } else {
      return posts
    }
  }, [posts, filter.sort])

  const sortedAndSearchedPosts = useMemo(() => {
    // console.log("sortedAndSearchedPosts run")
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    )
  }, [filter.query, sortedPosts])

  const createPost = newPost => {
    setPosts([...posts, newPost])
  }

  const removePost = post => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты про JS"
      />
    </div>
  )
}

export default App
