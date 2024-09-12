import { useEffect, useState } from 'react';
import './ChatButton.css'
import ChatContent from './ChatContent';
import { GetAllStores, GetAllStoresChat } from '../../services/apiServices';

const ChatButton = (props) => {
    const {showChat, setShowChat} = props;
    const [showChatContent, setShowChatContent] = useState(false);
    const [stores, setStores] = useState([]);


    useEffect (() => {
        fetchAllStores();
    },[]);

    const fetchAllStores = async () => {
        let res = await GetAllStoresChat();
        if (res.EC === 0) {
            // Thêm thuộc tính `online` vào từng đối tượng
            const updatedStores = res.DT.map(store => ({
                ...store,
                online: false // Giá trị mặc định cho thuộc tính `online`
            }));
            setStores(updatedStores);
        }
    };

    const fetchChat = () => {
        setShowChat(!showChat);
    }
    return (
        <div>

            {showChat && (
                <div className="chat-button" onClick={() => { setShowChat(!showChat) }}>
                    <button>Chat</button>
                </div>
            )}
            {!showChat &&

                <ChatContent setShowChatContent={setShowChatContent}
                    showChatContent={showChatContent}
                    fetchChat = {fetchChat}
                    stores = {stores}
                    setStores = {setStores}
                />
            }
        </div>
    )
};

export default ChatButton;