import React, { useContext } from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../contexts/PostsProvider';
import { UserContext } from '../contexts/UserProvider';

const Posts = () => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);

  return (
    <section className="Posts">
      {user && <AddPost user={user} />}
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
