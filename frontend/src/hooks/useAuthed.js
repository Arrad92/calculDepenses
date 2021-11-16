import React from "react";
import { useSelector } from 'react-redux';
export const useAuthed = ()=>{
    const authed = useSelector((state)=>state.authentication.authed);
    return authed;
}