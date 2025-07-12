import React, { useEffect, useState, useCallback } from 'react'; 
import API from '../services/api';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import Loader from '../components/Loader'; 


const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; 
    });
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    
    const countAttendance = useCallback((studentsData, className, date) => {
        let present = 0;
        let absent = 0;

        if (!studentsData || studentsData.length === 0 || !className || !date) {
            setPresentCount(0);
            setAbsentCount(0);
            return;
        }

        const filteredStudents = studentsData.filter((s) => s.className === className);

        filteredStudents.forEach((s) => {
            const entry = s.attendance.find((a) => a.date === date);
            if (entry) {
                if (entry.status && entry.status.toLowerCase() === 'present') {
                    present++;
                } else if (entry.status && entry.status.toLowerCase() === 'absent') {
                    absent++;
                }
            }
        });

        setPresentCount(present);
        setAbsentCount(absent);
    }, []); 

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError(null); 
            const res = await API.get('/allstudent');
            const studentList = res.data.students;
            setStudents(studentList);
            extractClasses(studentList);
          
        } catch (err) {
            console.error('Error fetching students for attendance:', err);
           
            setError('Could not load student data.');
        } finally {
            setLoading(false);
        }
    };

    const extractClasses = (studentsData) => {
        const unique = [...new Set(studentsData.map((s) => s.className))];
        setClassList(unique);

        if (!selectedClass || !unique.includes(selectedClass)) {
            setSelectedClass(unique[0] || '');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []); 

    useEffect(() => {
       
        countAttendance(students, selectedClass, selectedDate);
    }, [students, selectedClass, selectedDate, countAttendance]); 

    const chartData = [
        { name: 'Present', value: presentCount },
        { name: 'Absent', value: absentCount },
    ];

   
    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[calc(100vh-4.5rem)] py-8 px-4'> {/* Min height adjusted for Navbar */}
                <Loader />
            </div>
        );
    }

 
    if (error) {
        return (
            <div className='flex flex-col justify-center items-center min-h-[calc(100vh-4.5rem)] text-red-600 p-4'>
                <p className='text-xl font-bold mb-4 text-center'>{error}</p>
                <button
                    onClick={fetchStudents}
                    className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300'
                >
                    Retry
                </button>
            </div>
        );
    }

   
    return (
        <div className="max-w-4xl  mx-auto mt-4 sm:mt-6 lg:mt-8 p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">Daily Attendance Summary</h2> 

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8"> 
               
                <div>
                    <label htmlFor="classSelect" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2">Select Class</label> 
                    <select
                        id="classSelect"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg" 
                    >
                        {classList.length > 0 ? (
                            classList.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))
                        ) : (
                            <option value="">No classes found</option>
                        )}
                    </select>
                </div>

        
                <div>
                    <label htmlFor="dateInput" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2">Select Date</label> {/* Responsive text size and margin */}
                    <input
                        id="dateInput"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg" 
                    />
                </div>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div className="bg-green-50 p-5 rounded-lg shadow-md text-center"> 
                    <h3 className="text-xl font-bold text-green-700 mb-2">Present Students</h3>
                    <p className="text-3xl sm:text-4xl font-extrabold text-green-900">{presentCount}</p> 
                </div>
                <div className="bg-red-50 p-5 rounded-lg shadow-md text-center"> 
                    <h3 className="text-xl font-bold text-red-700 mb-2">Absent Students</h3>
                    <p className="text-3xl sm:text-4xl font-extrabold text-red-900">{absentCount}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-10 p-4 bg-gray-50 rounded-lg shadow-md"> 
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center">Attendance Overview</h3> 
                {selectedClass ? ( 
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}> 
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> 
                            <XAxis dataKey="name" tickLine={false} axisLine={false} /> 
                            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} /> 
                            <Bar dataKey="value" fill="#3b82f6" barSize={60} radius={[10, 10, 0, 0]} /> 
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500 text-lg">Select a class to view attendance chart.</p>
                )}
            </div>

            {classList.length === 0 && !loading && !error && (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-center">
                    <p className="font-semibold">No classes available. Please add students to see attendance data.</p>
                </div>
            )}
        </div>
    );
};

export default Attendance;