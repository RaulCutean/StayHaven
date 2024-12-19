import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext/UserContext.jsx";


export default function LoginPage() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("") ;
    const [redirect , setRedirect] = useState(false) ;
    const {user , setUser} = useContext(UserContext);
    const handleLoginSubmit = async (ev) => {
        ev.preventDefault();
        const data = {email , password};
        try {
            const response = await axios.post("/login" , data );
            setUser(response.data);
            alert("Login successful");
            setRedirect(true);
        }catch(e) {
            alert("Login failed")
            console.log(e);
        }
    }
    if(redirect || user) {
        return <Navigate to = "/" />
    }
    return(
        <div className="max-w-xl mx-auto border rounded-xl p-4 shadow-md shadow-gray-300 mt-32" >
                <h1 className="text-4xl text-center border-b border-gray-300 pb-2 mb-3">Login into Booking</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="mt-3">
                        <label className="text-gray-500">Email</label>
                        <input
                            type="email"
                            value = {email}
                            placeholder="your@email.com"
                            onChange = {(ev) => setEmail(ev.target.value) }
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-500">Password</label>
                        <input
                            type="password"
                            value = {password}
                            placeholder="password"
                            onChange = {(ev) => setPassword(ev.target.value) }
                        />
                    </div>
                    <button className="primary">Login</button>
                    <div className="text-center mt-2">
                        <Link to={"/recover"} className="underline text-primary font-medium">Forgot account?</Link>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <Link to="/register" className=" text-primary underline font-medium">Sign up for Booking</Link>
                    </div>
                </form>
        </div>
    )
}