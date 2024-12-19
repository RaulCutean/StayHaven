import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext/UserContext.jsx";


export default function BookingWidget({place}) {
    const [checkIn , setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests , setNumberOfGuests] = useState(1);
    const [name , setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [redirect , setRedirect] = useState('');
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user) {
            let fullName = "" ;
            for(let i = 0 ; i < user.firstname.length ; i++){
                if(i === 0 && user.firstname.charAt(0) >= 'a' && user.firstname.charAt(0) <= 'z'){
                    fullName += user.firstname.charAt(i).toUpperCase() ;
                }else {
                    fullName += user.firstname.charAt(i);
                }
            }
            fullName += " " + user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1 , user.lastname.length);
            setName(fullName);
        }
    }, [user]);

    let numberOfDays = 0 ;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn));
    }
    const bookThisPlace = async () => {
        const bookingData = {
            checkIn , checkOut, numberOfGuests , name , mobile ,
            place : place._id ,
            price : numberOfDays * place.price ,
        }
        console.log(numberOfDays * place.price);
        try {
            const response = await axios.post("bookings" , bookingData)
            const bookingId = response.data._id ;
            setRedirect(`/account/bookings/${bookingId}`);
        }catch(err) {
            console.log(err)
        }
    }
    if(redirect) {
        return <Navigate to={redirect}  />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-center text-2xl">
                Price: ${place.price} per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="  py-3 px-4">
                        <label>Check-in: </label>
                        <input value = {checkIn} onChange ={(ev) => setCheckIn(ev.target.value)} type="date"/>
                    </div>
                    <div className="  py-3 px-4 border-l">
                        <label>Check-out: </label>
                        <input value = {checkOut} onChange ={(ev) => setCheckOut(ev.target.value)} type="date"/>
                    </div>
                </div>
                <div>
                    <div className="  py-3 px-4 border-t ">
                        <label>Number of guests: </label>
                        <input value = {numberOfGuests} onChange = {(ev) => setNumberOfGuests(ev.target.value)} type="number" />
                    </div>
                </div>
                {numberOfDays > 0 && (
                    <div>
                        <div className="  py-3 px-4 border-t ">
                            <label>Your full name:</label>
                            <input value={name} onChange={(ev) => setName(ev.target.value)}
                                   type="text"/>
                            <label>Your phone number:</label>
                            <input value={mobile} onChange={(ev) => setMobile(ev.target.value)}
                                   type="tel"/>
                        </div>
                    </div>
                )}
            </div>
            <button onClick ={bookThisPlace} className=" mt-4 primary">Book this place
                {numberOfDays > 0 && (
                    <span> ${numberOfDays * place.price}</span>
                )}
            </button>
        </div>
    )
}