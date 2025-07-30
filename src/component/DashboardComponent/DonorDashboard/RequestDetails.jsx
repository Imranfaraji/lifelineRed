import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../pages/Loading/Loading";
import useAxiosPublic from "../../../utilitis/Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const RequestDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState({});

  const [isEditable, setIsEditable] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upajelas, setUpajelas] = useState([]);
  const [districtId, setDistrictId] = useState("");

  const [districtName, setDistrictName] = useState("");

  const axiosPublic=useAxiosPublic()

  const districtFilter = districts.filter(
    (disFil) => disFil.name === districtName
  );

  useEffect(() => {
    districtFilter.map((disId) => {
      setDistrictId(disId.id);
    });
  });

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
    fetch("/upajelas.json")
      .then((res) => res.json())
      .then((data) => {
        const filterUpajela = data.filter((x) => x.district_id == districtId);
        if (filterUpajela) {
          setUpajelas(filterUpajela);
        }
      });
  }, [setDistricts, setUpajelas, districtId]);

  const { data: profile = {}, isPending } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://lifeline-red-server.vercel.app/details/${id}`
      );
      setDetails(res.data);
      return res.data;
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const form =e.target
    const formData=new FormData(form)
    const updateData=Object.fromEntries(formData.entries())

    axiosPublic.patch(`/details/${id}`,updateData).then(res=>{
        if(res.data.modifiedCount){
            toast.success('update SuccessFully')
        }
    })
    
  };

  if (isPending) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-full bg-red-50 py-16 min-h-screen flex items-center justify-center">
      <div className="responsive">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Update Donation Request
        </h2>

        <button onClick={() => setIsEditable(true)} className="cta">
          edit
        </button>
        <form
          onSubmit={handleUpdate}
          className=" flex flex-col gap-3 mt-5 text-white "
        >
          <label className=" text-sm font-bold text-gray-800">
            Requester name
          </label>
          <input
            type="text"
            name="requesterName"
            className="input text-red-400 text-sm font-medium w-full"
            value={user?.displayName}
            readOnly
          />

          <label className=" text-sm font-bold text-gray-800">
            Requester Email
          </label>
          <input
            type="email"
            name="requesterEmail"
            readOnly
            className="input text-red-400 text-sm font-medium w-full"
            value={user?.email}
          />

          <label className=" text-sm font-bold text-gray-800">
            Recipient name
          </label>
          <input
            type="text"
            name="recipientName"
            required
            className="input text-red-400 text-sm font-medium w-full"
            disabled={!isEditable}
            defaultValue={details.recipientName}
          />

          <label className=" text-sm font-bold text-gray-800">
            Recipient district
          </label>
          <select
            type="text"
            name="recipientDistrict"
            required
            className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
            onChange={(e) => setDistrictName(e.target.value)}
            disabled={!isEditable}
            defaultValue={districtName || details.recipientDistrict}
            placeholder="District"
          >
            <option value="">select district</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <label className=" text-sm font-bold text-gray-800">
            Recipient upazila
          </label>

          <select
            type="text"
            name="recipientUpazila"
            required
            disabled={!isEditable}
            className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
            defaultValue={details.recipientUpazila}
          >
            <option value="select your upajela">select your upajela</option>
            {upajelas.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <label className=" text-sm font-bold text-gray-800">
            Hospital name
          </label>
          <input
            type="text"
            name="hospitalName"
            required
            disabled={!isEditable}
            className="input text-red-400 text-sm font-medium w-full"
            defaultValue={details.hospitalName}
          />

          <label className=" text-sm font-bold text-gray-800">
            Full address line
          </label>
          <input
            type="text"
            name="fullAddress"
            disabled={!isEditable}
            required
            className="input text-red-400 text-sm font-medium w-full"
            defaultValue={details.fullAddress}
          />

          <label className=" text-sm font-bold text-gray-800">
            Blood Group
          </label>
          <select
            type="text"
            name="bloodGroup"
            required
            disabled={!isEditable}
            className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
            defaultValue={details.bloodGroup}
            placeholder="District"
          >
            <option value="select your Blood Group">select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A_">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label className=" text-sm font-bold text-gray-800">
            Donation date
          </label>
          <input
            type="date"
            name="donationDate"
            required
            disabled={!isEditable}
            className="input text-red-400 text-sm font-medium w-full"
            defaultValue={details.donationDate}
          />
          <label className=" text-sm font-bold text-gray-800">
            Donation time
          </label>
          <input
            type="time"
            name="donationTime"
            required
            className="input text-red-400 text-sm font-medium w-full"
            defaultValue={details.donationTime}
            disabled={!isEditable}
          />
          <label className=" text-sm font-bold text-gray-800">
            Request message
          </label>
          <textarea
            type="time"
            name="requestMessage"
            required
            className="input text-red-400 text-sm font-medium w-full"
            defaultValue={details.requestMessage}
            disabled={!isEditable}
          />

          <button
            disabled={!isEditable}
            type="submit"
            className="btn bg-red-500 text-white border-none w-full mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDetails;
