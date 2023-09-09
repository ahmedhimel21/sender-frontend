import React, { useEffect, useState } from "react";

const SendConsumerMessage = () => {
  const [smsCredits, setSmsCredits] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState("");

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/consumer/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, message, userId }),
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
    console.log(recipient, message, userId);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/consumer/send-sms",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ recipient, message, userId }),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("SMS sent successfully:", response.data.message);
  //       setRemainingSmsCredits(remainingSmsCredits - 1);
  //       setResponse(data.message);
  //       form.reset();
  //     } else {
  //       throw new Error("Failed to send SMS");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setResponse("Error sending SMS");
  //   }
  // };

  useEffect(() => {
    // Fetch remaining SMS credits for the current user (consumer)
    // axios
    //   .get(`/api/consumer/${userId}/remaining-sms-credits`)
    //   .then((response) => {
    //     setRemainingSmsCredits(response.data.remainingSmsCredits);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching remaining SMS credits:", error);
    //   });
    fetch(`/api/consumer/${userId}/remaining-sms-credits`)
      .then((response) => response.json())
      .then((data) => {
        setSmsCredits(data.remainingSmsCredits);
      })
      .catch((error) =>
        console.error("Error fetching message history:", error)
      );
  }, []);

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
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Consumer Dashboard</h2>
          <p className="mb-4">Sent SMS: {smsCredits}</p>
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
      </div>
    </>
  );
};

export default SendConsumerMessage;
