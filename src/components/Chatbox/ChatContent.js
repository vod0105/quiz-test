import {useRef,useCallback, useEffect, useState } from 'react';
import ChatHistory from './ChatHistory';
import { GetAllStores, GetAllStoresChat } from '../../services/apiServices';

const ChatContent = (props) => {
    const { showChatContent, setShowChatContent, fetchChat, stores, setStores } = props;
    const [selectedUser, setSelectedUser] = useState(stores && stores.length > 0 ? stores[0] : '');
    const [isOnline, setIsOnline] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [loadStores, setLoadStores] = useState(false);
    const [filteredUsers,setFilteredUsers] = useState([]);
    const searchRef = useRef(null);  // Tạo ref cho ô input
    useEffect(() => {
        console.log("is: ",isOnline);
        // Update the `online` status of stores based on `isOnline` array
        setStores(prevStores =>
            prevStores.map(store =>
                isOnline.includes(store.id) ? { ...store, online: true } : { ...store, online: false }
            )
        );
        console.log("Người dùng đang on: ", stores);
    }, [isOnline]);

    useEffect(() => {
        console.log("Load lại stores");
        fetchAllStores();
    }, [stores.length]);

    const fetchAllStores = async () => {
        let res = await GetAllStores();
        if (res.EC === 0) {
            setUsers(res.DT);
        }
    }

    const handleClickChatContent = () => {
        setShowChatContent(!showChatContent);
        fetchChat();
    };

    const changeUserLocation = (idReceiver) => {
        console.log('locale Store1: ', stores)

        // Trường hợp tìm thấy người dùng trong stores hiện tại
        const index = stores.findIndex(u => u.id === idReceiver);
        if (index !== -1) {
            const selectU = stores[index];
            const newStores = [selectU, ...stores.slice(0, index), ...stores.slice(index + 1)];
            console.log('new Store: ', newStores)
            console.log('locale Store2: ', stores)
            setStores(newStores);
            
        } else {
            // Nếu không tìm thấy, load lại stores
            handleLoadStores();
            console.log('Không tìm thấy người dùng');
        }
    }

    const handleClickUser = (user) => {
        setSelectedUser(user);
    }

    const handleChangeInput = useCallback((e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term === "") {
            // When searchTerm is empty, set filteredUsers to all users
            setFilteredUsers(stores);
        } else {
            // Filter users based on searchTerm
            setFilteredUsers(users.filter(user =>
                user.user_name.toLowerCase().includes(term.toLowerCase())
            ));
        }
    }, [users]);

    const handleLoadStores = () => {
        loadStoreAgain();
    }

    const loadStoreAgain = async () => {
        console.log("Online users: ", isOnline);
        let res = await GetAllStoresChat();
        if (res.EC === 0) {
            // Giữ nguyên trạng thái online của các stores
            const updatedStores = res.DT.map(store => ({
                ...store,
                online: isOnline.includes(store.id)
            }));
            setStores(updatedStores);
        }
    }

    const handleClickNewUser = (user) => {
        setSelectedUser(user);
        alert(selectedUser);
        const exists = users.some(u => u.id === user.id && u.user_name === user.user_name);
        if (!exists) setLoadStores(true);
        setSearch(false);
        setSearchTerm('');
    }

    // Hàm cập nhật trạng thái online của một store
    const updateStoreOnlineStatus = (storeId, onlineStatus) => {
        setStores(prevStores =>
            prevStores.map(store =>
                store.id === storeId ? { ...store, online: onlineStatus } : store
            )
        );
    };

    const handleClickOutside = useCallback((e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setSearch(false);  // Đóng danh sách tìm kiếm khi nhấp chuột ra ngoài
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="container-chat">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <button className="chat-close" onClick={handleClickChatContent}>X</button>
                        <div id="plist" className="people-list">
                            <div className="input-group" ref={searchRef}>
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChange={(e) => handleChangeInput(e)}
                                    onClick={() => setSearch(true)}
                                />
                            </div>
                            <ul className="list-unstyled chat-list mt-2 mb-0">
                                {search === false && stores && stores.length > 0 &&
                                    stores.map((item, index) => (
                                        <li key={index} className="clearfix" onClick={() => handleClickUser(item)}>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                            <div className="about">
                                                <div className="name">{item.user_name}</div>
                                                <div className="status"> <i className={`fa fa-circle ${item.online === true ? 'online' : 'offline'}`}></i> {item.online === true ? "online" : "offline"} </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                {search === true && filteredUsers && filteredUsers.length > 0 && filteredUsers.map((item, index) => (
                                    <li key={index} className="clearfix" onClick={() => handleClickNewUser(item)}>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">{item.user_name}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ChatHistory
                            selectedUser={selectedUser}
                            changeUserLocation={changeUserLocation}
                            updateStoreOnlineStatus={updateStoreOnlineStatus}
                            setIsOnline={setIsOnline}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
