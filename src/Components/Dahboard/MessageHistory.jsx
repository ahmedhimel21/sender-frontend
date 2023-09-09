import React, { useEffect, useState } from "react";

const MessageHistory = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [empty,setEmpty] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/message-history")
      .then((response) => response.json())
      .then((data) => data.map(history =>{
        setMessageHistory(history);
      }))
      .catch((error) =>
        console.error("Error fetching message history:", error)
      );
  }, []);
  console.log(messageHistory);

  return (
    <>
      <div className="bg-gray-100 w-3/4 py-8 rounded">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4 ml-4">Message History</h2>
         
        </div>
      </div>
    </>
  );
};

export default MessageHistory;
