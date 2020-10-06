import React, { useEffect, useState } from "react";
import { useHttpclient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/loading/ErrorModal";
import LoadingSpinner from "../../shared/loading/LoadingSpinner";
import UsersList from "../components/UsersList";

function Users() {
  const [loadedUsers, setLoadedUSers] = useState([]),
    { isLoading, error, sendRequest, clearError } = useHttpclient();
  useEffect(() => {
    let fetchRequest;
    try {
      fetchRequest = async () => {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadedUSers(data.user);
      };
    } catch (error) {}
    fetchRequest();
  }, [sendRequest]);
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}

export default Users;
