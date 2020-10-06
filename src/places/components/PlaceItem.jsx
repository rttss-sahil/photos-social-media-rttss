import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/Button/Button";
import Card from "../../shared/components/Card/Card";
import Map from "../../shared/components/Map/Map";
import Modal from "../../shared/components/Modal/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpclient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/loading/ErrorModal";
import LoadingSpinner from "../../shared/loading/LoadingSpinner";
import "./PlaceItem.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false),
    history = useHistory(),
    { isLoading, error, sendRequest, clearError } = useHttpclient(),
    auth = useContext(AuthContext),
    [showDeleteWarning, setShowDeleteWarning] = useState(false),
    openMap = () => setShowMap(true),
    closemap = () => setShowMap(false),
    showDeleteConfirm = () => setShowDeleteWarning(true),
    showDeleteCancel = () => setShowDeleteWarning(false),
    confirmDeleteHandler = async () => {
      setShowDeleteWarning(false);
      try {
        await sendRequest(`/places/${props.id}`, "DELETE");
        history.push("/users");
      } catch (error) {}
    };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closemap}
        header={props.address}
        contentClass="place-item__model-content"
        footerClass="place-item__model-actions"
        footer={<Button onClick={closemap}>CLOSE</Button>}
      >
        <div className="mapContainer">
          <Map lat={props.coordinate.lat} lon={props.coordinate.lng} />
        </div>
      </Modal>
      <Modal
        show={showDeleteWarning}
        onCancel={showDeleteCancel}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={showDeleteCancel}>
              CANCEL
            </Button>
            <Button onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>This action is irreversible. You cannot undo the changes</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creator && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteConfirm}>
                  DELETE
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
