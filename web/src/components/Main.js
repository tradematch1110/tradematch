/*
              Main Component
    1. display the current page of the app
    2. handle routing
*/

import React, { useContext, useLayoutEffect } from "react";
// import NotFound from './../NotFound'
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import UserMessages from "./UserMessages";
import Product from "./Product";
import { authContext } from "./../contexts/AuthContext";
import MyProducts from "./MyProducts";
import UpdateProduct from "./UpdateProduct";
import AboutUs from "./AboutUs";
import ReportMessage from "./ReportMessage";
import FavouritesProducts from "./FavouritesProducts";
import PersonalArea from './PersonalArea';

const Main = () => {
  const { currentUser, setCurrentUser } = useContext(authContext);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about_us" element={<AboutUs />}></Route>
        <Route path="/product" element={<Product />}></Route>

        <Route
          path="/create_product"
          element={
            currentUser ? (
              <CreateProduct product={null} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        {currentUser && (
          <>
            <Route
              path="/user_messages"
              element={
                currentUser ? <UserMessages /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              path="/myProduct"
              element={currentUser ? <MyProducts /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/favouritesProducts"
              element={
                currentUser ? <FavouritesProducts /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              path="/updateProduct"
              element={
                currentUser ? (
                  <UpdateProduct />
                ) : (
                  <Navigate to="/updateProduct" />
                )
              }
            ></Route>
            <Route
              path="/PersonalArea"
              element={
                currentUser ? <PersonalArea /> : <Navigate to="/PersonalArea" />
              }
            ></Route>

            <Route
              path="/report_message"
              element={
                currentUser ? (
                  <ReportMessage />
                ) : (
                  <Navigate to="/report_message" />
                )
              }
              report_message
            ></Route>
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Main;
