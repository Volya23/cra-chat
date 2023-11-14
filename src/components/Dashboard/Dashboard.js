import React, {useState, useReducer, useEffect} from 'react';
import DialogList from '../DialogList/DialogList';
import Chat from '../Chat/Chat';
import MessageArea from '../MessageArea/MessageArea';
import styles from './Dashboard.module.css';
import { UserContext } from '../../contexts/userContext';
import { getData } from '../../api';
import CONSTANTS from '../../contants';
const {ACTIONS} = CONSTANTS;

function reducer(state, action) {

}


const Dashboard = () => {
    const [user, setUser] = useState({
        id: 1,
        usenamw: 'c1234s',
        imageScr: 'https://robohash.org/c1234s'
    })

    const [state, dispatch] = useReducer(reducer, {
        messages: []
    })

    useEffect(() => {
        getData()
        .then((data) =>{
            dispatch({
                type: ACTIONS.DATA_LOAD_SUCCESS,
                payload: {
                    data
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: ACTIONS.DATA_LOAD_ERROR
            })
        })
    }, [])


    return (
        <UserContext.Provider>
            <main className={styles.container}>
                    <DialogList/>
                <section className={styles.wrapper}>
                    <Chat/>
                    <MessageArea/>  
                </section>
           
            </main>
        </UserContext.Provider>
    );
}

export default Dashboard;
