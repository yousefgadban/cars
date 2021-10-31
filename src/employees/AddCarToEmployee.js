import React, { useState, useEffect } from "react";
import {GetAllCars, UpdateCurrentUser} from '../api/carsAPI';
import { UpdateEmployeeCar } from '../api/employeeAPI';
import Spinner from "../Spinner/Spinner";



export const AddCarToEmployee = ({employee, closePopUp, assignCarToEmployeeFromParent}) => {

    const [allCars, setAllCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(()=>{
        console.log(employee);
        GetAllCars().then((response)=>{
            console.log(response.data);
            setAllCars(response.data);
        });
    }, []);


    const onCarSelected = (car) => {
        console.log('onCarSelected', car); 
        setSelectedCar(car);
    }

    const assignCarToEmployee = () => {
        if (selectedCar) {
            console.log('onCarSelected', employee.id, selectedCar.id, selectedCar.name);
            
            
            setShowLoader(true)

            let params = {
                car: selectedCar.id
            }
            UpdateEmployeeCar(employee.id, params).then((response)=>{
                console.log(response.data);
                
                let params = {
                    currentUser: employee.id
                }
                UpdateCurrentUser(selectedCar.id, params).then((response)=>{
                    console.log(response.data);
                    setShowLoader(false);
                    assignCarToEmployeeFromParent(employee.id, selectedCar.id)
                    closePopUp()
                })

            })
        }
        
    }



    return(
        <div style={{width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '16px'}}>
            <div style={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',  borderRadius: '16px', padding: '16px', display: showLoader ? 'none' : 'flex'}}>
                <p style={{color: '#2196f3', fontSize: '20px', marginTop: '12px'}}>Add car to employee</p>
                <div style={{height: '360px', overflowY: 'auto'}}>
                    {
                        allCars.map((car)=>{
                            if (car.currentUser === '') {  

                                if (employee && employee.isManager && car.isManager) {
                                    return (
                                        <div key={car.id}
                                            style={{display: 'flex', alignItems: 'center', justifyContent: 'start', border: '1px solid #333', width: '300px',  backgroundColor: (selectedCar && car.id === `${selectedCar.id}`) ? '#2196f3': 'white'}}
                                            onClick={(e) => {onCarSelected(car, e)}}>
                                            <div style={{width: '70px', height: '70px', marginRight: '10px', background: `url(https://source.unsplash.com/200x200/?cars,${car.name})`}}>
            
                                            </div>
                                            <div style={{}}>
                                                <div>Car Number: <span style={{color: '#333'}}>{car.id}</span></div>
                                                <div>Car Name: <span>{car.name}</span></div>
                                            </div>
            
                                        </div>
                                    )
                                } else if (employee && !employee.isManager && employee.isSenior && car.isSenior) {
                                    return (
                                        <div key={car.id}
                                            style={{display: 'flex', alignItems: 'center', justifyContent: 'start', border: '1px solid #333', width: '300px',  backgroundColor: (selectedCar && car.id === `${selectedCar.id}`) ? '#2196f3': 'white'}}
                                            onClick={(e) => {onCarSelected(car, e)}}>
                                            <div style={{width: '70px', height: '70px', marginRight: '10px', background: `url(https://source.unsplash.com/200x200/?cars,${car.name})`}}>
            
                                            </div>
                                            <div style={{}}>
                                                <div>Car Number: <span style={{color: '#333'}}>{car.id}</span></div>
                                                <div>Car Name: <span>{car.name}</span></div>
                                            </div>
            
                                        </div>
                                    )
                                
                                } else if (employee && !employee.isManager && !employee.isSenior && !car.isSenior) {
                                    return (
                                        <div key={car.id}
                                            style={{display: 'flex', alignItems: 'center', justifyContent: 'start', border: '1px solid #333', width: '300px',  backgroundColor: (selectedCar && car.id === `${selectedCar.id}`) ? '#2196f3': 'white'}}
                                            onClick={(e) => {onCarSelected(car, e)}}>
                                            <div style={{width: '70px', height: '70px', marginRight: '10px', background: `url(https://source.unsplash.com/200x200/?cars,${car.name})`}}>
            
                                            </div>
                                            <div style={{}}>
                                                <div>Car Number: <span style={{color: '#333'}}>{car.id}</span></div>
                                                <div>Car Name: <span>{car.name}</span></div>
                                            </div>
            
                                        </div>
                                    )
                                }   
                            }
                        })
                    }
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
                    <input 
                        type='button' 
                        value='CANCEL'
                        onClick={()=>{closePopUp()}}
                        style={{margin: '5px', padding: '5px', color: 'white', width: '70px', border: '1px solid #2196f3', borderRadius: '5px', backgroundColor: '#2196f3'}} />
                    <input 
                        type='button' 
                        value='ADD'
                        onClick={()=>{assignCarToEmployee()}}
                        style={{margin: '5px', padding: '5px', color: 'white', width: '70px', border: '1px solid #2196f3', borderRadius: '5px', backgroundColor: '#2196f3'}} />
                </div>
            </div>
            <div style={{display: !showLoader ? 'none' : 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} >
                <Spinner message={'Loading...'}/>
            </div>

        </div>
    );
} 