import {useEffect, useState} from "react";
import AccountNav from "../components/AccountNav.jsx";
import axios from "axios";
import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
import BookingDates from "../components/BookingDates.jsx";


export default function BookingsPage() {
    const [bookings , setBookings] = useState([])
    useEffect(() => {
        axios.get("/bookings").then((response) => {
            const { data } = response ;
            setBookings(data) ;
        }).catch(error => console.log(error)) ;
    }, []);

    return (
        <div>
            <AccountNav />
            {bookings.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 p-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
                    <div className="w-48">
                        {booking.place.photos.length > 0 && (
                            <img className="rounded-xl aspect-square w-[192px] h-[128px] object-cover" src={`http://localhost:3500/uploads/${booking.place.photos?.[0]}`} alt=""/>
                        )}
                    </div>
                    <div className="py-3 pr-3 grow">
                        <h2 className="text-xl">{booking.place.title}</h2>
                        <BookingDates booking = {booking} className={"mb-2 mt-4 text-gray-500"} />
                        <div >
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-8" >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/>
                                </svg>
                                <span className="text-2xl font-semibold">
                                    Total price: {booking.price}$
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}