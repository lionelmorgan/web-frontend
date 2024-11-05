import React, { useState, useEffect } from 'react';
import './Events.css'; // Use the same CSS for styling
import Nav from '../components/Nav';
import EventsList from '../components/EventsList';
import EventPost from '../components/EventPost'; // Import AddEvent component
import Registration from '../components/Registration'; // Import the Registration component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/events/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const eventsData = await response.json();
                console.log('Fetched events data:', eventsData);

                if (Array.isArray(eventsData)) {
                    const reversedEvents = eventsData.reverse();
                    setEvents(reversedEvents);
                    setUpcomingEvents(reversedEvents.filter(event => new Date(event.date) > new Date()).slice(0, 5)); // Get upcoming events
                } else {
                    throw new Error('Events data is not an array');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Nav />
            <div className="events-container">
                <div className="events-main">
                <h5 id="event-title">Events</h5>
                    <div className="event-container">
                        {events.map((event) => (
                            <div className="event-item" key={event.id}>
                                <EventItem event={event} />
                            </div>
                        ))}
                    </div>
                    <Registration /> {/* Include the Registration component */}
                </div>
                <div className="sidebar">
                    <h5 id="event-title-side">Upcoming Events</h5>
                    {upcomingEvents.length === 0 ? (
                           <EventsList />
                         
                    ) : (
                        
                        upcomingEvents.map((event) => (
                            <div key={event.id} className="sidebar-event">
                                <h4>{event.event_name}</h4>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}

                    <div>
                        <EventPost />
                    </div>
                </div>
            </div>
        </>
    );
};

const EventItem = ({ event }) => {
    const [base64Image, setBase64Image] = useState('');

    useEffect(() => {
        if (event.image) {
            if (typeof event.image === 'string') {
                setBase64Image(event.image);
            } else {
                const blob = new Blob([new Uint8Array(event.image)], { type: 'image/png' });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => {
                    setBase64Image(reader.result);
                };
            }
        }
    }, [event]);

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

    return (
        <div className="event-container">
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img 
                            src={`data:image/jpeg;base64,${base64Image}`} 
                            alt={event.event_name} 
                        />
                        <span className="card-title">{event.event_name}</span>
                    </div>
                    <div className="card-content">
                        <p>{event.description}</p>
                        <p className="event-location">{event.location}</p>
                        <p className="event-created">{new Date(event.created).toLocaleDateString()}</p>
                        <p className="event-created">{timeAgo(event.created)}</p>
                    </div>
                    <div className="card-action">
                        <a href="/information">Information</a>
                        <a href="#registration-modal" className="modal-trigger">Register</a> {/* Open modal on click */}
                    </div>
                </div>
            </div>
        </div>
        </div> 
    );
};

export default Events;
