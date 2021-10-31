import React, { useState } from "react";
import {AddNewCar} from '../api/carsAPI';
import {  useHistory  } from 'react-router-dom';
import './newCar.css';


export const NewCar = () => {

    const [car, setCar] = useState('');
    const [job, setJob] = useState('manager');
    const history = useHistory();

    const onAddCarClicked = () => {
        console.log('onAddCarClicked ', car, job);

        if (car.trim() !== '') {

            let params = {
                name: car,
                isManager: job === 'Manager' ? true : false,
                isSenior: job === 'Senior' ? true : false,
                currentUser: ''
            }

            AddNewCar(params).then((response)=>{
                console.log(response.data);
                history.push(`/cars`);
            });
            
        } else {
            console.log('invalid input');
        }
    }

    return(
        <div style={{display: 'flex', width: '100vw', height: '92vh', alignItems: 'center', justifyContent: 'center'}}>
            <div id='addNewCarrr' style={{display: 'flex', flexDirection: 'column',   alignItems: 'center', justifyContent: 'space-around',   borderRadius: '20px'}}>
                <p style={{color: '#2196f3', fontSize: '28px'}}>Add new car</p>

                <div style={{display: 'flex', flexDirection: 'column', width: '80%',  justifyContent: 'center',   alignItems: 'start',  height: '50vh', width: '50vw', padding: '40px', backgrounColor: '#e5e5e5'}}>
                    <label>car: </label>
                    <input 
                        type='text'
                        value={car} 
                        onChange={(e)=>{setCar(e.target.value)}}
                        style={{width: '100%', height: '40px', margin: '16px 0'}} />
                </div>

                <select 
                    onChange={(e)=> {setJob(e.target.value)}}
                    style={{width: '80%', height: '40px'}}>
                    <option>Manager</option>
                    <option>Senior</option>
                    <option>Junior</option>
                </select>

                <input 
                    type='button' 
                    value='Add car'
                    onClick={(e) => {onAddCarClicked()}}
                    style={{backgroundColor: '#2196f3', border: '1px solid #2196f3', borderRadius: '8px', marginTop: '20px', padding: '10px 25px', color: 'white'}} />
            </div>
        </div>
    );
}