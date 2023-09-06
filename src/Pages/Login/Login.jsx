import { useContext, useState } from "react";
import Lottie from "lottie-react";
import logInAnimation from "../../../public/loginAnimation.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/Authproviders";

const Login = () => {
  const { signInWithGoogle,signIn, auth } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    signIn(email, password)
      .then((r) => {
        const loggedUser = r.user;
        console.log(r);
        navigate(from, { replace: true });
        setError("");
        setSuccess("Login Successfully");
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSuccess("");
      });
  };
  //social login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        const savedUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
        };
      
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={logInAnimation} loop={true} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                <p
                  className=" mt-5 font-semibold text-md"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <span className="cursor-pointer	">Hide password!</span>
                  ) : (
                    <span className="cursor-pointer	">Show password!</span>
                  )}
                </p>
                <p className="text-red-600">{error}</p>
                <label className="label mt-3">
                  <a href="#" className="">
                    New to Sender?{" "}
                    <Link to="/signUp" className="text-2xl text-purple-500">
                      SignUp
                    </Link>
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
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

export default Login;
