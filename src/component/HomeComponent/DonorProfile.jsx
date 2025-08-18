import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DonorProfile = () => {
  const { id } = useParams();

  // Fetch donor data
  const { data: donor, isLoading, isError } = useQuery({
    queryKey: ["donor", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/donor/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load donor profile</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <div className="flex flex-col items-center">
        <img
          src={donor.photoUrl}
          alt={donor.userName}
          className="w-32 h-32 rounded-full object-cover border-4 border-red-500"
        />
        <h2 className="text-2xl font-bold mt-4">{donor.userName}</h2>
        <p className="text-gray-600">{donor.email}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold">Blood Group</h3>
          <p className="text-red-600 font-bold">{donor.bloodGroup}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold">District</h3>
          <p>{donor.district}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold">Upazila</h3>
          <p>{donor.upajela}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold">Role</h3>
          <p className="capitalize">{donor.role}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold">Status</h3>
          <p className={donor.status === "active" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {donor.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
