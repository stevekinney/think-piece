import React, { useContext } from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../contexts/PostsProvider';

const Posts = () => {
  return (
    <section className="Posts">
      <AddPost />
      <PostsContext.Consumer>
        {posts => posts.map(post => <Post {...post} key={post.id} />)}
      </PostsContext.Consumer>
    </section>
  );
};

export default Posts;
