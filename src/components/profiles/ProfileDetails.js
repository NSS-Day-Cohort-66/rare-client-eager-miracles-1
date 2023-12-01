import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetailsByUserId } from "../../managers/ProfileManager";

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
    <div className="background-wrapper">
      <div className="container">
        <div className="user-card" key={profileDetails.id}>
          <div className="card-header">
            <div className="user-title-section">
              <h2 className="user-title">{profileDetails.user?.full_name}</h2>
            </div>
            <img
              className="user-image"
              src={profileDetails.image_avatar}
              alt="Post"
            />
          </div>

          <div className="user-email">{profileDetails.user?.email}</div>
          <div className="user-date-joined">{profileDetails.created_on}</div>
        </div>
      </div>
    </div>
  );
};
