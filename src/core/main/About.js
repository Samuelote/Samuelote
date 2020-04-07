import React from 'react'
import PaypalLogo from '../../assets/paypal_logo.png'
import { container, subContainer, h1, body, section, img, bottom, paypal } from '../styles/about.module.scss'

const About = () => {
  return (
    <div className={container}>
      <div className={subContainer}>
        <h1 className={h1}>A Little Background</h1>
        <div className={body}>
          <p className={section}>
            For over a year, my girlfriend (<a href='https://www.depop.com/marguillen/'>@marguillen</a>)
            has been selling  used clothes on Depop. As we’ve seen a drastic jump in her
            followers and sales in recent months, we’ve also found it
            surprising that Depop doesn’t offer basic stats for sellers to keep track
            of their profits etc. Being a software developer,
            I started toying around with ways to track her history as a seller.
            After lots of brainstorming, the only real option at the moment seems
            to be parsing and making sense of the provided CSV file that Depop offers.

          </p>
          <p className={section}>
            While there’s much more to be done with this project, I feel
            that it’s now at a good point to publish to the web and offer
            it to anybody who may be interested in their own personal stats.
            <br />
            <br />
            Thanks for checking it out, and if you feel so inclined, you can
            donate. Your donations will allow me to spend more time on this project
            and pump out new features much quicker.
            <br />
            <br />
            <strong>
              Inquiries: <a href='mailto:samote.wood@gmail.com'>samote.wood@gmail.com</a>
            </strong>
          </p>
        </div>
        <div className={bottom}>
          <img src={PaypalLogo} alt='PayPal Logo' className={paypal} />
          <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
            <input type='hidden' name='cmd' value='_donations' />
            <input type='hidden' name='business' value='YT2DT2829LZG4' />
            <input type='hidden' name='currency_code' value='USD' />
            <input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif' border='0' name='submit' title='PayPal - The safer, easier way to pay online!' alt='Donate with PayPal button' />
            <img alt='' border='0' src='https://www.paypal.com/en_US/i/scr/pixel.gif' width='1' height='1' />
          </form>
        </div>

      </div>
    </div>
  )
}

export default About
