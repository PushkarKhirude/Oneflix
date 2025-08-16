import React, { useRef, useState } from "react";
import Header from "./Header";
import bgImg from "/backdrop.png";
import { checkValidationData } from "../utils/validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSetIsSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = () => {
    const errorMsg = checkValidationData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(errorMsg);
    if (errorMsg) return;

    //sign in / sign up logic
    if (isSignUp) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;

              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errMessage = error.message;
          // ..
          setErrorMessage(errorCode + "-" + errMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errMessage = error.message;
          setErrorMessage(errorCode + "-" + errMessage);
        });
    }
  };

  return (
    <div className="">
      <Header />
      <div className="backdrop absolute h-[60vh] w-auto  overflow-y-hidden overflow-x-hidden">
        <img src={bgImg} alt="" className="h-[60vh] md:h-auto" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black/80  rounded-lg text-white w-7/12 sm:w-6/12 md:w-5/12 lg:w-4/12 my-36 mx-auto right-0 left-0 p-12 "
      >
        <h1 className=" text-3xl font-bold py-4 ">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp ? (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className=" p-4 my-4  w-full bg-stone-600 rounded-lg"
          />
        ) : (
          ""
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className=" p-4 my-4  w-full bg-stone-600 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className=" p-4 my-4 w-full bg-stone-600 rounded-lg"
        />
        <p className="text-red-400 font-bold">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        <div className="text-sm">
          {isSignUp ? "Already registered?" : "Don't have an account?"}
          {isSignUp ? (
            <span
              onClick={handleSetIsSignUp}
              className="hover:cursor-pointer text-blue-400"
            >
              {" "}
              Sign In now.{" "}
            </span>
          ) : (
            <span
              onClick={handleSetIsSignUp}
              className="hover:cursor-pointer text-blue-400"
            >
              {" "}
              Sign Up now.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
