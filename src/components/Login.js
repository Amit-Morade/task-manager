import { useState } from "react";

export default function Login({userAuthentication, userAuthenticationSuccess}) {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();
        if(userAuthentication(email)) {
            userAuthenticationSuccess(true);
            setError(null);
        }else {
            setError("Invalid username or email")
        }
    }

    return (
        <div className="border-2 shadow-lg rounded-lg">
            <form onSubmit={handleLogin} className="flex flex-col px-4 py-6">
                <span className="mb-2">UserName</span>
                <input 
                    value={userName} 
                    onChange={(event) => {
                        setUserName(event.target.value)
                        setError(null)}
                    } 
                    className="mb-4 px-3 py-2 focus:outline-none border-2 rounded-md" 
                    type="text" 
                    required placeholder="Enter your name"
                />
                <span className="mb-2">Email</span>
                <input 
                    value={email} 
                    onChange={(event) => {
                        setEmail(event.target.value)
                        setError(null)
                    }} 
                    className="mb-6 px-3 py-2 border-white-400 border-2 rounded-md focus:outline-none focus:border-white-400 focus:valid:border-green-400 focus:invalid:border-pink-400 focus:invalid:text-pink-600" 
                    type="email" 
                    required placeholder="ex:xyz@gmail.com"
                />
                {error && <span className="mb-4 text-red-600">{error}</span>}
                <button className="border-2 rounded-md w-fit px-3 py-2 hover:bg-green-200" type="submit">Login</button>
            </form>
        </div>
    )
}