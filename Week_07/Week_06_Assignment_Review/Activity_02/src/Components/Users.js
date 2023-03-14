import { Link, Outlet } from "react-router-dom";

const Users = ({ state }) => {
  return (
    <div className="users">
      <h2>Users:</h2>
      <ul>
        {state &&
          state.map((user, index) => {
            return (
              <li key={index}>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </li>
            );
          })}
      </ul>
      <Outlet />
    </div>
  );
};

export default Users;
