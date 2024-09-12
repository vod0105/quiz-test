import videoHomepage from "../../assets/video-homepage.mp4"
import { useSelector } from "react-redux";
import Food from "../../Product/Food";
import './Homepage.scss';
const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    console.log(isAuthenticated, account)
    return (
        <div className="homepage-container">
            <div className="home-header">
                <video autoPlay loop muted>
                    <source
                        src={videoHomepage}
                        type="video/mp4"
                    ></source>
                </video>
                <div className="homepage-content">
                    <div className="title-1">Thống nhất phong cách trong toàn bộ dự án</div>
                    <div className="title-2">Đảm bảo rằng bạn và nhóm của bạn đều thống nhất về phong cách đặt tên class để mã của bạn dễ đọc và dễ duy trì.</div>
                    <div className="title-3">
                        <button>Bấm vào đây nha các bạn</button>
                    </div>

                </div>
            </div>

            <Food />
        </div>
    )
}

export default HomePage;