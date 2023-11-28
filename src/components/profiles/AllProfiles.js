import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllProfiles.css";
import { getAllUsers } from "../../managers/ProfileManager";

export const ProfileList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetUsers = () => {
    getAllUsers().then((usersArray) => setAllUsers(usersArray));
  };
  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  return (
    <div className="all-profiles-container">
      <div className="user-header-container">
        <h1 className="user-header">Users</h1>
      </div>
      <section className="users-container">
        {allUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-name">{user.user.full_name}</div>
            <div className="author">{user.user.user_profile_type}</div>

            <img
              className="user-image"
              src={user.image_avatar}
              alt="user avatar"
            />
          </div>
        ))}
      </section>
    </div>
  );
};
