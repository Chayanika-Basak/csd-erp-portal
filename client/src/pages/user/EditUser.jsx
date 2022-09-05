import "./editUser.scss";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useNavigate, useLocation } from "react-router-dom";
import { roles, teams, integ_subteams, team_subteams } from "../../source/formsource/teamsAndRole"
import useFetch from "../../hooks/useFetch";

const EditUser = ({ title, type }) => {

  const location = useLocation();
  let id;
  if (type === "Admin")
    id = location.pathname.split("/")[3];
  else
    id = location.pathname.split("/")[2];

  const { data } = useFetch(`/users/${id}`)
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setInfo(data)
  }, [data])

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setSending(true)
    if (file) {

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dnzkakna0/image/upload",
          data, {
          withCredentials: false
        }
        )
        const { url } = uploadRes.data;
        const { public_id } = uploadRes.data;
        const newuser = {
          ...info, profilePicture: url, cloud_id: public_id
        }

        axios.put(`http://localhost:5500/api/users/${id}`, newuser, {
          withCredentials: false
        })
        navigate(-1)

      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await axios.put(`http://localhost:5500/api/users/${id}`, info, { withCredentials: false })
        navigate(-1)
      }
      catch (err) {
        console.log(err)
      }
    }
  }


  return (
    <>
    <div className="new">
      <div className="newContainer">
        {(type === "Admin") ? (<AdminNavbar />) : (<Navbar />)}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                (file)
                  ? URL.createObjectURL(file)
                  : (info.profilePicture) ? info.profilePicture : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">
            <form>

              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {type === "Admin" && <div className="formInput">
                <label>Taken as GEC</label>
                <select
                  id="isGEC"
                  onChange={handleChange}
                >
                  <option value={false}>-</option>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>}

              <div className="formInput">
                <label>Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter name"
                  id="name"
                  value={info.name}
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  value={info.email}
                />
              </div>

              <div className="formInput">
                <label>Phone Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter phone number"
                  id="phone"
                  value={info.phone}
                />
              </div>

              {type === "Admin" && <div className="formInput">
                <label>Username</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter username"
                  id="username"
                  value={info.username}
                />
              </div>}

              <div className="formInput">
                <label>Branch</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter branch"
                  id="branch"
                  value={info.branch}
                />
              </div>

              {type === "Admin" && <div className="formInput">
                <label>Folder Link</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter user's folder"
                  id="folderLink"
                  value={info.folderLink}
                />
              </div>}

              <div className="formInput">
                <label>Year</label>
                <select
                  id="year"
                  onChange={handleChange}
                  value={info.year}
                >
                  <option value={0}></option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>

              {type === "Admin" && <div className="formInput">
                <label>Choose a Team</label>
                <select
                  id="team"
                  onChange={handleChange}
                  value={info.team}
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.team}>{t.team}</option>
                  ))}
                </select>
              </div>}

              {info.team === "Integration Team" && type === "Admin" && <div className="formInput">
                <label>Choose a Sub Team</label>
                <select
                  id="subteam"
                  onChange={handleChange}
                  value={info.subteam}
                >
                  {integ_subteams.map((st) => (
                    <option key={st.id} value={st.subteam}>{st.subteam}</option>
                  ))}
                </select>
              </div>}

              {
                type === "Admin" && (info.team === "Adira" || info.team === "Cognito" || info.team === "Eudaimonia" || info.team === "Inayat" || info.team === "Pejas" || info.team === "Sashakt Drishti")
                && <div className="formInput">
                  <label>Choose a Sub Team</label>
                  <select
                    id="subteam"
                    value={info.subteam}
                    onChange={handleChange}
                  >
                    {team_subteams.map((st) => (
                      <option key={st.id} value={st.subteam}>{st.subteam}</option>
                    ))}
                  </select>
                </div>
              }

              {type === "Admin" && <div className="formInput">
                <label>Choose a Role</label>
                <select
                  id="role"
                  onChange={handleChange}
                  value={info.role}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.role}>{r.role}</option>
                  ))}
                </select>
              </div>}

            </form>
            <button disabled={sending} id="submit" onClick={handleClick}>Edit User</button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Start: Mobile/Tab Screen */}
    <div className="flex flex-col lg:hidden">
          <div className="m-6 p-4 shadow-md w-5/6 text-center">
            <h2>{title}</h2>
          
            <div className="w-20 ml-24 my-6">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <form>
              <label htmlFor="file">
                Image: <DriveFolderUploadIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />

                {type === "Admin" && 
                  <div className="my-6">
                    <label>Taken as GEC</label>
                    <select
                      id="isGEC"
                      onChange={handleChange}
                    >
                      <option value={false}>-</option>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                }

                {/* {inputs.map((input) => (
                  <div className={`flex flex-col ml-6 my-6`} key={input.id}>
                    <label className="text-center">{input.label}</label>
                    <input
                      className="text-center border-b"
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))} */}

              <div className="flex flex-col ml-6 my-6">
                <label className="text-center">Name</label>
                <input
                      className="text-center border-b"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter name"
                  id="name"
                  value={info.name}
                />
              </div>

              <div className="flex flex-col ml-6 my-6">
                <label className="text-center">Email</label>
                <input
                  className="text-center border-b"
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  value={info.email}
                />
              </div>

              <div className="flex flex-col ml-6 my-6">
                <label className="text-center">Phone Number</label>
                <input
                  className="text-center border-b"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter phone number"
                  id="phone"
                  value={info.phone}
                />
              </div>

              {type === "Admin" && <div className="flex flex-col ml-6 my-6">
                <label className="text-center">Username</label>
                <input
                  className="text-center border-b"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter username"
                  id="username"
                  value={info.username}
                />
              </div>}

              <div className="flex flex-col ml-6 my-6">
                <label className="text-center">Branch</label>
                <input
                  className="text-center border-b"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter branch"
                  id="branch"
                  value={info.branch}
                />
              </div>

              {type === "Admin" && <div className="flex flex-col ml-6 my-6">
                <label className="text-center">Folder Link</label>
                <input
                  className="text-center border-b"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter user's folder"
                  id="folderLink"
                  value={info.folderLink}
                />
              </div>}

              <div className="ml-6 my-6">
                <label>Year</label>
                <select
                  id="year"
                  onChange={handleChange}
                  value={info.year}
                >
                  <option value={0}></option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>

                <div className="flex flex-col mb-6 mt-8">
                  <label>Choose a Team</label>
                  <select
                    id="team"
                    onChange={handleChange}
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.team} selected>{t.team}</option>
                    ))}
                  </select>
                </div>

                {info.team === "Integration Team" && <div className="flex flex-col mb-6 mt-8">
                  <label>Choose a Sub Team</label>
                  <select
                    id="subteam"
                    onChange={handleChange}            
                  >
                    {integ_subteams.map((st) => (
                      <option key={st.id} value={st.subteam} selected>{st.subteam}</option>
                    ))}
                  </select>
                </div>}

                {
                  type === "Admin" && (info.team === "Adira" || info.team === "Cognito" || info.team === "Eudaimonia" || info.team === "Inayat" || info.team === "Pejas" || info.team === "Sashakt Drishti")
                  && <div className="flex flex-col mb-6 mt-8">
                    <label>Choose a Sub Team</label>
                    <select
                    className="w-28"
                      id="subteam"
                      onChange={handleChange}
                    >
                      {team_subteams.map((st) => (
                        <option key={st.id} value={st.subteam} selected>{st.subteam}</option>
                      ))}
                    </select>
                  </div>
                }

                {type === "Admin" && <div className="flex flex-col mb-6 mt-8">
                  <label>Choose a Role</label>
                  <select
                    className="w-70"
                    id="role"
                    onChange={handleChange}
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.role} selected>{r.role}</option>
                    ))}
                  </select>
                </div>
                }
              </form>
              <button disabled={sending} onClick={handleClick} className="bg-[#008080] text-white mt-6 w-40 h-10 rounded-md">Edit User</button>
          </div>
        </div>
    {/* End: Mobile/Tab Screen */}
    </>
  );
};

export default EditUser;
