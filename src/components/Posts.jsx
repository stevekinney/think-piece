import React from 'react'
import Post from './Post';
import AddPost from './AddPost';

const Posts = ({ posts, onCreate }) => {
  return (
    <section className="Posts">
      <AddPost onCreate={onCreate} />
      {posts.map(post => <Post {...post} key={post.id} />)}
    </section>
  )
}

export default Posts;
