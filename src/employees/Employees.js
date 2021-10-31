import React, { useEffect, useRef, useState } from "react";
import { GetAllUsers , RemoveCarFromUser} from '../api/employeeAPI';
import { UpdateCurrentUser} from '../api/carsAPI';
import { AddCarToEmployee } from "./AddCarToEmployee";
import { EmployeeCard } from "./employeeCard";
import Spinner from "../Spinner/Spinner";

export const Employees = () => {

    const [allEmployees, setAllEmployees] = useState([]);
    const [showAddCar, setShowAddCar] = useState(false);
    const [showRemoveCar, setShowRemoveCar] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [fakeRender, setFakeRender] = useState(false);
    const [showDataLoader, setShowDataLoader] = useState(false);
    const selectedEmployee = useRef(null);

    useEffect(()=>{

        setShowDataLoader(true);
        GetAllUsers().then((response)=>{
            console.log(response.data);
            setAllEmployees(response.data);
            setShowDataLoader(false);
        });

    }, []);

    const onCarClicked = (employee) => {
        console.log('onCarClicked', employee);
        selectedEmployee.current = employee;
        console.log('selectedEmployee', selectedEmployee);
        if (employee.car !== '') {
            setShowRemoveCar(true)
        } else {
            setShowAddCar(true);
        }
        
    }

    const closePopUp = () => {
        console.log('closePopUp');
        setShowAddCar(false);
        setShowRemoveCar(false);
    }

    const onRemoveCarClicked = () => {
        console.log('onRemoveCarClicked ', selectedEmployee.current);
        setShowLoader(true);

        let params = {
            car: ''
        }
        RemoveCarFromUser(selectedEmployee.current.id, params).then((response)=>{
            console.log(response.data);
            let params = {
                currentUser: ''
            }
            UpdateCurrentUser(selectedEmployee.current.car, params).then((response)=>{
                console.log(response.data);

                setShowLoader(false);
                setShowAddCar(false);
                setShowRemoveCar(false);

                setAllEmployees([]);
                setAllEmployees(allEmployees);
            })
            
        });
    }

    const assignCarToEmployeeFromParent = (employeeId, carId) => {
        console.log('assignCarToEmployeeFromParent', employeeId, carId);
        //setFakeRender(!fakeRender);
        // let currentEmp = allEmployees.filter((emp) => {
        //     if (emp.id === carId) {
        //         return emp;
        //     }
        // });
        // currentEmp.isActive = !currentEmp.isActive
        setAllEmployees([]);
        setAllEmployees(allEmployees);
    }

    return (
        <div>
            <div style={{display: showDataLoader ? 'none' : 'grid' }}>
                <div className="manager-grid" style={{display: 'grid', paddingTop: '10px'}}>
                    {
                        allEmployees.map((emp) => {
                            return <EmployeeCard key={emp.id} employeeData={emp} onCarClicked={onCarClicked} />
                        })
                    }
                </div>
                <div style={{display: showAddCar ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100vw', height: '100vh', top: '0', left: '0'}}>
                    <div 
                        onClick={(e)=>{closePopUp()}}
                        style={{width: '100vw', height: '100vh', backgroundColor: 'black', opacity: 0.7, position: 'absolute', top: '0', left: '0' }}>

                    </div>
                    <div style={{width: '330px', height: '80vh', zIndex: '10'}}>
                        <AddCarToEmployee employee={selectedEmployee.current}  closePopUp={closePopUp} assignCarToEmployeeFromParent={assignCarToEmployeeFromParent} />
                    </div>
                </div>

                <div style={{display: showRemoveCar ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100vw', height: '100vh', top: '0', left: '0'}}>
                    <div 
                        onClick={(e)=>{closePopUp()}}
                        style={{width: '100vw', height: '100vh', backgroundColor: 'black', opacity: 0.7, position: 'absolute', top: '0', left: '0' }}>

                    </div>
                    <div style={{width: '330px', height: '25vh', zIndex: '10', backgroundColor: 'white', borderRadius: '16px'}}>
                        <div style={{display: showLoader ? 'none' : 'flex', width: '100%', height: '100%', backgroundColor: 'white',  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around',  padding: '16px', borderRadius: '16px'}}>
                            <p style={{color: 'red', fontSize: '20px'}}>Remove Car from user</p>
                            <p style={{color: '#333'}}>Sure u wanna remove car from user ??</p>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
                                <input 
                                    type='button' 
                                    value='CANCEL'
                                    onClick={()=>{closePopUp()}}
                                    style={{margin: '5px', padding: '5px', color: 'white', width: '70px', border: '1px solid #2196f3', borderRadius: '5px', backgroundColor: '#2196f3'}} />
                                <input 
                                    type='button' 
                                    value='REMOVE'
                                    onClick={()=>{onRemoveCarClicked()}}
                                    style={{margin: '5px', padding: '5px', color: 'white', width: '70px', border: '1px solid red', borderRadius: '5px', backgroundColor: 'red'}} />
                            </div>
                        </div>
                        
                        <div style={{display: !showLoader ? 'none' : 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} >
                            <Spinner message={'Loading...'}/>
                        </div>
                        
                    </div>
                </div>

            </div>

            <div style={{display: !showDataLoader ? 'none' : 'flex', width: '100vw', height: '92vh', alignItems: 'center', justifyContent: 'center'}}>
                <Spinner message={'Loading...'} />
            </div>
            
            
        </div>
        
    );
}