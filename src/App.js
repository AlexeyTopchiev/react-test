import React, { useState } from "react"
import "./styles/App.css"
import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import MySelect from "./components/UI/select/MySelect"
// import MyInput from "./components/UI/input/MyInput"

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "bb", body: "zz" },
    { id: 2, title: "aa", body: "ff" },
    { id: 3, title: "cc", body: "dd" }
  ])

  const [selectedSort, setSelectedSort] = useState("")
  // const [searchQuery, setSearchQuery] = useState("")

  const createPost = newPost => {
    setPosts([...posts, newPost])
  }

  const removePost = post => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = sort => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      {/* <MyInput
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Поиск"
        type="text"
      /> */}
      <MySelect
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" }
        ]}
        onChange={sortPosts}
        value={selectedSort}
      />
      {posts.length ? (
        <PostList remove={removePost} posts={posts} title="Посты про JS" />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
      )}
    </div>
  )
}

export default App
