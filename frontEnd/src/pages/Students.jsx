import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedClass, setSelectedClass] = useState('All');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const res = await API.get('/allstudent');
            setStudents(res.data.students);
        } catch (error) {
            toast.error('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await API.delete(`/student/${id}`);
            setStudents((prev) => prev.filter((s) => s._id !== id));
            toast.success('Student deleted');
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const analyse = (id) => {
        navigate(`/analysis-student/${id}`);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) return <Loader />;

    const allClasses = [...new Set(students.map((s) => s.className))];

    const filtered = students.filter((student) => {
        const matchClass = selectedClass === 'All' || student.className === selectedClass;
        const matchSearch =
            student.firstName.toLowerCase().includes(search.toLowerCase()) ||
            student.className.toLowerCase().includes(search.toLowerCase());
        return matchClass && matchSearch;
    });

    return (
        <div className='max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg'>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
                <h2 className='text-2xl font-bold text-gray-800 text-center sm:text-left'>All Students</h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <select
                        className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="All">All Classes</option>
                        {allClasses.map((cls, idx) => (
                            <option key={idx} value={cls}>
                                {cls}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search by name or class..."
                        className="w-full flex-grow border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => navigate('/add-student')}
                        className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow"
                    >
                        Add Student
                    </button>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-gray-600 text-center py-10">No students found.</p>
            ) : (
                <div className="overflow-x-auto h-[400px] overflow-y-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="text-left px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">Name</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">Roll No.</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">Class</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold uppercase whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((student) => (
                                <tr key={student._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        <NavLink to={`/studentDetails/${student._id}`} className="hover:underline">
                                            {student.firstName} {student.lastName}
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap">{student.rollno}</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap">{student.className}</td>
                                    <td className="px-4 py-3 text-center flex flex-wrap justify-center gap-1.5 sm:gap-2">
                                        <button
                                            onClick={() => navigate(`/edit-student/${student._id}`)}
                                            className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => analyse(student._id)}
                                            className="bg-orange-600 text-white px-2 py-1 text-sm rounded-md hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 whitespace-nowrap"
                                        >
                                            Analyse
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Students;
