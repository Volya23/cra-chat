import React, {useState, useReducer, useEffect} from 'react';
import Chat from '../Chat/Chat';
import DialogList from '../DialogList/DialogList';
import MessageArea from '../MessageArea/MessageArea';
import styles from './Dashboard.module.css';
import { UserContext } from '../../contexts/userContext';
import { getData } from '../../api';
import { reducer } from '../../reducers';
import CONSTANTS from '../../constants';
const {ACTIONS} = CONSTANTS;

const Dashboard = () => {
    const [user, setUser] = useState({
        username: 'c123s',
    })

    const [state, dispatch] = useReducer(reducer, {
        messages: [],
        error: null
    })

    useEffect(() => {
        getData()
        .then((data) => {
            dispatch({
                type: ACTIONS.DATA_LOAD_SUCCESS,
                payload: {
                    data
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: ACTIONS.DATA_LOAD_ERROR,
                payload: {
                    error
                }
            })
        })
    }, [])

    const createMessage = (text) => {
        const {messages} = state;
        const newMessage = {
            body: text,
            id: messages.length + 1,
            user
        }
        dispatch({
            type: ACTIONS.ADD_NEW_MESSAGE,
            payload: {
                newMessage
            }
        })
    }

    return (
        <UserContext.Provider value={user}>
            <main className={styles.container}>
            <DialogList /> {/* row */}
            <section className={styles.wrapper}>
                <Chat dialog={state.messages} /> {/* column */}
                <MessageArea addMessage={createMessage} /> {/* column */}
            </section>
        </main>
        </UserContext.Provider>
    );
}

export default Dashboard;
