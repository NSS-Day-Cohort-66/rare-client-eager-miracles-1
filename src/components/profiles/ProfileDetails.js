import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetailsByUserId } from "../../managers/ProfileManager";
import "./ProfileDetails.css";

export const ProfileDetails = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const { userId } = useParams();

  const fetchAndSetProfileDetails = () => {
    getUserDetailsByUserId(userId).then((userObj) =>
      setProfileDetails(userObj)
    );
  };

  useEffect(() => {
    fetchAndSetProfileDetails();
  }, []);

  return (
    <div className="user-detail-wrapper">
      <div className="user-card" key={profileDetails.id}>
        <div className="user-header">
          <div className="user-title-section">
            <h2 className="user-title">{profileDetails.user?.full_name}</h2>
          </div>
          <img
            className="user-image"
            src={profileDetails.image_avatar}
            alt="user"
          />
        </div>
        <div className="user-details-wrapper">
          {" "}
          <div className="user-email">{profileDetails.user?.email}</div>
          <div className="user-user-type">
            {profileDetails.user?.user_profile_type.toUpperCase()}
          </div>
          <div className="user-date-joined">
            Date Joined: {profileDetails.created_on}
          </div>
        </div>
      </div>
    </div>
  );
};
