import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { makeAuthenticatedRequest } from "../api/apiService";

const AddProduct = () => {
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    quantity: "",
    image: null as File | null,
  });
  const { accessToken } = useContext(AuthContext) as AuthContextType;

  const token = accessToken.accessToken;
  console.log(token, "token");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0]; // Get the first selected file
    setFile(selectedFile!); // Update the file state
    setFormData((prevData) => ({
      ...prevData,
      image: selectedFile || null, // Update the image property in formData
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Make POST request using Axios
      console.log(formData, "formData");
      const response = await makeAuthenticatedRequest(
        "POST",
        "/product/create",
        token!,
        formData,
        { "Content-Type": "multipart/form-data" } // Set content type to multipart/form-data
      );
      console.log("Response:", response.data); // Log response data
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        category: "",
        price: 0,
        quantity: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show message to user, etc.)
    }
  };

  return (
    <>
      <div>Add Product</div>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none"
            />
          </div>
          {/* //--------------file drop zone------- */}
          <div className="relative border border-dashed border-gray-300 rounded-lg overflow-hidden">
            <input
              type="file"
              id="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="file"
              className="block py-10 text-center text-gray-500 border-gray-300 border-2 cursor-pointer"
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>Select Image</span>
              )}
            </label>
          </div>
          {/* //--------------end file drop zone------- */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-neutral-800 text-xs hover:bg-neutral-900 text-white px-3 py-2 rounded-md shadow-md"
            >
              Save
            </button>
          </div>
          {/* <div>
            <input
              style={{ display: "none", cursor: "pointer" }}
              type="file"
              id="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              // onChange={(e) => setFile(e.target.files![0])}
            />
            <label
              htmlFor="file"
              style={{
                cursor: "pointer",
                border: "1px solid white",
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              Image
            </label>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Selected"
                style={{ height: "400px", borderRadius: "20px" }}
              />
            )}
            <br />
          </div> */}
        </form>
      </div>
    </>
  );
};

export default AddProduct;
