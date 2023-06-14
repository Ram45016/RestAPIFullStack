import React from "react";
import { NavLink } from "react-router-dom";

const Navigation=()=>{
    return(
        <div>
            <NavLink to="/">DoctorAppointmentForm</NavLink>
            <NavLink to="/PatientTable">PatientTable</NavLink>
        </div>
    );
}

export default Navigation;