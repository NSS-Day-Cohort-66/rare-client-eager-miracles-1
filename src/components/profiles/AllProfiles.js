import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllProfiles.css";
import { getAllUsers } from "../../managers/ProfileManager";
import { createSubscription } from "../../managers/SubscriptionManager";

export const ProfileList = ( {userId}) => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetUsers = () => {
    getAllUsers().then((usersArray) => setAllUsers(usersArray));
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  const handleSubscribeClick = (authorId) => {
    const followerId = parseInt(userId)
    const newSub = {
      author: authorId,
      follower: followerId
    };
    createSubscription(newSub)
      .then(() => {

        alert('Subscription successful!');
        fetchAndSetUsers();
        alert('You are now subscribed - I will add a color once I figure out unsubscribe. Go to postman and make sure this works :)')
      })
      .catch((error) => {
        console.error("Error subscribing to user:", error);
        alert('Failed to subscribe.');
      });
  };


  return (
    <div className="all-profiles-container">
      <div className="user-header-container">
        <h1 className="user-header">Users</h1>
      </div>

      {allUsers.map((user) => (
        <section
          key={user.id}
          className="users-container"
          onClick={() => {
            navigate(`${user.id}`);
          }}
        >
          <div className="user-card">
            <div className="user-details">{user.user.full_name}</div>
            <div className="user-details">
              {user.user.user_profile_type.toUpperCase()}
            </div>

            <img
              className="user-image"
              src={user.image_avatar}
              alt="user avatar"
            />
            <button onClick={(e) => { e.stopPropagation();handleSubscribeClick(user.id)}}>Subscribe</button>
          </div>
        </section>
      ))}
    </div>
  );
};
