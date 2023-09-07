import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import signUpAnimation from "../../../public/signUp.json";
import rocketAnimation from "../../../public/rocket.json";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Provider/Authproviders";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { signInWithGoogle, createUser, user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const photo = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", photo);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        createUser(email, password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess("User has been created successfully");
            updateUserData(result.user, name, imageUrl);
            const savedUser = { name, email, image: imageUrl };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              });
            setError("");
            reset();
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
            setSuccess("");
          });
      });
    if (password !== confirmPassword) {
      alert("Please make sure your password are same!");
      return;
    }
  };
  //social login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // updateUser profile
  const updateUserData = (user, name, photoURL) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setSuccess("user profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={signUpAnimation} loop={true} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500">Name field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  placeholder="photo"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">email field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500">
                    Password must be less than 16 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase, one number and one special
                    character.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="confirm password"
                  className="input input-bordered"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />
              </div>
              <p
                onClick={() => setShow(!show)}
                className="my-3 text-md font-bold"
              >
                {show ? (
                  <span className="cursor-pointer	">Hide password!</span>
                ) : (
                  <span className="cursor-pointer	">Show password!</span>
                )}
              </p>
              <p className="text-red-600 mb-2">{error}</p>
              <p className="text-green-600 mb-2">{success}</p>
              <label className="label mt-3">
                <a href="#" className="label-text-alt link link-hover">
                  Already Have an account?{" "}
                  <Link to="/login" className="text-lg text-purple-500">
                    Login
                  </Link>
                </a>
              </label>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="signUp"
                />
              </div>
            </form>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-circle btn-outline mx-auto mb-3"
            >
              <FaGoogle></FaGoogle>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
