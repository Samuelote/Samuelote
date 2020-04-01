import moment from "moment"

export const groupDataBy = (key, data, showEmptyDates) => {
  const newData = []
  if (data.files) {
    data.files.forEach(({ date_of_sale }) => {
      const latest = newData[newData.length - 1]
      if (!newData.length || latest["Date Sold"] !== date_of_sale) {
        if (latest && showEmptyDates) {
          const milisecs =
            new Date(date_of_sale).getTime() - new Date(latest["Date Sold"]).getTime();
          const diff = milisecs / (1000 * 3600 * 24);
          if (diff !== 1) {
            for (let i = 1; i < diff; i++) {
              const day = new Date(latest["Date Sold"]).getDate() + i;
              const date = new Date(latest["Date Sold"]);
              const formatted = moment(date.setDate(day)).format("MM-DD-YYYY");
              newData.push({ "Date Sold": formatted, "Items Sold": 0 })
            }
          }

        }


        newData.push({ "Date Sold": date_of_sale, "Items Sold": 1 })
      } else {
        latest["Items Sold"] += 1;
      }
    })
  }
  return newData;
}