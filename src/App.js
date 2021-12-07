import React, { useState } from "react"
import { usePosts } from "./hooks/usePosts"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import PostFilter from "./components/PostFilter"
import MyModal from "./components/UI/modal/MyModal"
import MyButton from "./components/UI/button/MyButton"
import "./styles/App.css"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "bb", body: "zz" },
    { id: 2, title: "aa", body: "ff" },
    { id: 3, title: "cc", body: "dd" }
  ])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createPost = newPost => {
    setPosts([...posts, newPost])
    setModal(!modal)
  }

  const removePost = post => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(!modal)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
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
