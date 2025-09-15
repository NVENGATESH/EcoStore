import React, { useState } from "react";

export default function UserAvatar({ imageUrl }) {
  const [imgError, setImgError] = useState(false);

  return (
    <img
      alt="user"
      src={
        imgError || !imageUrl
          ? "https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4402.jpg?w=360"
          : imageUrl
      }
      onError={() => setImgError(true)}
      className="userAvatar"
   
    />
  );
}
