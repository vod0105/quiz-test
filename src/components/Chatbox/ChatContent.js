import {useRef,useCallback, useEffect, useState } from 'react';
import ChatHistory from './ChatHistory';
import { GetAllStores, GetAllStoresChat } from '../../services/apiServices';
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdate } from '../../redux/actions/storesAction';


const ChatContent = (props) => {
    const { setNewMessagesCount, newMessagesCount, setShowChat } = props;
    const stores = useSelector((state) => state.stores.stores); // Lấy dữ liệu từ Redux store
    const [selectedUser, setSelectedUser] = useState(stores && stores.length > 0 ? stores[0] : '');
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [loadStores, setLoadStores] = useState(false);
    const [filteredUsers,setFilteredUsers] = useState([]);
    const searchRef = useRef(null);  // Tạo ref cho ô input
    const dispatch = useDispatch();

    const fetchAllStoress = async () => {
        let res = await GetAllStoresChat();
        if (res.EC === 0) {
            // Thêm thuộc tính `online` vào từng đối tượng
            const updatedStores = res.DT.map(store => ({
                ...store,
                online: false // Giá trị mặc định cho thuộc tính `online`
            }));
            dispatch(fetchUpdate({ DT: updatedStores }));
        }
    };

    useEffect(() => {
        console.log("stores thay ddoi: ",stores)
    },[stores])

    // useEffect (() => {
    //     if (stores.length>0){
    //         setSelectedUser(stores[0]);
    //     }
    // },[showChat])

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
        setShowChat(false);
    };

    const changeUserLocation = (idReceiver) => {   
        console.log("stores change: ",stores)
    // // Tìm kiếm người dùng trong stores
    const index = stores.findIndex(u => u.id === idReceiver);

    if (index !== -1) {
        const selectU = stores[index];
        const newStores = [selectU, ...stores.slice(0, index), ...stores.slice(index + 1)];
        dispatch(fetchUpdate({ DT: newStores }));  // Cập nhật lại stores qua Redux
    } else {
        // Xử lý khi không tìm thấy người dùng
        loadStoreAgain();  // Có thể cần cập nhật để không sử dụng ref
        console.log('Không tìm thấy người dùng');
    }
    };

    const updateOnlineStore = (storesRef, isOnlineRef) => {
        const currentStores = storesRef.current;  // Lấy giá trị mới nhất từ storesRef
        const ion = isOnlineRef.current;     // Lấy giá trị mới nhất từ isOnlineRef
    
        console.log("Danh sách đang online: ", ion);
    
        // Cập nhật trạng thái `online` của các stores dựa trên danh sách `isOnline`
        const updatedStores = currentStores.map(store => ({
            ...store,
            online: ion.includes(store.id)
        }));
    
        dispatch(fetchUpdate({ DT: updatedStores }));
    
        console.log("Danh sách stores cập nhật: ", updatedStores);
    };
//
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


    const loadStoreAgain = async () => {
        try {
            console.log("Loading stores again...");
            const res = await GetAllStoresChat();

            if (res.EC === 0 && res.DT) {
                // Lọc các id của người dùng có trạng thái online: true
                const onlineUserIds = res.DT
                    .filter(user => user.online === true)
                    .map(user => user.id);
    
                // Cập nhật thuộc tính online cho mỗi store dựa trên danh sách onlineUserIds
                const updatedStores = res.DT.map(store => ({
                    ...store,
                    online: onlineUserIds.includes(store.id) // Đặt thuộc tính online dựa trên danh sách id
                }));
                dispatch(fetchUpdate({ DT: updatedStores }));
            } else {
                console.error("Lỗi khi tải lại stores:", res);
            }
        } catch (error) {
            console.error("Lỗi khi thực hiện loadStoreAgain:", error);
        }
    };


    const handleClickNewUser = (user) => {
        setSelectedUser(user);
        const exists = users.some(u => u.id === user.id && u.user_name === user.user_name);
        if (!exists) setLoadStores(true);
        setSearch(false);
        setSearchTerm('');
    }

    const handleClickOutside = useCallback((e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setSearch(false);  // Đóng danh sách tìm kiếm khi nhấp chuột ra ngoài
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
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
                                    onClick={() => {
                                        setSearchTerm("")
                                        setSearch(true)}
                                    }
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
                                    <li key={index} className="clearfix" onClick={(e) => {
                                        e.stopPropagation(); 
                                         handleClickNewUser(item)
                                    }
                                   }>
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
                            setNewMessagesCount = {setNewMessagesCount}
                            newMessagesCount = {newMessagesCount}
                            updateOnlineStore = {updateOnlineStore}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
