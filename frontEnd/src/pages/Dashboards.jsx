import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'; 
import API from '../services/api';
import Loader from '../components/Loader';

const Dashboards = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await API.get('/allstudent');
            console.log(res.data.students);
            setStudents(res.data.students);
        } catch (error) {
            console.log('error', error);
            
        } finally {
            setLoading(false);
        }
    };

    const totalClass = () => {
        const uniqueClasses = new Set(students.map(student => student.className));
        return uniqueClasses.size;
    };

    const getChartData = () => {
        const map = {};
        students.forEach(s => {
            map[s.className] = (map[s.className] || 0) + 1;
        });
     
        return Object.entries(map).map(([className, count]) => ({ className, count }));
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className='max-w-6xl  mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-lg'> 
           
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
                <h1 className='text-3xl font-extrabold text-gray-800 text-center sm:text-left flex-grow'>Dashboard</h1>
                {/* <div className='flex items-center justify-center rounded'>
                    <input
                        type="date"
                        value={new Date().toISOString().split('T')[0]}
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                </div> */}
            </div>

            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
                <div className='w-full py-4 rounded flex flex-col items-center justify-center bg-sky-200 shadow-md'>
                    <p className="text-lg font-semibold text-gray-800">Date</p>
                    <p className="text-2xl font-bold text-blue-700">{new Date().toISOString().split('T')[0]}</p> 
                </div>
                <div className='w-full py-4 rounded flex flex-col items-center justify-center bg-sky-200 shadow-md'>
                    <p className="text-lg font-semibold text-gray-800">Total Students</p>
                    <p className="text-2xl font-bold text-blue-700">{students.length}</p>
                </div>
                <div className='w-full py-4 rounded flex flex-col items-center justify-center bg-sky-200 shadow-md'>
                    <p className="text-lg font-semibold text-gray-800">Total Classes</p>
                    <p className="text-2xl font-bold text-blue-700">{totalClass()}</p>
                </div>
            </div>

            {/* Bar Chart Section */}
            <div className="flex flex-col justify-center items-center mb-6 gap-4"> 
                <h2 className="text-xl font-bold mt-10 mb-2 text-gray-800">Student Count by Class</h2>
                <div className="w-full h-80"> 
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="className" />
                            <YAxis allowDecimals={false} /> 
                            <Tooltip />
                            <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboards;