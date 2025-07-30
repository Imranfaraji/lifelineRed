import React, { useContext, useState } from "react";
import useRole from "../../../utilitis/Hooks/useRole";
import Loading from "../../../pages/Loading/Loading";
import Welcome from "../WelcomeSection/Welcome";
import useAxiosSecure from "../../../utilitis/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosPublic from "../../../utilitis/Hooks/useAxiosPublic.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [topRequest, setTopRequest] = useState([]);
  const [modalId, setModalId] = useState(null);

  const { data: profile = {}, isPending } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/three-request?email=${user?.email}`);
      setTopRequest(res.data);
      return res.data;
    },
  });

  const handleStatue = (id, newStatus) => {
    axiosPublic
      .patch(`/updateRequest/${id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("status update successfully");
        }
      });
  };

  const handleDelete = (id) => {
    axiosPublic.delete(`/requestDelete/${id}`).then((res) => {
      if (res.data.deletedCount) {
        toast.success("Request deleted successfully");
        document.getElementById("my_modal_3").close();

        const remainingRequest = topRequest.filter((req) => req._id !== id);
        setTopRequest(remainingRequest);
      }
    });
  };

  if (isPending) return <Loading></Loading>;

  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <Welcome></Welcome>

      <div>
        {role == "admin" && <div></div>}
        {role == "donor" && topRequest && topRequest.length > 0 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Your recent donation request
            </h1>

            <div className="overflow-x-auto mt-10 rounded-box border border-base-content/5 bg-base-100">
              <table className="table ">
                {/* head */}
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th>Index</th>
                    <th>recipient name</th>
                    <th>recipient location</th>
                    <th>donation date</th>
                    <th>donation time</th>
                    <th>blood group</th>
                    <th>donation status</th>
                    <th>edit/delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {topRequest.map((topreq, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>{topreq.recipientName}</th>
                      <th>
                        {topreq.recipientDistrict},{topreq.recipientUpazila}
                      </th>
                      <th>{topreq.donationDate}</th>
                      <th>{topreq.donationTime}</th>
                      <th>{topreq.bloodGroup}</th>
                      <th>
                        {topreq.requestStatus}
                        {topreq.requestStatus == "inprogress" && (
                          <div className="mt-1 space-x-1">
                            <button
                              onClick={() =>
                                handleStatue(topreq._id, "canceled")
                              }
                              className="text-xs p-1 bg-red-600 text-white cursor-pointer rounded"
                            >
                              cancel
                            </button>
                            <button
                              onClick={() => handleStatue(topreq._id, "done")}
                              className="text-xs p-1 bg-green-600 text-white cursor-pointer rounded"
                            >
                              Done
                            </button>
                          </div>
                        )}
                      </th>
                      <th className="space-x-1">
                        <Link
                          to={`/dashboard/request-details/${topreq._id}`}
                          className="text-xs p-1 bg-green-600 text-white cursor-pointer rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => {
                            setModalId(topreq._id);
                            document.getElementById("my_modal_3").showModal();
                          }}
                          className="text-xs p-1 bg-red-600 text-white cursor-pointer rounded"
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full text-center mt-10 mb-4">
              <Link to={"/dashboard/my-donation-requests"} className="cta">
                See all
              </Link>
            </div>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Do you want to delete this request?</p>
                <button className="btn" onClick={() => handleDelete(modalId)}>
                  Delete
                </button>
              </div>
            </dialog>
          </div>
        )}
        {role == "volunteer" && <div></div>}
      </div>
    </div>
  );
};

export default DashboardHome;
