import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiRefreshCw, FiMoreVertical, FiEye, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import axios from 'axios';

const JobGrid = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    experience: '',
    position: '',
    type: 'Full Time',
    status: 'Active',
    postedDate: '',
    lastDate: '',
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/jobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (isEdit) {
      setJobs(jobs.map(job => job.id === selectedJob.id ? { ...newJob, id: job.id } : job));
    } else {
      if (!Object.values(newJob).every(field => field)) {
        alert("Please fill in all fields.");
        return;
      }
      setJobs([...jobs, { ...newJob, id: Date.now() }]); 
    }
    setNewJob({
      jobTitle: '',
      companyName: '',
      location: '',
      experience: '',
      position: '',
      type: 'Full Time',
      status: 'Active',
      postedDate: '',
      lastDate: '',
    });
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleAddNewJob = () => {
    setIsEdit(false);
    setNewJob({
      jobTitle: '',
      companyName: '',
      location: '',
      experience: '',
      position: '',
      type: 'Full Time',
      status: 'Active',
      postedDate: '',
      lastDate: '',
    });
    setShowModal(true);
  };

  const handleView = (job) => {
    setSelectedJob(job);
    setShowViewModal(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsEdit(true);
    setNewJob(job);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setShowDeleteConfirm(false);
  };

  const filteredJobs = jobs.filter(job =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen p-6" style={{ paddingLeft: '7%', paddingRight: '3%' }}>
      <h1 className="text-xl font-bold text-white mb-4">JOBS GRID</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search your job"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="San Francisco, LA"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Job Categories"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Select time"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
          <div className="flex space-x-4 col-span-2">
            <button className="bg-blue-600 p-2 rounded text-white flex items-center w-full">
              <FaSearch className="mr-2" /> Find Jobs
            </button>
            <button className="bg-gray-600 p-2 rounded text-white flex items-center w-full">
              <FiMoreVertical className="mr-2" /> Advance
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 text-sm bg-gray-900">
        <div className="flex justify-between items-center mb-4 bg-gray-900 p-4 rounded">
          <div className="flex items-center">
            <h1 className="text-white text-lg">Jobs Lists</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNewJob}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
            >
              Add New Job
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              <FiRefreshCw />
            </button>
            <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700">
              <FiMoreVertical />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full bg-gray-800 text-white rounded">
            <table className="w-full bg-gray-800 text-white rounded">
              <thead>
                <tr>
                  <th className="py-2">No</th>
                  <th className="py-2">Job Title</th>
                  <th className="py-2">Company Name</th>
                  <th className="py-2">Location</th>
                  <th className="py-2">Experience</th>
                  <th className="py-2">Position</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Posted Date</th>
                  <th className="py-2">Last Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job, index) => (
                  <tr key={job.id} className="border-b border-gray-700">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{job.jobTitle}</td>
                    <td className="py-2 px-4">{job.companyName}</td>
                    <td className="py-2 px-4">{job.location}</td>
                    <td className="py-2 px-4">{job.experience}</td>
                    <td className="py-2 px-4">{job.position}</td>
                    <td className="py-2 px-4">{job.type}</td>
                    <td className="py-2 px-4">{job.postedDate}</td>
                    <td className="py-2 px-4">{job.lastDate}</td>
                    <td className="py-2 px-4">{job.status}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button onClick={() => handleView(job)}>
                        <FiEye className="text-blue-500" />
                      </button>
                      <button onClick={() => handleEdit(job)}>
                        <FiEdit className="text-yellow-500" />
                      </button>
                      <button onClick={() => { setJobToDelete(job.id); setShowDeleteConfirm(true); }}>
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-xl mb-4">{isEdit ? 'Edit Job' : 'Add New Job'}</h2>
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={newJob.jobTitle}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={newJob.companyName}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={newJob.experience}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={newJob.position}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <select
              name="type"
              value={newJob.type}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
            <select
              name="status"
              value={newJob.status}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="date"
              name="postedDate"
              placeholder="Posted Date"
              value={newJob.postedDate}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <input
              type="date"
              name="lastDate"
              placeholder="Last Date"
              value={newJob.lastDate}
              onChange={handleInputChange}
              className="mb-2 p-2 border w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                {isEdit ? 'Save Changes' : 'Add Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-xl mb-4">Job Details</h2>
            <p><strong>Job Title:</strong> {selectedJob.jobTitle}</p>
            <p><strong>Company Name:</strong> {selectedJob.companyName}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Experience:</strong> {selectedJob.experience}</p>
            <p><strong>Position:</strong> {selectedJob.position}</p>
            <p><strong>Type:</strong> {selectedJob.type}</p>
            <p><strong>Posted Date:</strong> {selectedJob.postedDate}</p>
            <p><strong>Last Date:</strong> {selectedJob.lastDate}</p>
            <p><strong>Status:</strong> {selectedJob.status}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this job?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(jobToDelete)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobGrid;
