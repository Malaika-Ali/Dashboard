import React, { useState } from 'react';
import { AddButton } from '../buttons';

let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
const AddNewMotor = ({ onClose, name }) => {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    factory: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 bg-gray-800 z-50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-transform duration-300 ease-in-out transform translate-y-0 -translate-y-ful"
    >
      <div className="bg-white rounded-lg shadow w-full max-w-md p-4 md:p-5">
        <div className="flex items-center justify-between border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">Add New {name} </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 md:p-5">
          {/* ... (rest of the form elements) */}

          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">
                {name} Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type Motor Name"
                required
              />
            </div>
      
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                Area
              </label>
              <select
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="" disabled>
                  Select Area
                </option>
                <option value="Area1">Area 1</option>
                <option value="Area2">Area 2</option>
                <option value="Area3">Area 3</option>
                <option value="Area4">Area 4</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                Factory
              </label>
              <select
                id="factory"
                name="factory"
                value={formData.factory}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="" disabled>
                  Select Factory
                </option>
                <option value="Factory1">Factory 1</option>
                <option value="Factory2">Factory 2</option>
                <option value="Factory3">Factory 3</option>
                <option value="Factory4">Factory 4</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900">
                Floor 
              </label>
              <select
                id="floor"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="" disabled>
                  Select Floor
                </option>
                <option value="Floor1">Floor 1</option>
                <option value="Floor2">Floor 2</option>
                <option value="Floor3">Floor 3</option>
                <option value="Floor4">Floor 4</option>
              </select>
            </div>
           
          </div>

<AddButton name={name}/>
        </form>
      </div>
    </div>
  );
};

export default AddNewMotor;
