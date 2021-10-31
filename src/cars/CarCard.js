import React, { useEffect, useState, useRef } from "react";
import Spinner from "../Spinner/Spinner";
import {DeleteCar} from '../api/carsAPI';


export const CarCard = ({carData, updateList}) => {

    const [car, setCar] = useState(carData);
    const [showDeleteCarPopUp, setShowDeleteCarPopUp] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const selectedEmployee = useRef(null);

    useEffect(()=>{
        
    }, [])

    const onDeleteCarClicked = () => {
        console.log('onDeleteCarClicked', car.id);

        if (car.currentUser === '') {
            console.log('start delete');

            setShowDeleteCarPopUp(true);
            

        } else {
            console.log('You have to unassign car before you deleting it');
        }
    }

    const onCancelClicked = () => {
        console.log('onCancelClicked');
        setShowLoader(false);
        setShowDeleteCarPopUp(false);
    }

    const onDeleteCarConfirmationClicked = () => {
        console.log('onDeleteCarConfirmationClicked', car.id);
        setShowLoader(true);
        

        DeleteCar(car.id).then((response) => {
            console.log(response.data);
            setShowDeleteCarPopUp(false);
            setShowDeleteCarPopUp(false);

            updateList(car.id);
        });
    }

    return (
        <div style={{border: '1px solid #333', width: '350px'}}>
            <div style={{display: showDeleteCarPopUp ? 'none' : 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <div style={{width: '100px', height: '100px', marginRight: '10px', background: `url(https://source.unsplash.com/200x200/?cars,${car.name})`}}>

                </div>
                <div style={{width: '200px'}}>
                    <div>Car Number: <span style={{color: '#333'}}>{car.id}</span></div>
                    <div>Car Name: <span>{car.name}</span></div>
                    <div style={{fontSize: '12px', color: '#707070'}}> {car ? (car.isSenior && car.isManager ? 'Manager' : car.isSenior ? 'Senior' : 'Junior') : ''}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px'}}>
                    <i className="trash icon" onClick={(e)=>{onDeleteCarClicked(e)}} style={{color: 'red'}}></i>
                    <i className="check circle icon" style={{color: car.currentUser !== '' ? 'green' : '#c8c8c8'}}></i>
                </div>

            </div>
            <div style={{display: !showDeleteCarPopUp  ? 'none' : 'flex', height: '100px', width: '350px', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: showLoader ? 'none' : 'flex', flexDirection: 'column', height: '100px', width: '350px', alignItems: 'center', justifyContent: 'center', padding: '0px 12px'}}>
                    <p style={{color: '#333'}}>Sure u wanna delete car ??</p>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
                        <input 
                            type='button' 
                            value='CANCEL'
                            onClick={()=>{onCancelClicked()}}
                            style={{margin: '5px', padding: '5px', color: 'white', width: '70px', border: '1px solid #2196f3', borderRadius: '5px', backgroundColor: '#2196f3'}} />
                        <input 
                            type='button' 
                            value='DELETE'
                            onClick={()=>{onDeleteCarConfirmationClicked()}}
                            style={{margin: '5px', padding: '5px', color: 'white', width: '70px', border: '1px solid red', borderRadius: '5px', backgroundColor: 'red'}} />
                    </div>
                </div>
                <div style={{display: !showLoader ? 'none' : 'flex', height: '100px', width: '350px', alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner />
                </div>
            </div>
        </div>
            
    );
}