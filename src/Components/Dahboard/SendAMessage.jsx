import React, { useState } from "react";

const SendAMessage = () => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        form.reset();
      } else {
        throw new Error("Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
      setResponse("Error sending SMS");
    }
  };
  return (
    <>
      <div className="w-3/4 mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Send SMS</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-purple-700 font-semibold">
              Recipient
            </label>
            <input
              type="text"
              value={recipient}
              onChange={handleRecipientChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-purple-700 font-semibold">
              Message
            </label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send SMS
          </button>
        </form>
        {response && <p className="mt-4 text-red-500">{response}</p>}
      </div>
    </>
  );
};

export default SendAMessage;
