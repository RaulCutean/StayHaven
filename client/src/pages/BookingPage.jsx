import BookingsPage from "./BookingsPage.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import BookingDates from "../components/BookingDates.jsx";


export default function BookingPage() {
    const {id} = useParams();
    const [booking , setBooking] = useState(null);
    useEffect(() => {
            if(!id) {
                return ;
            }
            axios.get(`/bookings`).then((response) => {
                const foundBooking = response.data.find(({_id}) => _id === id) ;
                if(foundBooking) {
                    setBooking(foundBooking);
                }
            }).catch(err => {
                console.log(err) ;
            })
    } , [id])
    if(!booking) {
        return "Loading..."
    }
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className={"my-2 block"}>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl text-center">
                    <div>
                        Total price:
                    </div>
                    <div className="text-3xl">
                        {booking.price}$
                    </div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}