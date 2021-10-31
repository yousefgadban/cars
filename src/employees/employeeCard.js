import React, { useEffect, useState } from "react";
import { GetMemberData } from '../api/employeeAPI'

import '../App.css'

export const EmployeeCard = ({employeeData, onCarClicked}) => {

    const [employee, setEmployee] = useState(employeeData);
    const [member, setMember] = useState(null);
    
    useEffect(()=>{
        GetMemberData(employeeData.id).then((response)=>{
            setMember(response.data);
        });
    }, [])


    const onDeleteUserClicked = (e) => {
        console.log('onDeleteUserClicked ');
        e.stopPropagation();
    }

    const onEmployeeCarClicked = (e) => {
        console.log('onEmployeeCarClicked');
        e.stopPropagation();
        onCarClicked(member);
    }

    const onEmployeeCardClicked = (e) => {
        console.log('onEmployeeCardClicked', employee.id);
        
    }

    return (
        <div onClick={(e) => onEmployeeCardClicked(e)}>
            <div style={{border: '1px solid #333', borderRadius: '12px',  display: 'flex', alignItems: 'center'}}>
                <div style={{display:'flex', alignItems: 'center', width: '350px', justifyContent: 'space-between'}}>
                    <div style={{display:'flex', alignItems: 'center'}}>
                        <img className="account-profile-img" alt="" src={ employee ? employee.avatar : '' } />
                        <div style={{display:'flex', flexDirection: 'column'}}>
                            <div className="employee-card-name">{employee.name }</div>
                            <div style={{fontSize: '12px', color: '#707070'}}> {member ? (member.isManager ? 'Manager' : member.isSenior ? 'Senior' : 'Junior') : ''}</div>
                        </div>
                    </div>
                    
                    <div style={{margin: '4px'}}>
                        <i className="trash icon" onClick={(e)=>{onDeleteUserClicked(e)}} style={{color: 'red'}}></i>
                        <i className="edit outline icon" style={{color: '#2196f3'}}></i>
                        <i className={employee.isActive ? "play icon" : "pause icon"} style={{color: employee.isActive ? 'green' : '#707070'}}></i>
                        <i 
                            className="car icon" 
                            onClick={(e) => onEmployeeCarClicked(e)}
                            style={{color: (member && member.car !== '') ? '#00ab66' : '#c8c8c8'}}></i>
                    </div>
                </div>
                 
            </div>
        </div>
    );
}