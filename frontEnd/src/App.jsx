
import './App.css'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import Analysis from './pages/Analysis'
import PrivateRoute from './components/PrivateRoute'
import StudentDetails from './pages/StudentDetails';
import Home from './components/Home/Home'
import Students from './pages/Students'
import Dashboards from './pages/Dashboards'
import Attendance from './pages/Attendance'
import Settings from './pages/Settings'



function App() {

  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
         <Route path='/dashboards'
         element={
          <PrivateRoute>
            <Dashboards/>
        </PrivateRoute>}/>
        <Route path='/students' element={
          <PrivateRoute>
            <Students/>
          </PrivateRoute>
        }/>
        <Route path='/attendance' element={
          <PrivateRoute>
            <Attendance/>
          </PrivateRoute>
        }/>
        <Route path='/settings' element={
          <PrivateRoute>
            <Settings/>
          </PrivateRoute>
        }/>
        <Route path='/add-student' element={
          <PrivateRoute>
            <AddStudent/>
        </PrivateRoute>}/>
        <Route path='/edit-student/:id' element={
          <PrivateRoute>
            <EditStudent/>
        </PrivateRoute>}/>
        <Route path='/analysis-student/:id' element={
          <PrivateRoute>
            <Analysis/>
        </PrivateRoute>}/>
        <Route path='/studentDetails/:id' element={
          <PrivateRoute>
          <StudentDetails/>
        </PrivateRoute>}/>
        </Route>


        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
       
        
       

      </Routes>
    </BrowserRouter>
    <ToastContainer position='top-right' autoClose={3000} />
    </>
  )
}

export default App
