import { useState } from "react";
import { Link } from "react-router-dom"
import { loginUser, register } from "../service/authApi";
import type { AxiosError } from "axios";
import type { User } from "../context/SessionContext";

function LoginForm({ onLoginSuccess }: { onLoginSuccess: (user: User) => void }) {

    const [isResistered, setIsResistered] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        setError("");
        setMessage("");
       
        if (email === "") {
            setError("Email is required");
            return;
        }
        if (password === "") {
            setError("Password is required");
            return;
        }
       
        try {
            const data = await loginUser( email, password);
            

            onLoginSuccess(data);
            setMessage(data.message);
            setError("");
            setEmail("");
            setPassword("");


        } catch (error) {
            const err = error as AxiosError<unknown>;
            console.log(err.response?.data);

            const backendData = err.response?.data as
                | { message?: string; error?: string }
                | { message?: { errorResponse?: { errmsg?: string } }; error?: string }
                | undefined;

            if (typeof backendData?.message === "string") {
                setError(backendData.message);
            } else if (backendData?.message?.errorResponse?.errmsg) {
                // Handle MongoDB duplicate error
                setError("Something went wrong during login 😔");
                // setError(backendData.message.errorResponse.errmsg);
            } else if (backendData?.error) {
                setError(backendData.error);
            } else {
                setError("Something went wrong during login 😔");
            }
        }
    }

    const handleResister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setMessage("");
        if (username === "") {
            setError("Username is required");
            return;
        }
        if (email === "") {
            setError("Email is required");
            return;
        }
        if (password === "") {
            setError("Password is required");
            return;
        }
        if (password !== cpassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const data = await register(username, email, password);

            // setMessage("Account created successfully 🎉");
            setMessage(data.message);
            setError("");
            setIsResistered(false);

            setUsername("");
            setEmail("");
            setPassword("");
            setCpassword("");


        } catch (error) {
            const err = error as AxiosError<unknown>;
            console.log(err.response?.data);

            //  setError("Something went wrong during registration 😔");
            const backendData = err.response?.data as
                | { message?: string; error?: string }
                | { message?: { errorResponse?: { errmsg?: string } }; error?: string }
                | undefined;

            if (typeof backendData?.message === "string") {
                setError(backendData.message);
            } else if (backendData?.message?.errorResponse?.errmsg) {
                // Handle MongoDB duplicate error
                setError("Something went wrong during registration 😔");
                // setError(backendData.message.errorResponse.errmsg);
            } else if (backendData?.error) {
                setError(backendData.error);
            } else {
                setError("Something went wrong during registration 😔");
            }
        }


    }

    const handleResisterToggle = () => {
        setIsResistered(!isResistered);
        setMessage("");
        setError("");
    }

    return (

        <form onSubmit={isResistered ? handleResister : handleLogin} action="" className="bg-gray-100 rounded-lg shadow-2xl w-full max-w-sm max-auto">
            <div className='pt-6'>
                <h2 className='text-3xl text-center font-extralight'>
                    {isResistered ? "Create account" : "Login"}
                </h2>
            </div>
            {/* Divider */}
            <hr className='text-gray-200 mt-6 mb-6' />
            <p className='text-center text-lg text-gray-600 font-light'>
                {isResistered ? 'Let\'s create your account' : 'We are glad to see you again 😊'}
            </p>
            <div className="p-6">
                {isResistered &&
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            User name
                        </label>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                            placeholder="Enter your name"
                        />
                    </div>
                }
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        placeholder="Enter your Password"
                    />
                </div>
                {/* Confirm password */}
                {
                    isResistered &&
                    <div className="mb-4">
                        <label htmlFor="cpassword" className="block text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mt-2"
                            placeholder="Enter your Again"
                        />
                    </div>
                }
                {
                    error &&
                    <p className="text-red-600 text-sm font-light mt-3">
                        {error}
                    </p>
                }
                {
                    message &&
                    <p className="text-green-600 text-sm font-light mt-3">
                        {message}
                    </p>
                }
                <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md mt-4">
                    {isResistered ? "Create account" : "Login"}
                </button>

                <div className="mt-4">
                    <p className="pt-2 text-center text-sm text-gray-600 font-light">
                        {isResistered ? "Already have an account? " : "Don't have an account?"}
                        <Link onClick={handleResisterToggle} to="/register" className="text-blue-600 hover:underline">{isResistered ? "Login" : "Create an account"}</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default LoginForm