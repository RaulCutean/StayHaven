import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";


export default function RecoverAccountPage() {
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const handleNavigate = () => {
        navigate("/recover/new") ;
    }
    return (
        <div className="max-w-xl mx-auto border p-4 shadow-md shadow-gray-300 rounded-xl mt-32">
            <h1 className="text-2xl text-center p-1">Account Recovery</h1>
            <h2 className="text-center p-1 text-lg text-gray-500">Recover your Booking account</h2>
            <form className="p-2" onSubmit = {(ev) => {
                ev.preventDefault();
                handleNavigate();
            }}>
                <label className="text-gray-500 ">Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    required
                    value = {email}
                    onChange = {(ev) => setEmail(ev.target.value)}
                />
                <button className="primary">Next</button>
            </form>
        </div>
    ) ;
}