import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { datePicker, inputs, label, inputContainer, presetBtn, btnContainer, container } from "./styles/dateDisplay.module.scss"
import { filterData } from "./utils"

const DateDisplay = ({ state, setState }) => {
  const [startDate, setStartDate] = useState(new Date(state.data.files[0].date_of_sale));
  const [endDate, setEndDate] = useState(new Date(state.data.files[state.data.files.length - 1].date_of_sale));

  const setPreset = (type) => {
    switch (type) {
      case 'week':
        const start = new Date().setDate(new Date().getDate() - 7)
        setStartDate(start);
        setState(
          { data: filterData(state.originalData, { start, end: endDate }) }
        )
        break;
      case 'month':
        const startMonth = new Date();
        startMonth.setMonth(startMonth.getMonth() - 1)
        setStartDate(startMonth);
        setState(
          { data: filterData(state.originalData, { start: startMonth, end: endDate }) }
        )
        break;
      case 'full':
        setStartDate(new Date(state.originalData.files[0].date_of_sale))
        setEndDate(new Date(state.data.files[state.data.files.length - 1].date_of_sale))
        setState(
          { data: state.originalData }
        )
        break;
      default:
        return
    }
  }

  if (!state.data.files) return null;
  return (
    <div className={container}>

      <div className={inputs}>

        <div className={inputContainer}>
          <div className={label}>
            Start Date:
        </div>
          <DatePicker
            className={datePicker}
            selected={startDate}
            onChange={date => {
              let start = date;
              let end = endDate;
              if (date >= endDate) { end = date }
              setEndDate(end)
              setStartDate(start)

              setState(
                { data: filterData(state.originalData, { start, end }) }
              )
            }}
            minDate={new Date(state.originalData.files[0].date_of_sale)}
            maxDate={new Date(state.originalData.files[state.originalData.files.length - 1].date_of_sale)}
            placeholderText="start date"
            popperModifiers={popperModifier}
          />
        </div>

        <div className={inputContainer}>
          <div className={label}>
            End Date:
        </div>
          <DatePicker
            className={datePicker}
            selected={endDate}
            onChange={date => {
              let start = startDate;
              let end = date;
              if (date <= startDate) { start = date }
              console.log(start, end)
              setEndDate(end)
              setStartDate(start)

              setState(
                { data: filterData(state.originalData, { start, end }) }
              )
            }}
            minDate={new Date(state.originalData.files[0].date_of_sale)}
            maxDate={new Date(state.originalData.files[state.originalData.files.length - 1].date_of_sale)}

            placeholderText="end date"
            popperModifiers={popperModifier}

          />
        </div>
      </div>

      <div className={btnContainer}>
        <button className={presetBtn} onClick={() => setPreset('week')}>
          Past Week
        </button>
        <button className={presetBtn} onClick={() => setPreset('month')}>
          Past Month
        </button>
        <button className={presetBtn} onClick={() => setPreset('full')}>
          Full Range
        </button>
      </div>
    </div>
  )
}

export default DateDisplay;

const popperModifier = {
  offset: {
    enabled: true,
    offset: "-50px, 10px"
  },
  preventOverflow: {
    enabled: true,
    escapeWithReference: false,
    boundariesElement: "viewport"
  }
}