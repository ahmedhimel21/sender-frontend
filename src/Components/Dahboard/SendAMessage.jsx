import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SendAMessage = () => {
  const [response, setResponse] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit  = async (data) => {
   const recipient = data.recipient;
   const message = data.message;

    try {
      const response = await fetch("http://localhost:5000/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, message }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.message);
        reset();
      } else {
        throw new Error("Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
      setResponse("Error sending SMS");
    }
    console.log(recipient,message)
  };
  return (
    <>
      <div className="w-3/4 mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">
          Send SMS
        </h2>
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
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </form>
        {response && <p className="mt-4 text-red-500">{response}</p>}
      </div>
    </>
  );
};

export default SendAMessage;
