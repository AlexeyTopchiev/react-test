import React, { useState, useEffect } from "react"
import { usePosts } from "../hooks/usePosts"
import { useFetching } from "../hooks/useFetching"
import PostService from "../API/PostService"
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import PostFilter from "../components/PostFilter"
import MyModal from "../components/UI/modal/MyModal"
import MyButton from "../components/UI/button/MyButton"
import MyLoader from "../components/UI/loader/MyLoader"
import Pagination from "../components/UI/pagination/Pagination"
import MySelect from "../components/UI/select/MySelect"
import { getPagesCount } from "../utils/page"

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [fetchPosts, isPostsLoading, postsError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data)
      const totalCount = response.headers["x-total-count"]
      setTotalPages(getPagesCount(totalCount, limit))
    }
  )

  useEffect(() => {
    fetchPosts(limit, page)
  }, [limit])

  const changePage = page => {
    setPage(page)
    fetchPosts(limit, page)
  }

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
      <MySelect
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Все" }
        ]}
        defaultValue="Кол-во постов на странице"
        value={limit}
        onChange={value => setLimit(value)}
      />
      {postsError && <h1>Произошла ошибка: {postsError}</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px"
          }}
        >
          <MyLoader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Посты про JS"
        />
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  )
}

export default Posts
