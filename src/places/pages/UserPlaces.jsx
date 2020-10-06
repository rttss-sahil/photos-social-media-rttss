import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpclient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/loading/ErrorModal";
import LoadingSpinner from "../../shared/loading/LoadingSpinner";
import PlaceList from "../components/PlaceList";

function UserPlaces() {
  const userId = useParams().userId,
    { isLoading, error, sendRequest, clearError } = useHttpclient(),
    [loadedPlace, setLoadedPlace] = useState([]);
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlace(data.place);
      } catch (error) {}
    };
    fetchPlace();
  }, [userId, sendRequest]);
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}

      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && <PlaceList items={loadedPlace} />}
    </React.Fragment>
  );
}

export default UserPlaces;
