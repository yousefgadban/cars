import React, { useEffect, useState } from "react";
import {GetAllCars} from '../api/carsAPI';
import { CarCard } from "./CarCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useHistory  } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";
 
export const Cars = () => {

    const history = useHistory();
    const [allCars, setAllCars] = useState([]);
    const [showDataLoader, setShowDataLoader] = useState(false);

    const notify = (message) => toast.dark(message);

    useEffect(()=>{
        setShowDataLoader(true);
        GetAllCars().then((response)=>{
            console.log(response.data);
            setAllCars(response.data);
            setShowDataLoader(false);
        });
    }, [])

    const updateList = (removedId) => {
        console.log('updateList', removedId);

        notify("Deleted successfully!");

        let updatedAllCars = allCars.filter((car) => {
            if (car.id !== removedId) {
                return car;
            }
        });

        setAllCars(updatedAllCars);
    }

    const onAddCarClicked = () => {
        console.log('onAddCarClicked');
        history.push(`/newCar`);
    }

    return (
        <div>

            <div style={{display: showDataLoader ? 'none' : 'grid' }}>
                <div className="manager-grid" style={{ height: '92vh', paddingTop: '10px', overflowY: 'auto'}}>
                    {
                        allCars.map((car) => {
                            return <CarCard key={car.id} carData={car} updateList={updateList} />
                        })
                    }
                </div>
                <ToastContainer />
                <div 
                    onClick={()=>{onAddCarClicked()}}
                    style={{position: 'absolute', bottom: '20px', right: '20px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#2196f3', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <p style={{color: 'white', fontSize: '32px'}}>+</p>
                </div>
            </div>

            <div style={{display: !showDataLoader ? 'none' : 'flex', width: '100vw', height: '92vh', alignItems: 'center', justifyContent: 'center'}}>
                <Spinner message={'Loading...'} />
            </div>
            
        </div>
        
    );
}
