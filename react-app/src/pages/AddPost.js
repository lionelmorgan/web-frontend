import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPost() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      const response = await fetch('http://localhost:9000/api/addPost', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Post added successfully');
        navigate('/home'); // Redirect to /home upon successful submission
      } else {
        console.error('Failed to add post');
        setErrorMessage('Failed to add post. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); // Create a preview URL
    }
  };

  return (
    <div className="post-container">
      <form onSubmit={handleFormSubmit} className="post-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="post">
          {imagePreview && (
            <img className="post-image" src={imagePreview} alt="Uploaded" />
          )}
          <div className="post-body">
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder="User ID"
            />
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Title"
            />
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Content"
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              placeholder="Image"
            />
            <button className="btn btn-primary"type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
