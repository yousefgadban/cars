import React, { useEffect, useState, useRef } from "react";
import { GetAllUsers, GetMemberData } from '../api/employeeAPI';
import { GetAllCars } from '../api/carsAPI';


export const Assign = () => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [employeesData, setEmployeesData] = useState([]);
    const [carsData, setCarsData] = useState([]);
    const [finalArray, setFinalArray] = useState([]);

    let carsArray = [];
    let fArr = [];

    useEffect(() => {
        GetAllCars().then((response)=>{
            
            let cars = response.data.map((car) => {
                return  {...car,...{emploee: '', assigned: false}}
            });
            console.log('cars', cars);
            carsArray = cars;
            setCarsData(cars);

            GetAllUsers().then((response) => {

                let users = response.data.map((user) => {
                    GetMemberData(user.id).then((memRes)=>{
                        let s = {...user,...memRes.data,...{assigned: false}}
                        fArr.push(s)
                        setFinalArray(fArr)
                        console.log('sss', s);
                        return user
                    });
                    
                });
               console.log('users', users);
                
                setEmployeesData(users);
                setDataLoaded(true);
            });

        });
    }, []);

    useEffect(() => {
        console.log('data loaded', dataLoaded);

        if (dataLoaded) {
            console.log('start assingment');
            // employeesData.forEach(emp => {
            //     GetMemberData(emp.id).then((response)=>{
            //         console.log('emp', response.data);
            //         carsArray.forEach(car => {
            //                 if (!car.assigned) {
            //                     if(emp.isManager && car.isManager) {
            //                         car.assigned = true;
            //                         car.emploee = emp.id;
            //                     }
            //                 }
            //         });
            //     });
            // });

            //console.log('assign', carsArray);
        }

    }, [dataLoaded]);

    useEffect(() => {
        console.log('finalArray', finalArray, finalArray.length, employeesData.length);

        if (finalArray.length === employeesData.length && employeesData.length !== 0) {
            console.log('lets start');

            finalArray.forEach(emp => {
                carsData.forEach(car => {
                    if (!car.assigned) {
                        if(emp.isManager && car.isManager) {
                            car.assigned = true;
                            car.emploee = emp.id;
                        }
                    }
                });
            });

            console.log('carsArray', carsData);

        }

    }, [finalArray]);

    return (
        <div>
            Assign
        </div>
    );
}