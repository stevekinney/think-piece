import React from 'react';
import Post from './Post';
import AddPost from './AddPost';

const Posts = ({ posts, onCreate, onRemove }) => {
  return (
    <section className="Posts">
      <AddPost onCreate={onCreate} />
      {posts.map(post => (
        <Post {...post} onRemove={onRemove} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
