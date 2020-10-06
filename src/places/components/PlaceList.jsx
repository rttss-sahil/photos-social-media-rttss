import React from "react";
import Button from "../../shared/components/Button/Button";
import Card from "../../shared/components/Card/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

function PlaceList(props) {
  return (
    <React.Fragment>
      {props.items.length >= 1 ? (
        <ul className="place-list">
          {props.items.map((i) => (
            <PlaceItem
              key={i.id}
              id={i.id}
              image={i.image}
              title={i.title}
              description={i.description}
              address={i.address}
              creator={i.creator}
              coordinate={i.location}
            />
          ))}
        </ul>
      ) : (
        <div className="place-list center">
          <Card>
            <h2>No Places Found. Create One</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}

export default PlaceList;
