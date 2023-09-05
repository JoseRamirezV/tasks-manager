import { useState } from "react";
import PropTypes from "prop-types";
import '../Styles/ListItem.css'

export default function ListItem(props) {
  const { Priority, Title, Description, LimitDate } = props.itemData;
  const [collapsed, setCollapsed] = useState(false);
  console.log(props.itemData);
  const collapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="task">
      <div className="priority">
        <h2>{Priority}</h2>
      </div>
      <div className="content">
        <div className="task-title">{Title}</div>
        <div className="task-content">{Description}</div>
      </div>
      <div className="check">{LimitDate}</div>
      <div className="state">
        <input type="checkbox" name="state" id="" />
      </div>
      <span onClick={collapse}>
        <i className="fa-solid fa-circle-chevron-down fa-xl"></i>
      </span>
    </div>
  );
}

ListItem.propTypes = {
  itemData: PropTypes.object,
};
