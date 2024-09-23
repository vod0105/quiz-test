import { useEffect, useState } from 'react';
import './ChatButton.css'
import { useDispatch, useSelector } from "react-redux";
import ChatContent from './ChatContent';
import { GetAllStoresChat, GetUnRead } from '../../services/apiServices';
import { fetchUpdate, updateAllUserIsRead } from '../../redux/actions/storesAction';

const ChatButton = (props) => {
    const dispatch = useDispatch();
    const [newMessagesCount, setNewMessagesCount] = useState(1);
    const [showChat, setShowChat] = useState(false);
    const stores = useSelector((state) => state.stores.stores); // Lấy dữ liệu từ Redux store
    
    useEffect(() => {
        fetchAllStores();
        GetAllUnRead();
    }, []);

    useEffect(() => {
        // Lọc các mục có is_read là false
        const unreadMessages = stores.filter(store => store.is_read === false);
        // Cập nhật số lượng tin nhắn chưa đọc
        setNewMessagesCount(unreadMessages.length);
        console.log("sl chưa đọc: ",newMessagesCount)

    }, []); // Chạy lại khi stores thay đổi

    const GetAllUnRead = async () => {
        try {
            let res = await GetUnRead();
            if (res.EC === 0) {
                console.log("Lấy tin nhắn chưa đọc thành công");
    
                // Lấy danh sách người dùng có is_online là false
                const usersWithUnread = res.DT.filter(user => user.is_online === false);
    
                // Gửi thông tin người dùng chưa đọc đến Redux store
                dispatch(updateAllUserIsRead(usersWithUnread.map(user => user.id)));
            } else {
                console.error("Lỗi khi lấy tin nhắn chưa đọc:", res);
            }
        } catch (error) {
            console.error("Lỗi khi thực hiện GetAllUnRead:", error);
        }
    }

    const fetchAllStores = async () => {
        try {
            let res = await GetAllStoresChat();
            console.log("dl trả về", res);
            if (res.EC === 0) {
                const updatedStores = res.DT.map(store => ({
                    ...store,
                    online: false, // Giá trị mặc định cho thuộc tính `online`
                    is_online:true
                }));
                dispatch(fetchUpdate({ DT: updatedStores }));
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu cửa hàng:", error);
        }
    };

    return (
        <div>
            {/* Nút chat */}
            <div className={`chat-button ${showChat ? 'hidden' : 'visible'}`} onClick={() => setShowChat(!showChat)}>
                <button>Chat
                    {newMessagesCount > 0 && (
                        <span className="notification-badge">{newMessagesCount}</span>
                    )}
                </button>
            </div>

            {/* ChatContent luôn tồn tại trong DOM nhưng được ẩn */}
            <div className={`chat-content ${showChat ? 'visible' : 'hidden'}`}>
                <ChatContent
                    showChat={showChat}
                    setShowChat={setShowChat}
                    setNewMessagesCount={setNewMessagesCount}
                    newMessagesCount ={newMessagesCount}
                />
            </div>
        </div>
    )
};

export default ChatButton;