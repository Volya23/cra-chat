import React from 'react';
import DialogList from '../DialogList/DialogList';
import Chat from '../Chat/Chat';
import MessageArea from '../MessageArea/MessageArea';


const Dashboard = () => {
    return (
        <main>
           <DialogList/>
           <Chat/>
           <MessageArea/>
        </main>
    );
}

export default Dashboard;
