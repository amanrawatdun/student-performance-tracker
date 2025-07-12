import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await API.get(`/student/${id}`);
        setStudent(res.data.student);
      } catch (err) {
        console.error('Failed to load student details:', err);
        toast.error('Failed to load student details. Please try again.');
        setError('Could not load student details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudentDetails();
    else {
      setError('No student ID provided.');
      setLoading(false);
    }
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${student.firstName} ${student.lastName}'s Report`, 14, 20);

    doc.setFontSize(12);
    doc.text(`Roll No: ${student.rollno}`, 14, 30);
    doc.text(`Class: ${student.className}`, 14, 38);
    doc.text(`Email: ${student.contactInfo?.email || 'N/A'}`, 14, 46);
    doc.text(`Phone: ${student.contactInfo?.phone || 'N/A'}`, 14, 54);

    let finalY = 65;

    if (student.grades?.length > 0) {
      doc.text('Grades:', 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [['Subject', 'Score']],
        body: student.grades.map(g => [g.subject, g.score]),
      });
      finalY = doc.lastAutoTable.finalY + 10;
    }

    if (student.attendance?.length > 0) {
      doc.text('Attendance:', 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [['Date', 'Status']],
        body: student.attendance.map(a => [
          new Date(a.date).toLocaleDateString(),
          a.status,
        ]),
      });
      finalY = doc.lastAutoTable.finalY + 10;
    }

    if (student.remarks?.length > 0) {
      doc.text('Remarks:', 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [['Date', 'Remark']],
        body: student.remarks.map(r => [
          new Date(r.date).toLocaleDateString(),
          r.text,
        ]),
      });
    }

    doc.save(`${student.firstName}_${student.lastName}_Report.pdf`);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-4.5rem)] py-8 px-4'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[calc(100vh-4.5rem)] text-red-600 p-4'>
        <p className='text-xl font-bold mb-4 text-center'>{error}</p>
        <button
          onClick={() => navigate('/dashboards')}
          className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300'
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-4.5rem)] p-4'>
        <p className='text-xl text-gray-600 text-center'>No student data available.</p>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto mt-6 p-6 bg-white shadow-xl rounded-lg space-y-6'>
      <h1 className='text-3xl font-extrabold text-gray-900 text-center'>
        {student.firstName} {student.lastName}'s Profile
      </h1>

      <section className='bg-gray-50 p-5 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b pb-2'>Personal Information</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
          <p><span className='font-semibold'>Roll No:</span> {student.rollno}</p>
          <p><span className='font-semibold'>Class:</span> {student.className}</p>
          <p><span className='font-semibold'>Email:</span> {student.contactInfo?.email || 'N/A'}</p>
          <p><span className='font-semibold'>Phone:</span> {student.contactInfo?.phone || 'N/A'}</p>
        </div>
      </section>

      <section className='bg-gray-50 p-5 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b pb-2'>Grades</h2>
        {student.grades?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Subject</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.grades.map((g, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{g.subject}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{g.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className='text-gray-600'>No grades recorded for this student.</p>}
      </section>

      <section className='bg-gray-50 p-5 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b pb-2'>Attendance</h2>
        {student.attendance?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.attendance.map((a, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {new Date(a.date).toLocaleDateString()}
                    </td>
                    <td className={`px-4 py-3 text-sm font-semibold ${a.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                      {a.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className='text-gray-600'>No attendance recorded for this student.</p>}
      </section>

      <section className='bg-gray-50 p-5 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b pb-2'>Remarks</h2>
        {student.remarks?.length > 0 ? (
          <div className="space-y-3">
            {student.remarks.map((r, i) => (
              <div key={i} className="p-3 bg-white border border-gray-200 rounded-md">
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-semibold">Date:</span> {new Date(r.date).toLocaleDateString()}
                </p>
                <p className="text-gray-800">{r.text}</p>
              </div>
            ))}
          </div>
        ) : <p className='text-gray-600'>No remarks recorded for this student.</p>}
      </section>

      <div className='flex justify-center gap-4 mt-6'>
        <button
          onClick={downloadPDF}
          className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300'
        >
          Download Report PDF
        </button>
        <button
          onClick={() => navigate('/students')}
          className='bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-800 transition duration-300'
        >
          Back to Students
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
