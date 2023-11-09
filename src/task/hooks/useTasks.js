import moment from "moment/moment";

const useTasks = () => {
  function calcDate(limitDate) {
    let limit = moment(limitDate, "MM/DD/YYYY");
    let today = moment();
  
    return Math.trunc((limit.diff(today, 'hours') + 24) / 24)
  }

  return fetch('data.json', { headers : { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
  .then((response) => {
    if (!response.ok) return []
    return response.json()
  })
  .then((data) => {
    if (data.length === 0) return data;

    return data.map((task) => ({
      id:task.id,
      title:task.title,
      description:task.description,
      leftDays:calcDate(task.limitDate),
    }))
  })
  .catch(err => {
    console.log(err)
    return []
  })
}

export default useTasks