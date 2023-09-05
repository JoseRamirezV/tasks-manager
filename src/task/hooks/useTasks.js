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
    if (data.lenght === 0) return data;

    return data.map((taks) => ({
      id:taks.id,
      title:taks.title,
      description:taks.description,
      leftDays:calcDate(taks.limitDate),
    }))
  })
  .catch(err => {
    console.log(err)
    return []
  })
}

export default useTasks