import React, { useState, useContext } from 'react';
import { AddButton } from '../buttons';
import axios from 'axios';
import { StateContext } from '../../contexts/ContextProvider';



let API_URL = process.env.REACT_APP_USERS_API;

const AddNewMotor = ({ areas_list,  onClose, name }) => {
  const [open, setOpen] = useState(false);
  const { setLoading}=useContext(StateContext);

  const [formData, setFormData] = useState({

    name: '',
    area: '',
    factory: '',
    floor: '',
  });
  const [factories, setFactories] = useState([]);
  const [floors, setFloors] = useState([]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'area') {
      fetchFactories(value);
      setFloors([]); // Reset floors when area changes
    }

    if (name === 'factory') {
      fetchFloors(value);
    }
  };




  const fetchFactories = async (areaId) => {
    try {
      const response = await axios.get(`${API_URL}get_factories/${areaId}`);
      setFactories(response.data);
    } catch (error) {
      console.error('Error fetching factories:', error);
    }
  };

  const fetchFloors = async (factoryId) => {
    try {
      const response = await axios.get(`${API_URL}get_floors/${factoryId}`);
      setFloors(response.data);
    } catch (error) {
      console.error('Error fetching floors:', error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   onClose();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await axios.post(
        API_URL + 'add_motor',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
      
      setLoading(false)
      onClose();
    } catch (error) {
      console.error('Error adding motor:', error);
      setLoading(false)
      onClose();
    }
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
                type="text"
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
                {areas_list.map((area) => (
                  <option key={area.id} value={area.id}>{area.area_name}</option>
                ))}
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
                {factories.map((factory) => (
                  <option key={factory.id} value={factory.id}>{factory.factory_name}</option>
                ))}
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
                {floors.map((floor) => (
                  <option key={floor.floor_number} value={floor.floor_number}>{floor.floor_number}</option>
                ))}
              </select>
            </div>

          </div>

          <AddButton name={name} />
        </form>
      </div>
    </div>
  );
};

export default AddNewMotor;
















