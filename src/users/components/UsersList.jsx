import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";

function UsersList(props) {
  return (
    <React.Fragment>
      {props.items.length >= 1 ? (
        <ul className="users-list">
          {props.items.map((item) => (
            <UserItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              placeCount={item.places.length}
            />
          ))}
        </ul>
      ) : (
        <div>No User Found</div>
      )}
    </React.Fragment>
  );
}

export default UsersList;
