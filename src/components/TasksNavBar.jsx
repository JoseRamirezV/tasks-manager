import "../Styles/TasksNavBar.css";

export default function TasksNavBar() {
  return (
    <div className="nav">
      <div className="logo">
        <span>
          <h1>JRWeb</h1>
        </span>
      </div>
      <div className="profile">
        <div className="p-photo">
          <i className="fa-solid fa-circle-user fa-xl" style={{color: "#b2c2d8"}}></i>
        </div>
        <div className="p-user">
          <span>Jose Ricardo</span>
        </div>
        <div className="p-logOut">
          <i className="fa-solid fa-arrow-right-from-bracket" style={{color: "#b2c2d8b0"}}></i>
        </div>
      </div>
    </div>
  );
}
