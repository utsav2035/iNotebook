import React from 'react'
import Notes from './Notes'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";



export const Home = (props) => {
    const { showAlert } = props;
    return (
        <div>

            <Notes showAlert={showAlert} />
        </div>

    )
}
