import React, { Component } from 'react'
import './intro.less'

export default class Intro extends Component {
  constructor() {
    super()
    this.state = {
      section3Shown: false,
      section2Shown: [false, false, false]
    }
  }

  ensureSection2(k) {
    for (let i = 0; i <= k; i++) {
      if (!this.state.section2Shown[i]) {
        this.showSection2(i)
        const section2Shown = this.state.section2Shown.slice()
        section2Shown[i] = true
        this.setState({ section2Shown })
      }
    }
  }

  showSection2(k) {
    const numNode = document.querySelector(`.section2 > div:nth-child(${k + 1}) .num-inner`)
    numNode.classList.remove('hide')
    numNode.classList.add('animated', k % 2 ? 'fadeInRight' : 'fadeInLeft')
  }

  showSection3() {
    if (!this.state.section3Shown) {
      document.querySelectorAll('.section3 .icon-wrapper').forEach(function (node) {
        node.classList.remove('hide')
        node.classList.add('animated', 'fadeInDown')
      })
      this.setState({ section3Shown: true })
    }
  }

  componentDidMount() {
    const self = this
    window.addEventListener('scroll', function (e) {
      let l = self.state.section2Shown.length
      let h = window.innerHeight / l
      let k = Math.floor(window.scrollY / h) - 1
      k = Math.min(l - 1, k)
      self.ensureSection2(k)

      if (Math.floor((window.scrollY + 400) / window.innerHeight) >= 2) {
        self.showSection3()
      }
    })
  }

  render() {
    return (
      <div id='intro'>
        <section className='section1'>
          <div className='top'>
            <div className='logo-wrapper animated infinite'>
              <i className='fas fa-heart animated infinite logo-icon' />
            </div>
            <img src={process.env.PUBLIC_URL + 'transparent_pinkpanther.png'}
              alt='pink-panther'
              width='200'
              height='200'
              className='animated fadeInLeft'
            />
          </div>
          <div className='bottom'>
            <h1>FeelGood</h1>
            <ul>
              <li>Transparent</li>
              <li>Secure</li>
              <li>Traceable</li>
              <li>Blood bank system</li>
            </ul>
            <div className='icons animated fadeInUp'>
              <a className='icon' href='/FeelGood/stage-1'>
                <i className='fas fa-ambulance' />
              </a>
              <div className='icon'>
                <i className='fas fa-caret-right' />
              </div>
              <a className='icon' href='/FeelGood/stage-2'>
                <i className='fas fa-hospital' />
              </a>
              <div className='icon'>
                <i className='fas fa-caret-right' />
              </div>
              <a className='icon' href='/FeelGood/stage-3'>
                <i className='fas fa-medkit' />
              </a>
              {/* <div className='icon'>
                <i className='fas fa-caret-right' />
              </div>
              <div className='icon'>
                <i className='far fa-smile' />
              </div> */}
            </div>
            <div />
          </div>
        </section>
        <section className='section2'>
          <div>
            <div className='num'>
              <div className='num-inner hide'>
                4.5
                </div>
            </div>
            <div className='text'>
              <h2>$ 4.5 billion</h2>
              <div>The blood donation industry makes up to $ 4.5 billion annually in the United States of America.</div>
            </div>
          </div>
          <div>
            <div className='num'>
              <div className='num-inner hide'>
                2
                </div>
            </div>
            <div className='text'>
              <h2>2 seconds</h2>
              <div>Every 2 seconds someone in the US needs blood.</div>
            </div>
          </div>
          <div>
            <div className='num'>
              <div className='num-inner hide'>
                235
                </div>
            </div>
            <div className='text'>
              <h2>235 people</h2>
              <div>The Red Cross donation center at Washington DC closed in the early 90s when 235 people who had received blood from the center tested positive for the AIDS virus.</div>
            </div>
          </div>
        </section>
        <section className='section3'>
          <div>
            <div />
            <div>
              <h2>Donation Center</h2>
              <ul>
                <li>- Get volunteers to donate blood</li>
                <li>- Give blood bottle a digital identity</li>
                <li>- Sign contract for accountability</li>
              </ul>
            </div>
            <div className='icon-wrapper hide' onClick={() => { (window.location.href = '/FeelGood/stage-1') }}>
              <i className='fas fa-ambulance' />
            </div>
          </div>
          <div>
            <div />
            <div>
              <h2>Test Center</h2>
              <ul>
                <li>- Verify information of blood by conducting tests</li>
                <li>- Digitally signing to validate blood details</li>

              </ul>
            </div>
            <div className='icon-wrapper hide' onClick={() => { (window.location.href = '/FeelGood/stage-2') }}>
              <i className='fas fa-hospital' />
            </div>
          </div>
          <div>
            <div />
            <div>
              <h2>Health Center</h2>
              <ul>
                <li>- View history of blood bottle</li>
                <li>- Filter based on requirement</li>
                <li>- Provide blood to patient in need</li>
              </ul>
            </div>
            <div className='icon-wrapper hide' onClick={() => { (window.location.href = '/FeelGood/stage-3') }}>
              <i className='fas fa-medkit' />
            </div>
          </div>
        </section>
        <footer>
          Built With Love @ ETHDenver
          <br />
          <small>Copyright © Team Phoenix</small>
        </footer>
      </div>
    )
  }
}
