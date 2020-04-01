import moment from "moment";

export const groupByDay = (data, key) => {
  console.log(data, key)
  const newData = {
    "Sun": 0, "Mon": 0, "Tue": 0, "Wed": 0, "Thur": 0, "Fri": 0, "Sat": 0
  };
  if (data.files) {
    data.files.forEach((file) => {
      const day = moment(file.date_of_sale).format('ddd');
      newData[day]++;
    })
  }
  return newData;
}