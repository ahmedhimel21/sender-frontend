import React from "react";
import Lottie from 'lottie-react';
import error from '../../../public/error.json'
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/path/to/image.jpg)" }}
      >
        <div className="text-center">
          <Lottie animationData={error} loop={true} className="w-[500px]"></Lottie>
        <Link to='/'>
        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Go back to homepage</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;