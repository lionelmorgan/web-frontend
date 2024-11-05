import React, { useState, useEffect } from 'react';
import './Home.css';
import Nav from '../components/Nav';
import Users from '../components/Users';
import Post from '../components/Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const postsData = await response.json();
        if (Array.isArray(postsData)) {
          setPosts(postsData.reverse()); // Reverse to display latest first
        } else {
          throw new Error('Posts data is not an array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch comments for a given post
  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/comments/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData = await response.json();
      setComments(commentsData);
    } catch (error) {
      setError('Could not load comments. Please try again.');
    }
  };

  // Handle adding a new comment
  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    const commentData = {
      userName: 'Anonymous', // Ideally, this would be the logged-in user's name
      content: newComment,
      post: { id: postId }, // Send the post object with the id (not just postId)
    };

    try {
      const response = await fetch('http://localhost:9000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const addedComment = await response.json();
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment(''); // Clear the input after submitting
    } catch (error) {
      setError('Failed to add comment. Please try again.');
    }
  };

  // Convert timestamp to a human-readable format (time ago)
  const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} yrs ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} mo ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hrs ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} mins ago`;
    return `${seconds} secs ago`;
  };

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
            <div className="row">
              <div className="col s12 m7">
                <div className="card post-item">
                  <div className="card-image">
                    <img
                      className="post-image"
                      src={`data:image/jpeg;base64,${post.image}`}
                      alt={post.title}
                    />
                  </div>
                  <div className="card-content">
                    <div className="user">
                      <span>
                        <img
                          className="user-avatar"
                          src={require('../images/ironpanther.png')}
                          alt="User Avatar"
                        />
                      </span>
                      <span>iron panther</span>
                    </div>
                    <h5>{post.title}</h5>
                    <p className="post-content">{post.content}</p>
                    <p className="post-created">{new Date(post.created).toLocaleDateString()}</p>
                    <p className="post-created">{timeAgo(post.created)}</p>

                    {/* Comment Section */}
                    <div className="comments-section">
                      <h6>Comments</h6>
                      {error && <p className="error">{error}</p>}

                      {/* Comment Form */}
                      <form
                        onSubmit={(e) => {
                          handleCommentSubmit(e, post.id);
                        }}
                      >
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          required
                        />
                        <button class="btn btn-primary" type="submit">Submit</button>
                      </form>

                      {/* Display Comments */}
                      <ul>
                        {comments
                          .filter((comment) => comment.post.id === post.id) // Ensure comments are associated with the correct post
                          .map((comment) => (
                            <li key={comment.id}>
                              <strong>{comment.userName}:</strong> {comment.content}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
