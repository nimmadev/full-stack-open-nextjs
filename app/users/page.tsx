import Link from "next/link";
import { getAllUsers } from "../services/users";

const Users = async () => {
  const users = await getAllUsers();

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
