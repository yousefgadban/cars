import React from "react";
import { Link } from "react-router-dom";
import './header.css'

export const Header = () => { 

 
  
    return (
        <div style={{backgroundColor: '#2196f3', width:'100vw', display: 'flex', alignItems: 'center', color: 'white', height: '8vh'}}>
            <div style={{margin: '0px 0px', display: 'flex'}}>

                <Link 
                    className="headerLink" 
                    to="/" >Home</Link>
                <Link
                    className="headerLink" 
                    to="/employees">Employees</Link>
                <Link
                    className="headerLink" 
                    to="/cars">Cars</Link>
             
            </div>
        </div>
    );
    
}