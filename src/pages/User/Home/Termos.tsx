import { useEffect, useState, useContext } from "react";
import Header from "../../../components/Header";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";


const Termos = () => {
    const { state } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (state.userOn === false) {
            navigate('../userlogin')
        }
    }, [state.userOn])


    return (
        <>
        <Header />
        <h1>Termos</h1>
        </>
    )
}


export default Termos;