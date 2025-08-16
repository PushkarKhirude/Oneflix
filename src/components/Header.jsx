import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import logo from "/oneflixlogo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  //console.log(user);
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/oneflix/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/oneflix/");
      }
    });

    //unsubscribe when component unmounts
    return () => unsub();
  }, []);

  return (
    <div className="absolute z-10 px-8 py-2 bg-gradient-to-b from-black w-full flex justify-between">
      <img className="w-50 m-2" src={logo} alt="logo" />
      {user && (
        <div className="flex">
          <h1 className="text-white text-xl p-2 m-4">{user.displayName}</h1>
          <button
            className="text-xl text-white p-2 m-2 rounded-lg bg-red-700"
            onClick={handleSingOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
