import "./newUser.scss";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import { useState } from "react";
import axios from "axios"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useNavigate } from "react-router-dom";
import { roles, teams, integ_subteams, team_subteams } from "../../source/formsource/teamsAndRole"

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
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

        axios.post("http://localhost:5500/api/auth/register", newuser, {
          withCredentials: false
        })
        navigate(-1)

      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await axios.post("http://localhost:5500/api/auth/register", info)
        navigate(-1)
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  console.log(info)

  return (
    <>
    <div className="new">
      {/* <Sidebar /> */}
      {/* <NavSidebar /> */}
      <div className="newContainer">
        <AdminNavbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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

              <div className="formInput">
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Year</label>
                <select
                  id="year"
                  onChange={handleChange}
                >
                  <option value={0}>-</option>
                  <option value={1}>1st</option>
                  <option value={2}>2nd</option>
                  <option value={3}>3rd</option>
                  <option value={4}>4th</option>
                </select>
              </div>

              <div className="formInput">
                <label>Choose a Team</label>
                <select
                  id="team"
                  onChange={handleChange}
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.team}>{t.team}</option>
                  ))}
                </select>
              </div>

              {info.team === "Integration Team" && <div className="formInput">
                <label>Choose a Sub Team</label>
                <select
                  id="subteam"
                  onChange={handleChange}
                >
                  {integ_subteams.map((st) => (
                    <option key={st.id} value={st.subteam}>{st.subteam}</option>
                  ))}
                </select>
              </div>}

              {
                (info.team === "Adira" || info.team === "Cognito" || info.team === "Eudaimonia" || info.team === "Inayat" || info.team === "Pejas" || info.team === "Sashakt Drishti")
                && <div className="formInput">
                  <label>Choose a Sub Team</label>
                  <select
                    id="subteam"
                    onChange={handleChange}
                  >
                    {team_subteams.map((st) => (
                      <option key={st.id} value={st.subteam}>{st.subteam}</option>
                    ))}
                  </select>
                </div>
              }

              <div className="formInput">
                <label>Choose a Role</label>
                <select
                  id="role"
                  onChange={handleChange}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.role}>{r.role}</option>
                  ))}
                </select>
              </div>

            </form>
            <button onClick={handleClick} className="form-btn">Create User</button>
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

                {inputs.map((input) => (
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
                ))}

                <div className="mb-6 mt-8">
                  <label>Year</label>
                  <select
                    className="ml-4"
                    id="year"
                    onChange={handleChange}
                  >
                    <option value={0}>-</option>
                    <option value={1}>1st</option>
                    <option value={2}>2nd</option>
                    <option value={3}>3rd</option>
                    <option value={4}>4th</option>
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
                  (info.team === "Adira" || info.team === "Cognito" || info.team === "Eudaimonia" || info.team === "Inayat" || info.team === "Pejas" || info.team === "Sashakt Drishti")
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

                <div className="flex flex-col mb-6 mt-8">
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
              </form>
              <button onClick={handleClick} className="bg-[#008080] text-white mt-6 w-40 h-10 rounded-md">Create User</button>
          </div>
        </div>
    {/* End: Mobile/Tab Screen */}    
    </>
  );
};

export default NewUser;
