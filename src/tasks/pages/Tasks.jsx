import TasksNavBar from "../components/TasksNavBar";
import ListItem from "../components/ListItem";
import testData from "../testData.json";
import "../Styles/Tasks.css";

export default function Tasks() {
  return (
    <div className="tasks-page">
      <nav>
        <TasksNavBar />
      </nav>
      <div className="container">
        <div className="tasks" id="add-form"></div>
        <div className="tasks" id="list">
          <div className="tasks-container">
            {testData.map((data, i) => (
              <ListItem itemData={data} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
