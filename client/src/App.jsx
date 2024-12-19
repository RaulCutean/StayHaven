import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx"
import LayoutOutlet from "./Layout/LayoutOutlet.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RecoverAccountPage from "./pages/RecoverAccountPage.jsx";
import NewPasswordPage from "./pages/NewPasswordPage.jsx";
import EnterConfirmationCodePage from "./pages/EnterConfirmationCodePage.jsx";

import axios from "axios";
import {UserContextProvider} from "./UserContext/UserContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
function App() {

    axios.defaults.baseURL = "http://localhost:3500" ;
    axios.defaults.withCredentials = true;
  return (
      <UserContextProvider>
            <Routes>
                <Route path="/" element = {<LayoutOutlet/>} >
                    <Route path ="/login" element={<LoginPage />} />
                    <Route path = "/register" element={<RegisterPage />} />
                    <Route index element={<IndexPage/>} />
                    <Route path =  "/recover"  element={<RecoverAccountPage/>}/>
                    <Route path =  "/recover/code"  element={<EnterConfirmationCodePage/>}/>
                    <Route path ="/recover/new" element={<NewPasswordPage/>} />
                    <Route path ="/account" element = {<ProfilePage />} />
                    <Route path ="/account/places" element = {<PlacesPage />} />
                    <Route path ="/account/places/new" element = {<PlacesFormPage />} />
                    <Route path ="/account/places/:id" element = {<PlacesFormPage />} />
                    <Route path = "/place/:id" element={<PlacePage />} />
                    <Route path = "/account/bookings" element={<BookingsPage />} />
                    <Route path = "/account/bookings/:id" element={<BookingPage />} />

                </Route>
            </Routes>
      </UserContextProvider>

  )
}

export default App
