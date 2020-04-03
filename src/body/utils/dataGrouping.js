import moment from "moment";

export const groupByDay = (data, key) => {
  const groupedData = {
    "Sun": 0, "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0
  };
  const newData = []
  if (data.files) {
    // groups data
    data.files.forEach((file) => {
      const day = moment(file.date_of_sale).format('ddd');
      groupedData[day]++;
    })
    //sets up data in recharts format
    Object.keys(groupedData).forEach((key) => {
      newData.push({ day: key, sales: groupedData[key] })
    })
  }


  return newData;


}

export const groupByTime = (data) => {
  const groupedData = {};
  const newData = []
  if (data.files) {
    // groups data
    data.files.forEach((file) => {
      const hour = moment(file.time_of_sale, "hh:mm A").format("h a")
      if (groupedData[hour]) {
        groupedData[hour]++;
      } else {
        groupedData[hour] = 1;
      }
    })
    //sets up data in recharts format
    Object.keys(groupedData).forEach((key) => {
      const sortingId = parseInt(moment(key, "h a").format("H"));
      const formattedId = moment(sortingId, "H").format("H:00");
      const twentyFour = `${formattedId} - ${moment(sortingId + 1, "h a").format("H:00")}`;
      const twelve = `${key} - ${moment(sortingId + 1, "h a").format("h a")} `
      newData.push({
        twelve,
        twentyFour,
        sortingId,
        sales: groupedData[key]
      })
    })
  }
  newData.sort((a, b) => {
    return a.sortingId - b.sortingId
  })

  return newData;


}