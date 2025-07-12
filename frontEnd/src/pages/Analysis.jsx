import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import API from '../services/api'; 
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import Loader from '../components/Loader';

const StudentAnalytics = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [student, setStudent] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudentDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await API.get(`/student/${id}`);
            setStudent(res.data.student);
            toast.success('Student analytics data loaded!');
        } catch (err) {
            console.error('Failed to load student details for analytics:', err);
            setError('Failed to load student analysis data. Please check the ID or try again.');
            toast.error('Failed to load student details for analysis.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchStudentDetails();
        } else {
            setLoading(false);
            setError('No student ID provided for analysis.');
            toast.error('No student ID provided.');
        }
    }, [id]);

    const gradesData = student?.grades || [];

    let totalAttendanceDays = 0;
    let presentCount = 0;
    let absentCount = 0;

    if (student?.attendance?.length > 0) {
        totalAttendanceDays = student.attendance.length;
        presentCount = student.attendance.filter(day => day.status === 'Present').length;
        absentCount = student.attendance.filter(day => day.status === 'Absent').length;
    }

    const attendanceChartData = totalAttendanceDays > 0
        ? [
            { name: 'Present', value: presentCount },
            { name: 'Absent', value: absentCount }
        ]
        : [{ name: 'No Data', value: 1 }];

    const COLORS = ['#4CAF50', '#F44336', '#BDBDBD'];

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[calc(100vh-4.5rem)] py-8 px-4'>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-6 text-center text-lg text-red-600 bg-white shadow-lg rounded-lg">
                {error}
                <p className="mt-4">Please ensure the student ID is valid and try again.</p>
                <button
                    onClick={() => navigate('/students')}
                    className='mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300'
                >
                    Back to Students
                </button>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-6 text-center text-lg text-gray-700 bg-white shadow-lg rounded-lg">
                Student data not found.
                <button
                    onClick={() => navigate('/students')}
                    className='mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300'
                >
                    Back to Students
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Analytics for {student.firstName} {student.lastName}
            </h2>

            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/students')}
                    className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md text-lg'
                >
                    Back to Students
                </button>
            </div>

            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Grades by Subject</h3>
                {gradesData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={gradesData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                                dataKey="subject"
                                tickLine={false}
                                axisLine={{ stroke: '#ccc' }}
                                style={{ fontSize: '0.75rem' }}
                                interval={0}
                                angle={-30}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                domain={[0, 100]}
                                tickLine={false}
                                axisLine={{ stroke: '#ccc' }}
                                style={{ fontSize: '0.75rem' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                labelStyle={{ color: '#333' }}
                                itemStyle={{ color: '#333' }}
                                formatter={(value) => [`${value} points`, 'Score']}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="score" fill="#4299E1" name="Score" barSize={30} radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500 py-4 text-lg">No grade data available for this student.</p>
                )}
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Attendance Summary</h3>

                {totalAttendanceDays > 0 ? (
                    <>
                        <div className="mb-6 text-center text-gray-700 text-xl font-medium">
                            <p>Total Days Recorded: <span className="font-bold text-gray-900">{totalAttendanceDays}</span></p>
                            <p className="text-green-600">Present: <span className="font-bold">{presentCount}</span></p>
                            <p className="text-red-600">Absent: <span className="font-bold">{absentCount}</span></p>
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={attendanceChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) =>
                                        name !== 'No Data' ? `${name} (${(percent * 100).toFixed(0)}%)` : ''
                                    }
                                >
                                    {
                                        attendanceChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} days`, name]} />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                ) : (
                    <p className="text-center text-gray-500 py-4 text-lg">No attendance data available for this student.</p>
                )}
            </div>
        </div>
    );
};

export default StudentAnalytics;
