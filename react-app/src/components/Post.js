import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Post.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPost() {
  const handleRedirectToAddPost = () => {
    window.location.href = '/addPost';
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleRedirectToAddPost}>
        New Post
      </button>
    </div>
  );
}

export default AddPost;
