import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
    const [firstname  , setFirstname] = useState("") ;
    const [lastname  , setLastname] = useState("") ;
    const [email  , setEmail] = useState("") ;
    const [password  , setPassword] = useState("") ;
    const [toast , setToast] = useState(false) ;
    const registerRequest = async (ev) => {
        ev.preventDefault();
        try {
            const response = await axios.post("/register" , {firstname , lastname , email , password});
            console.log(response.data);
            alert("Registered successfully!");
        }catch(e) {
            alert("Registration failed , please try again later");
            console.log(e);
        }

    }
    return (
        <div className = "max-w-xl mx-auto border border-gray-300 p-4 rounded-xl shadow-gray-300 shadow-md mt-32">
            <h1 className="text-4xl text-center border-b border-gray-300 pb-2 mb-2">Create a new account</h1>
            <form onSubmit = {registerRequest}>
                <div className="flex-col justify-evenly mt-3">
                        <div className="grid grid-cols-2 place-content-around">
                        <label className="text-gray-500">Firstname</label>
                        <label className="text-gray-500 pl-1.5">Lastname</label>
                    </div>
                    <div className="flex justify-evenly gap-2">
                        <input
                            className="inline-block rounded-xl p-2 border grow "
                            required
                            placeholder="John"
                            type="text"
                            value = {firstname}
                            onChange = {(ev) => setFirstname(ev.target.value)}

                        />
                        <input
                            className="inline-block rounded-xl p-2 border grow "
                            required
                            placeholder="Doe"
                            type="text"
                            value = {lastname}
                            onChange = {(ev) => setLastname(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="text-gray-500" >Email</label>

                    <input
                        required
                        placeholder="your@email.com"
                        type="email"
                        value = {email}
                        onChange = {(ev) => setEmail(ev.target.value)}

                    />
                </div>
                <div className="mt-3">
                    <label className= "text-gray-500" >Password</label>

                    <input
                        required
                        placeholder="Password"
                        type="password"
                        value = {password}
                        onChange = {(ev) => setPassword(ev.target.value)}

                    />
                </div>
                <button className="primary" onClick={registerRequest}>Sign Up</button>
                <div className="text-center mt-2 ">
                <Link to="/login" className="text-gray-500 underline text-primary font-medium">Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}