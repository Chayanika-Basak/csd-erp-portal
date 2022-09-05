import "./adminNavbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import AdminSidebar from "../AdminSidebar/AdminSidebar"
import csd_logo from "../../pages/login/CSD_logo.png";
import {HiMenu} from "react-icons/hi"
import {FiMoon} from "react-icons/fi"
import {CgBell} from "react-icons/cg"

const AdminNavbar = () => {
  const { Dispatch } = useContext(DarkModeContext);
  const { data } = useFetch(`/updates`)
  const { user } = useContext(AuthContext)
  const [openNotif, setOpenNotif] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);


  const navigate = useNavigate();


  const handleNotif = () => {
    setOpenNotif(!openNotif)
  }


  return (
    <>
    <div className="navbar">
      {openSidebar && <AdminSidebar setOpen={setOpenSidebar} />}

      <div className="wrapper">

        <Link to="/">
          <p className=""><img src={process.env.PUBLIC_URL + "/Assets/brand.png"} height="60px" alt="" /></p>
        </Link>

        <div className="items">


          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => Dispatch({ type: "TOGGLE" })}
            />
          </div>

          {/* Menu */}

          <div className="item" onClick={() => setOpenSidebar(!openSidebar)}>
            <ListOutlinedIcon className="icon" />
          </div>
        </div>
      </div>
    </div>

    {/* Start: Mobile Screen */}
    <div className="lg:hidden border-b-2">
      {openSidebar && <AdminSidebar setOpen={setOpenSidebar} />}
        <div className="flex items-center justify-between">
          <div className='my-3 mx-4 w-16 h-14'>
            <img 
            src={csd_logo}
            alt="csd_logo"
            className='w-full h-full'
            />
          </div>
          
          <div className="flex items-center gap-3">

            {/* Dark Mode */}
            <div className="hidden md:flex lg:hidden item">
                <DarkModeOutlinedIcon
                  className="icon"
                  onClick={() => Dispatch({ type: "TOGGLE" })}
                />
            </div>

            {/* Menu */}
            <div className="item" onClick={() => setOpenSidebar(!openSidebar)}>
              <HiMenu className="text-3xl" />
            </div>

            {/* Profile */}
            <div className="w-8 mr-4 ml-2">
              <img
                src={user.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt=""
                className="w-full rounded-full"
                onClick={() => navigate(`/users/${user._id}`)}
              />
            </div>
          </div>
          
        </div>
      </div>
      
      {/* End: Mobile Screen */}
    </>
  );
};

export default AdminNavbar;