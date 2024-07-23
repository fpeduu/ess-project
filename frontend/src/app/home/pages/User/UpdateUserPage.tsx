import React, { useEffect } from "react";
import UpdateUserForm from "../../forms/UpdateUserForm";
import { SessionService } from "../../../../shared/services/SessionService";

const UpdateUserPage: React.FC = () => {
  const [userId, setUserId] = React.useState<string | null>(null);
  const sessionManager = new SessionService();

  useEffect(() => {
    const user = sessionManager.getUser();
    if (user) {
      setUserId(user.id);
    }
  }, []);

  if (!userId) {
    return <p>User ID is missing</p>;
  }

  return (
    <div>
      <UpdateUserForm userId={userId} />{" "}
    </div>
  );
};

export default UpdateUserPage;
