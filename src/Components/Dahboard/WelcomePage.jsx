import React from "react";
import { useAuth } from "../../hooks/useAuth";
import welcome from '../../../public/welcome.json';
import Lottie from 'lottie-react';

const WelcomePage = () => {
  const {user} = useAuth();
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Hey, {user?.displayName} 
        </h1>
        <Lottie animationData={welcome} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default WelcomePage;