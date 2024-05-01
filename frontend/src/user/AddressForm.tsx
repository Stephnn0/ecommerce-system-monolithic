import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { createAddress } from "../api/ReactQuery";

type Props = {
  handlePopupToggle: () => void;
};

const AddressForm: React.FC<Props> = ({ handlePopupToggle }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    customerId: "",
  });

  const { accessToken } = useContext(AuthContext) as AuthContextType;
  const token = accessToken.accessToken;

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: (formData: any) => createAddress(token!, formData),
    onError: (err: any) => console.log("The error", err),
    onSuccess: () => {
      handlePopupToggle();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
      {/* Your pop-up form component here */}
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Address</h2>
          <button className="text-lg font-semibold" onClick={handlePopupToggle}>
            X
          </button>
        </div>
        <br />
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-20 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip"
            />
            <input
              type="text"
              className="m-2 py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            <br />

            <button className="bg-black text-white px-4 py-2 w-full  shadow-md hover:bg-gray-800">
              Add a new address
            </button>
          </form>
          {isError && <div>Error creating address</div>}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
