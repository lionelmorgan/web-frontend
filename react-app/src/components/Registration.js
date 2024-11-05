import React from 'react';
import '../components/Registration.css';
import M from 'materialize-css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationModal = () => {
    React.useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Registration form submitted!");
    };

    return (
        <div id="registration-modal" className="modal">
            <div className="modal-content">
                <h4>Register</h4>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="text" id="name" required />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" id="email" required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="password" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="modal-close btn">Cancel</button>
                        <button type="submit" className="btn">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
