import { useEffect, useRef, useState } from "react";
import { GetChatHistory } from "../../services/apiServices";
import { store } from "../../redux/store";
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { GetMarkMessagesAsRead } from "../../services/apiServices";
import { updateAllUserStatus, updateUserIsRead, updateUserStatus } from "../../redux/actions/storesAction";
import imageCompression from 'browser-image-compression';


const ChatHistory = (props) => {
    const { selectedUser, changeUserLocation,setNewMessagesCount,newMessagesCount } = props;
    const [chatHistory, setChatHistory] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ws, setWs] = useState(null);
    const idU = store.getState()?.user?.account?.id;
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null); // Create ref for file input

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const isLogin = useSelector((store) => store.user.isAuthenticated);
    const dispatch = useDispatch();
    // sử dụng nó để tham chiếu đến stores vì trong websocket nó luôn dữ giá trị ban đầu vì thế stores trong 
    // đó ko có giá trị
    const newMessagesCountRef = useRef(newMessagesCount);

    useEffect(() => {
        newMessagesCountRef.current = newMessagesCount;
    }, [newMessagesCount]);

    useEffect(() =>{
        console.log("count: ",newMessagesCount);
    },[newMessagesCount])

    // useEffect (() => {
    //     // UpdateOnlineSQL();
    //     dispatch(updateUserIsRead(selectedUser.id,true));

    // },[selectedUser]);



    const UpdateOnlineSQL = async () => {
        let res = await GetMarkMessagesAsRead(selectedUser.id);
        if (res.EC === 0) {
            console.log("update as read thanh cong");
        }
    }

    // Scroll to bottom when chatHistory changes
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    useEffect(() => {
        // Set up WebSocket connection once
        const socket = new WebSocket('ws://localhost:8888/mobile/ws/chat');

        socket.onopen = () => {
            console.log('Connected to the WebSocket server');
            // Send userId information when connected
            socket.send(JSON.stringify({
                type: 'identify',
                userId: store.getState()?.user?.account?.id
            }));
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Received message: ", message);

            if (message.type === 'online') {
                const { userId, status } = message;
                console.log(`User ${userId} is ${status ? 'online' : 'offline'}`);
                dispatch(updateUserStatus(userId,status));
                    
            } else if (message.type === 'onlineUsers') {
                setTimeout(() => {
                    dispatch(updateAllUserStatus(message.onlineUsers));
                  }, 2000);             
            } else if (message.receiver === idU || message.sender === idU) {
                setChatHistory(prevChatHistory => [
                    ...prevChatHistory,
                    message
                ]);
                if (message.receiver === idU) {
                    console.log("vao day rôiiiiff")
                    dispatch(updateUserIsRead(idU,false));
                    newMessagesCountRef.current += 1; // Cập nhật giá trị ref
                    changeUserLocation(message.sender);
                } else if (message.sender === idU) {
                    // dispatch(updateUserIsRead(idU,false));
                    changeUserLocation(message.receiver);
                }
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        setWs(socket);

        const handleBeforeUnload = () => {
            socket.close();
        };

        // Đăng ký sự kiện beforeunload để đóng WebSocket khi trang bị đóng
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function: Hủy sự kiện trước khi component bị unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isLogin]);

    useEffect(() => {
        // Fetch chat history when selectedUser changes
        if (selectedUser) {
            fetchChatHistory();
        }
    }, [selectedUser]);


    const fetchChatHistory = async () => {
        let res = await GetChatHistory(selectedUser.id);
        console.log(res);
        if (res.EC === 0) {
            setChatHistory(res.DT);
        }
    }

    const sendMessage = () => {
        if (ws && inputMessage.trim() && selectedUser?.id) {
            const currentTime = new Date().toISOString(); // Get current time in ISO string

            const messagePayload = {
                sender: store?.getState()?.user?.account?.id,
                receiver: selectedUser.id,
                message: inputMessage,
                local_time: currentTime // Add time to payload
            };

            ws.send(JSON.stringify(messagePayload));
            setInputMessage('');

            // if (loadStores) handleLoadStores();
        }
    };

    const handleImageUpload = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            // Reset file input value to allow selecting the same file again
            fileInputRef.current.value = '';
        } else {
            setImagePreview("");
            setImage(null);
        }
    }

    const handleImageRemove = () => {
        setImagePreview("");
        setImage(null);
        // Reset file input value to allow selecting the same file again
        fileInputRef.current.value = '';
    }

    const sendImageData = async () => {
        if (ws && image) {
            try {
                // Nén ảnh trước khi gửi
                const options = {
                    maxSizeMB: 1,           // Giới hạn kích thước ảnh (MB)
                    maxWidthOrHeight: 800,  // Giới hạn kích thước chiều rộng hoặc chiều cao
                    useWebWorker: true      // Sử dụng web worker để tăng hiệu suất
                };
                
                const compressedImage = await imageCompression(image, options);
    
                // Đọc ảnh nén dưới dạng Base64
                const reader = new FileReader();
                reader.onload = () => {
                    let imageData = reader.result.split(',')[1]; // Chỉ lấy phần Base64
    
                    const messagePayload = {
                        sender: store?.getState()?.user?.account?.id,
                        receiver: selectedUser.id,
                        imageData: imageData, // Dữ liệu ảnh nén
                        local_time: new Date().toISOString(),
                    };
                    
                    console.log(messagePayload)
                    // Kiểm tra nếu WebSocket đã mở
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify(messagePayload));
                        console.log('Compressed image data sent successfully');
                    } else {
                        console.error('WebSocket is not open. Cannot send image data.');
                    }
    
                    setImage(null); // Reset lại trạng thái ảnh
                    setImagePreview(""); // Xóa ảnh xem trước
    
                };
                reader.readAsDataURL(compressedImage);
            } catch (error) {
                console.error('Error compressing or sending image:', error);
            }
        }
    };
    
    const formatMessageTime = (time) => {
        if (time) {
            try {
                // Convert ISO string to Date object
                const date = parseISO(time);
                // Format date as needed
                return format(date, 'HH:mm, MMM d, yyyy'); // Example: "21:49, Aug 25, 2024"
            } catch (error) {
                console.error('Error parsing date:', error);
                return 'Invalid Date'; // Or other default value
            }
        } else {
            console.error('Time is undefined or null');
            return 'Unknown Time'; // Or other default value
        }
    };

    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                        </a>
                        <div className="chat-about">
                            <h6 className="m-b-0">{selectedUser.user_name}</h6>
                            <small><i className={`fa fa-circle ${selectedUser.online === true ? ' online' : ' offline'}`}></i>{selectedUser?.online === true ? "online" : "offline"}</small>
                        </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-right">
                        {/* Button to trigger the file input */}
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => fileInputRef.current.click()}
                            aria-label="Upload image"
                        >
                            <i className="fa fa-image"></i>
                        </button>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
            </div>
            <div className="chat-history">
                <ul className="m-b-0">
                    {chatHistory && chatHistory.length > 0 ? (
                        chatHistory.map((item, index) => (
                            <li key={index} className="clearfix">
                                <div
                                    className={`message-data ${item.sender === store.getState()?.user?.account?.id ? 'text-right' : ''}`}
                                >
                                    <span className="message-data-time">{formatMessageTime(item.local_time)}</span>
                                </div>
                                <div
                                    className={`message ${item.sender === store.getState()?.user?.account?.id ? 'other-message float-right' : 'my-message'}`}
                                >
                                    {item.message}
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="no-messages">Chat với nhau đi nào 😍😍</div>
                    )}
                    <div ref={chatEndRef} /> {/* Add ref for scrolling */}
                </ul>
            </div>
            <div className="chat-message clearfix">
                <div className="input-group mb-0">
                    <div className="input-group-prepend">
                        <span
                            className="input-group-text"
                            onClick={() => {
                                if (imagePreview) {
                                    sendImageData(); // Gửi dữ liệu ảnh nếu có
                                } else {
                                    sendMessage(); // Gửi tin nhắn văn bản nếu không có ảnh
                                }
                            }}
                        >
                            <i className="fa fa-send"></i>
                        </span>
                    </div>
                    <div className="input-container">
                        {!imagePreview ? (
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter text here..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                        ) : (
                            <div className="image-preview">
                                <button className="remove-image" onClick={handleImageRemove}>
                                    <i className="fa fa-times"></i>
                                </button>
                                <img src={imagePreview} alt="Image Preview" className="preview-image" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHistory;
