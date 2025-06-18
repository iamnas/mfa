import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../service/authApi";

function HomePage() {

  const nav = useNavigate();

  const { user, logout } = useSession();

  console.log(user);


  const handleLogout = async() => {
    try {
      const data = await logoutUser();
      logout(data);
      nav("/login");
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className=" p-6 rounded-lg shadow-2xl w-full max-w-md max-auto mt-10">

      <h2 className="text-xl font-semibold mb-4">
        Welcome , {user.username}!
      </h2>
      <p className="text-gray-600 text-sm font-light">
        You are logged in as {user.email}
      </p>
      <p className="text-gray-600 text-sm font-light">
        You have successfully logged in 🎉 and verified your 2FA
      </p>
      <button onClick={handleLogout} className="w-full py-2 text-white bg-red-600 rounded-md mt-4">
        Logout
      </button>
    </div>
  )
}

export default HomePage