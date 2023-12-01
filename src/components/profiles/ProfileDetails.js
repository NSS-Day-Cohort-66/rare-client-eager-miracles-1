import { useParams } from "react-router-dom";

export const ProfileDetails = () => {
  const { userId } = useParams();

  return <>{userId}</>;
};
