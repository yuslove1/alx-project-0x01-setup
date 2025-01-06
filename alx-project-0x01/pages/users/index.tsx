import { useState } from "react";
import { UserData } from "@/interfaces";
import UserModal from "@/components/common/UserModal";
import UserCard from "@/components/common/UserCard"; // Import UserCard

/**
 * A page for managing users
 */
const Users: React.FC<{ users: UserData[] }> = ({ users }) => {
  // State to manage modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // State to manage the list of users
  const [userList, setUserList] = useState(users);

  /**
   * Handle adding a new user
   * Updates the user list with the new user
   */
  const handleAddUser = (newUser: UserData) => {
    setUserList([...userList, { ...newUser, id: userList.length + 1 }]);
  };

  // console.log(userList)

  return (
    <div className="flex flex-col h-screen">
      {/* Page header */}
      <header className="p-4 bg-gray-800 text-white">User Management</header>
      <main className="p-4">
        {/* Page title and Add User button */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>
        {/* User list */}
        <div className="grid grid-cols-3 gap-4">
          {userList.map((user) => (
            <UserCard key={user.id} user={user as UserData}  />   
          ))}
        </div>
      </main>

      {/* Add User modal */}
      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
};

/**
 * Fetch user data from an API
 */
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: { users },
  };
}

export default Users;