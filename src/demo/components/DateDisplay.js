import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import {
  datePicker, inputs, label, inputContainer,
  presetBtn, btnContainer, container, activePresetBtn
} from '../styles/dateDisplay.module.scss'
import { filterData } from '../utils/dataSetup'

const DateDisplay = ({ state, setState }) => {
  const sales = state.data.sales.length ? state.data.sales : state.originalData.sales
  const [startDate, setStartDate] = useState(
    new Date(moment(sales[0].date_of_sale, 'MM-DD-YYYY'))
  )
  const [endDate, setEndDate] = useState(
    new Date(moment(sales[sales.length - 1].date_of_sale, 'MM-DD-YYYY'))
  )
  const [activeBtn, activateBtn] = useState(null)
  // Sets global notification if current day isn't included in sales
  const originalDataEndDate =
    new Date(
      moment(state.originalData.sales[state.originalData.sales.length - 1].date_of_sale, 'MM-DD-YYYY')
    )
  if (
    moment().diff(originalDataEndDate, 'days') > 0 &&
    JSON.stringify(state.notification) === '{}' &&
    !state.example
  ) {
    setState(
      {
        notification: {
          position: 'bottom',
          type: 'warning',
          msg: `Your latest sale on record is ${moment(originalDataEndDate).format('MMMM Do YYYY')}. 
            If any sales have occurred between ${moment(originalDataEndDate).format('MMMM Do YYYY')} and now, 
            those sales will not be accounted for in this report.`
        }
      })
  }
  useEffect(() => {
    setStartDate(new Date(moment(sales[0].date_of_sale, 'MM-DD-YYYY')))
    setEndDate(new Date(moment(sales[sales.length - 1].date_of_sale, 'MM-DD-YYYY')))
  }, [sales])

  const setPreset = (type) => {
    activateBtn(type)
    switch (type) {
      case 'week':
        const start = new Date().setDate(new Date().getDate() - 7)
        setStartDate(start)
        setState(
          { data: filterData(state.originalData, { start, end: endDate }) }
        )
        break
      case 'month':
        const startMonth = new Date()
        startMonth.setMonth(startMonth.getMonth() - 1)
        setStartDate(startMonth)
        setState(
          { data: filterData(state.originalData, { start: startMonth, end: endDate }) }
        )
        break
      case 'full':
        setStartDate(new Date(moment(state.originalData.sales[0].date_of_sale, 'MM-DD-YYYY')))
        setEndDate(new Date(moment(sales[sales.length - 1].date_of_sale, 'MM-DD-YYYY')))
        setState(
          { data: state.originalData }
        )
        break
      default:
    }
  }
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
              const start = date
              let end = endDate
              if (date >= endDate) { end = date }
              setEndDate(end)
              setStartDate(start)

              setState(
                { data: filterData(state.originalData, { start, end }) }
              )
            }}
            minDate={new Date(moment(state.originalData.sales[0].date_of_sale, 'MM-DD-YYYY'))}
            maxDate={
              new Date(
                moment(
                  state.originalData.sales[state.originalData.sales.length - 1].date_of_sale, 'MM-DD-YYYY'
                )
              )
            }
            placeholderText='start date'
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
              let start = startDate
              const end = date
              if (date <= startDate) { start = date }
              activateBtn(null)
              setEndDate(end)
              setStartDate(start)

              setState(
                { data: filterData(state.originalData, { start, end }) }
              )
            }}
            minDate={new Date(moment(state.originalData.sales[0].date_of_sale, 'MM-DD-YYYY'))}
            maxDate={
              new Date(
                moment(
                  state.originalData.sales[state.originalData.sales.length - 1].date_of_sale, 'MM-DD-YYYY'
                )
              )
            }
            placeholderText='end date'
            popperModifiers={popperModifier}

          />
        </div>
      </div>

      <div className={btnContainer}>
        <button
          className={activeBtn === 'week' ? activePresetBtn : presetBtn}
          onClick={() => setPreset('week')}
        >
          Past Week
        </button>
        <button
          className={activeBtn === 'month' ? activePresetBtn : presetBtn}
          onClick={() => setPreset('month')}
        >
          Past Month
        </button>
        <button
          className={activeBtn === 'full' ? activePresetBtn : presetBtn}
          onClick={() => setPreset('full')}
        >
          Full Range
        </button>
      </div>
    </div>
  )
}

export default DateDisplay

const popperModifier = {
  offset: {
    enabled: true,
    offset: '-25px, -30px'
  },
  preventOverflow: {
    enabled: true,
    escapeWithReference: false,
    boundariesElement: 'viewport'
  }
}
