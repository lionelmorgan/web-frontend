import React, { useState, useEffect } from 'react';
import './Home.css';
import Nav from '../components/Nav';
import Users from '../components/Users';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const postsData = await response.json();
        console.log('Fetched posts data:', postsData); // Log the response to inspect its structure
    
        // Assuming your data structure might look like this
        // [{ id: 2, user_id: 2, title: "First Post by Jane Doe", content: "...", ... }, ...]
    
        // Check if postsData is an array
        if (Array.isArray(postsData)) {
          setPosts(postsData.reverse());
        } else {
          throw new Error('Posts data is not an array');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Nav />
      <Users />

      <div className="post-button">
        <Post />
      </div>

      <div className="post-container">
        {posts.map((post) => (
          <div className="post-form" key={post.id}>
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

const PostItem = ({ post }) => {
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    // Convert buffer data to base64 using FileReader API
    if (post.image) { // Check if there's an image
      const blob = new Blob([new Uint8Array(post.image.data)], { type: 'image/png' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        setBase64Image(reader.result);
      };
    }
  }, [post]);

  return (
    <div className="post-item">
      {base64Image && <img className="post-image" src={base64Image} alt={post.title} />}
      <div className="post-body">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <p className="post-created">{new Date(post.created).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Home;
