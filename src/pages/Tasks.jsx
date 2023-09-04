import TasksNavBar from "../components/TasksNavBar";
import ListItem from '../components/ListItem'
import "../Styles/Tasks.css";

export default function Tasks() {
  const testData = [
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
    {
      Title: "Ir de compras",
      Description: "- Arroz/n- Crema",
      LimitDate: "08/09/2023",
      Priority: 1,
    },
  ];
  // const sayHi = () => {
  //   alert("hi")
  // }
  return (
    <div className="tasks-page">
      <nav>
        <TasksNavBar />
      </nav>
      <div className="container">
        <div className="tasks" id="add-form">

        </div>
        <div className="tasks" id="list">
          <div className="tasks-container">
            {testData.map((data, i) => (
              <ListItem itemData={data} key={i}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
