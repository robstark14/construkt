import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

function NewUser() {
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
  const companies = ['Comp1', 'Comp2', 'Comp3', 'Comp4', 'Comp5']
  const packages = ['BA101', 'BB102', 'BA412', 'BT101', 'BC222']

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <h1 className='font-bold text-3xl mb-6'>Create New User</h1>
    <div className="-mx-3 md:flex mb-6">
      <div className="md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
          First Name
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Jon"/>
        {/* <p className="text-red text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
          Last Name
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Snow"/>
      </div>
      <div className="md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
          Email
        </label>
        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="name@project.com"/>
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
  </div>
  )
}

export default NewUser