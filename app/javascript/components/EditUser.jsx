import React, { useEffect, useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const [userData, setUserData] = useState("")
  const navigate = useNavigate()
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email:"",
    password: "",
    showPassword: true,
    role: "",
    company: "",
    package: ""
  });

  const params = useParams()

  useEffect(() => {
      // console.log(userData);
    
    const fetchUser= async () =>{
      const apiEndpointGetUserData = `/api/edit-user/${params.id}`
        try{
            const response = await fetch(apiEndpointGetUserData)
            const data = await response.json()
            const dataObject = data['user']
            console.log(dataObject);
            console.log(data);
    
            setValues({
              showPassword: true,
              firstName: dataObject.first_name,
              lastName: dataObject.last_name,
              email:dataObject.email,
              password: dataObject.password,
              role: dataObject.role,
              company: dataObject.company_name,
              package: dataObject.package })
            
        } catch (err) {
            console.log(err);
        }
    }
      fetchUser()
  }, [])
  

  
  

  const updateUser= async () =>{

  const apiEndpointUpdate =`/api/update-user/${params.id}`


  const data = {
    "first_name": values.firstName,
    "last_name": values.lastName,
    "email": values.email,
    "password": values.password,
    "role": values.role,
    "company": values.company,
    "package": values.package
  }
      try{
          const response = await fetch(apiEndpointUpdate, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            
          })

          if (response.ok) {
            navigate("/users")
            navigate(0)
          } 
      } catch (err) {
          console.log(err.message);
      }
  
}



  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const roles= ["Admin", "Document Controller", "Vice President", "Project Manager", "Construction Manager", 
                "MEP Manager", "Consultant", "Site Engineer", "Site Architect", "QA/QC Engineer", "Contractor-Engineer",
                "Contractor-Architect", "Contractor-Manager", "Contractor-Doc-Controller","Contractor-Foreman", "Contractor-Leadman", "Vendor/Supplier"]
  const companies = ['Company A', 'Company B', 'Company C', 'Company D', 'Company E']
  const packages = ['BA101', 'BB102', 'BA412', 'BT101', 'BC222']

  return (
  
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <h1 className='font-bold text-3xl mb-6'>Edit User</h1>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
          First Name
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Jon" 
         onChange={(e) => {
          return setValues({ ...values, firstName: e.target.value });
        }}
        value={values.firstName}
        />
        {/* <p className="text-red text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
          Last Name
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Snow"
           onChange={(e) => {
            return setValues({ ...values, lastName: e.target.value });
          }}
          value={values.lastName}
        />
      </div>
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
          Email
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="name@project.com"
           onChange={(e) => {
            return setValues({ ...values, email: e.target.value });
          }}
          value={values.email}
        />
      </div>
    </div>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-full px-3">
        <label htmlFor="standard-adornment-password" className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        PASSWORD
      </label>
      <Input
        placeholder="******************"
        className="appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 w-[350px]"
        type={values.showPassword ? "text" : "password"}
        onChange={handlePasswordChange("password")}
        value={values.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      </div>
    </div>
    <div className="-mx-3 md:flex mb-2">
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
          Role
        </label>
        <div className="relative">
          <select className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state"
           onChange={(e) => {
            return setValues({ ...values, role: e.target.value });
          }}
          value={values.role}
          >
            {roles.map((role)=>(
            <option key={role} value={role}>{role}</option>))}
          </select>
          <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker right-0 bottom-3">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
          Company
        </label>
        <div className="relative">
          <select className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state"
           onChange={(e) => {
            return setValues({ ...values, company: e.target.value });
          }}
          value={values.company}
          >
            {companies.map((company)=>(
            <option key={company} value={company}>{company}</option>))}
          </select>
          <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker right-0 bottom-3">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>


      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
          Package
        </label>
        <div className="relative">
          <select className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state"
           onChange={(e) => {
            return setValues({ ...values, package: e.target.value });
          }}
          value={values.package}
          >
            {packages.map((item)=>(
            <option key={item} value={item}>{item}</option>))}
          </select>
          <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker right-0 bottom-3">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
      <button onClick={()=>updateUser()} type="submit" className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mb-2 mt-4 w-[150px]">Submit</button>
  </div>

  )
}

export default EditUser;