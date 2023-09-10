import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const SendConsumerMessage = () => {
  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const recipient = data.recipient;
    const message = data.message;

    try {
      const response = await fetch(
        "http://localhost:5000/api/consumer/send-sms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipient, message, userId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponse(data.message);
        refetch();
        reset();
      } else {
        throw new Error("Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
      setResponse("Error sending SMS");
    }
    console.log(recipient, message, userId);
  };

  const [axiosSecure] = useAxiosSecure();
  const { data: credits = [], refetch } = useQuery(["credits"], async () => {
    const res = await axiosSecure.get(`/smsCredits/${userId}`);
    return res.data;
  });

  useEffect(() => {
    fetch("http://localhost:5000/consumer")
      .then((response) => response.json())
      .then((data) => {
        data.map((user) => setUserId(user._id));
      })
      .catch((error) =>
        console.error("Error fetching message history:", error)
      );
  }, []);
  console.log(credits);
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Consumer Dashboard</h2>
          <p className="mb-4">Sent SMS: {credits.smsCredits}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Recipient</span>
              </label>
              <input
                type="text"
                placeholder="Enter phone Number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                {...register("recipient", { required: true })}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                type="text"
                placeholder="Message"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                {...register("message", { required: true })}
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Send"
                className="btn btn-primary"
                disabled={credits.smsCredits === 50}
              />
            </div>
          </form>
          {response && <p className="mt-4 text-red-500">{response}</p>}
        </div>
      </div>
    </>
  );
};

export default SendConsumerMessage;
