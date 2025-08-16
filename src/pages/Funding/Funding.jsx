import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import useAxioSecure from "../../utilitis/Hooks/useAxiosSecure.jsx"


const Funding = () => {
 const axiosSecure=useAxioSecure()

  const { data: funds = [], isLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funds");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 py-8">

        <title>funding</title>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Funds</h1>
        <Link to="/funding/give" className="btn btn-primary">
          Give Fund
        </Link>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={fund._id}>
                <td>{index + 1}</td>
                <td>{fund.userName}</td>
                <td>${fund.amount}</td>
                <td>{new Date(fund.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
