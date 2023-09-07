import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useConsumer } from "../Hooks/useConsumer";

const ConsumerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isConsumer, isConsumerLoading] = useConsumer();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return (
      <progress
        className="progress progress-primary w-56 lg:mx-[584px] lg:mt-56"
        value="100"
        max="100"
      ></progress>
    );
  }
  if (user && isConsumer) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default ConsumerRoutes ;