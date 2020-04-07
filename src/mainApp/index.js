import React from 'react'

import {
  valueBoxes, subContainer,
  container, singleContainer,
  doubleContainer, NoData, radialGraphs
} from './styles/index.module.scss'
import SalesByDay from './components/SalesByDay'
import SalesByTime from './components/SalesByTime'
import SalesByDate from './components/SalesByDate'
import RecentSales from './components/RecentSales'
import ReturningCustomers from './components/ReturningCustomers'
import Accordian from './components/Accordian'
import TopRadialChart from './components/TopRadialChart'
import IndividualStats from './components/IndividualStats'
import TopSection from './TopSection'

const Body = ({ state, setState }) => {
  const {
    currency_type, total_earnings,
    avg_price, total_shipping_cost,
    avg_time_listed, sales, depop_fees, paypal_fees,
    free_shipping
  } = state.data
  console.log(total_earnings, sales ? sales.length : null)
  return (
    <div className={container}>

      <div className={subContainer}>
        <TopSection state={state} setState={setState} />

        {
          state.data.sales
            ? (
              <>
                {
                  state.data.sales[0]
                    ? (
                      <>

                        <div className={valueBoxes}>
                          <div className={radialGraphs}>
                            <TopRadialChart
                              float
                              currencyType={currency_type}
                              title='Total Earnings'
                              value={total_earnings}
                              netValue={
                                (total_earnings - total_shipping_cost - depop_fees).toFixed(2)
                              }
                              data={[
                                {
                                  name: 'Net Earnings',
                                  value: parseFloat(total_earnings - total_shipping_cost - depop_fees)
                                },
                                { name: 'Depop Fees', value: parseFloat(depop_fees) },
                                { name: 'Total Shipping', value: parseFloat(total_shipping_cost) },
                                { name: 'Paypal Fees', value: parseFloat(paypal_fees) }
                              ]}

                            />

                          </div>
                          <IndividualStats
                            currency={currency_type}
                            values={[
                              { label: 'Items Sold', value: sales ? sales.length : null },
                              { label: 'Average Item Price', value: avg_price },
                              { label: 'Avg. Days Listed', value: avg_time_listed },
                              { label: 'Items offered with free shipping', value: free_shipping }
                            ]}
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
