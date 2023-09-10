import React, { useEffect, useState } from "react";
import Container from "../Container";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegCreditCard } from "react-icons/fa";

const ManageUsers = () => {
  const [credits, setCredits] = useState("");
  const [userId,setUserId] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const makeConsumer = (user) => {
    const userData = {
      name: user?.name,
      email: user?.email,
      image: user?.image,
    };
    fetch(`http://localhost:5000/users/consumer/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          fetch("http://localhost:5000/consumer", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is consumer now`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const makeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is admin now`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  useEffect(() => {
    fetch("http://localhost:5000/consumerCredits")
      .then((response) => response.json())
      .then((data) => {
        data.map((credits) => setCredits(credits.smsCredits));
      });
  }, [credits]);

  useEffect(() => {
    fetch(`http://localhost:5000/smsCredits/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        data.map((credits) => setCredits(credits.smsCredits));
      });
  }, [credits]);

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

  const handleSmsCredits = (id) => {
    fetch(`http://localhost:5000/smsCreditGrant/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <Container>
      <div className="mx-auto w-full">
        <h1 className="text-2xl font-bold my-4 text-center">All Users</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Reset Credits</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "consumer"
                    ? "consumer"
                    : "User"}
                </td>
                <td className="border px-4 py-2">
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      onClick={() => makeConsumer(user)}
                      disabled={user.role == "admin" || user.role == "consumer"}
                    >
                      Make Consumer
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => makeAdmin(user)}
                      disabled={user.role == "admin" || user.role == "consumer"}
                    >
                      Make Admin
                    </button>
                  </>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleSmsCredits(userId)}
                    disabled={user.role == "admin" || credits <= 49}
                  >
                    <FaRegCreditCard className="text-red-700"></FaRegCreditCard>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ManageUsers;
