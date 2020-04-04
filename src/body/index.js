import React, { useState } from 'react'
import Switch from 'react-ios-switch'

import ValueBox from './components/ValueBox'
import {
  valueBoxes, subContainer, switchContainer,
  switchText, container, singleContainer, tooltip,
  doubleContainer, NoData
} from './styles/index.module.scss'
import SalesByDay from './components/SalesByDay'
import SalesByTime from './components/SalesByTime'
import SalesByDate from './components/SalesByDate'
import RecentSales from './components/RecentSales'
import ReturningCustomers from './components/ReturningCustomers'
import Accordian from './components/Accordian'
import TopSection from './TopSection'
import Header from './Header'

const Body = ({ state, setState }) => {
  const [showMore, setShowMore] = useState(null)
  const {
    currency_type, total_earnings,
    avg_price, avg_total, avg_shipping, total_shipping_cost,
    avg_time_listed, files, total_fees_paid
  } = state.data
  return (
    <div className={container}>
      <Header />

      <div className={subContainer}>
        <TopSection state={state} setState={setState} />

        {
          state.data.files
            ? (
              <>
                {
                  state.data.files[0]
                    ? (
                      <>
                        <div className={switchContainer}>
                          <Switch
                            checked={showMore}
                            onChange={() => setShowMore(!showMore)}
                          />
                          <div className={switchText}>Show More</div>
                        </div>
                        <div className={valueBoxes}>

                          <ValueBox
                            float
                            animate={showMore === null}
                            tooltipHTML={(
                              <div className={tooltip}>
                                Fees: {currency_type}{total_fees_paid}<br />
                Shipping: {currency_type}{total_shipping_cost}
                              </div>
                            )}
                            title={showMore ? 'Net Earnings' : 'Gross Earnings'}
                            value={showMore
                              ? (total_earnings - total_shipping_cost - total_fees_paid).toFixed(2)
                              : total_earnings}
                            subValue={showMore
                              ? `${currency_type}${total_earnings} 
              -
              ${currency_type}${total_shipping_cost}
              -
              ${currency_type}${total_fees_paid}
              `
                              : null}
                            currencyType={currency_type}
                          />
                          <ValueBox
                            float
                            animate={showMore === null}
                            tooltipHTML={(
                              <div className={tooltip}>
                                Avg. Item Price: {currency_type}{avg_price}<br />
                Shipping: {currency_type}{avg_shipping}
                              </div>
                            )}
                            title='Avg. Price per Item'
                            value={showMore ? avg_total : avg_price}
                            subValue={showMore ? `${currency_type}${avg_price} + ${currency_type}${avg_shipping}` : null}
                            currencyType={currency_type}
                          />
                          <ValueBox
                            animate={showMore === null}
                            title='Items Sold'
                            value={files ? files.length : null}
                          />
                          <ValueBox
                            animate={showMore === null}
                            title='Avg. Days Listed'
                            value={avg_time_listed}
                          />
                        </div>

                        <div className={singleContainer}>
                          <Accordian
                            title='Sales by Date'
                            component={<SalesByDate state={state.data} />}
                          />
                        </div>

                        <div className={doubleContainer}>
                          <Accordian
                            showBorder
                            title='Recent Sales (Past Week)'
                            component={<RecentSales state={state.data} />}
                          />
                          <Accordian
                            showBorder
                            title='Returning Customers'
                            component={<ReturningCustomers state={state.data} />}
                          />
                        </div>

                        <div className={singleContainer}>
                          <Accordian
                            title='Sales by Day'
                            component={<SalesByDay state={state.data} />}
                          />
                        </div>

                        <div className={singleContainer}>
                          <Accordian
                            title='Sales by time'
                            component={<SalesByTime state={state.data} />}
                          />
                        </div>
                      </>
                    )
                    : <NoneFound />
                }
              </>
            )
            : <NoneFound msg='Loading...' />
        }
      </div>
    </div>
  )
}

const NoneFound = ({ msg }) => (<div className={NoData}>
  {msg || 'No data found. Either change the date selection or upload another file.'}
                                </div>)
export default Body
