import React, { Component } from 'react'

import './intro.less'

export default class Intro extends Component {
  constructor () {
    super()
    this.state = {
      section3Shown: false,
      section2Shown: [false, false, false]
    }
  }

  ensureSection2 (k) {
    for (let i = 0; i <= k; i++) {
      if (!this.state.section2Shown[i]) {
        this.showSection2(i)
        const section2Shown = this.state.section2Shown.slice()
        section2Shown[i] = true
        this.setState({ section2Shown })
      }
    }
  }

  showSection2 (k) {
    const numNode = document.querySelector(`.section2 > div:nth-child(${k + 1}) .num-inner`)
    numNode.classList.remove('hide')
    numNode.classList.add('animated', k % 2 ? 'fadeInRight' : 'fadeInLeft')
  }

  showSection3 () {
    if (!this.state.section3Shown) {
      document.querySelectorAll('.section3 .icon-wrapper').forEach(function (node) {
        node.classList.remove('hide')
        node.classList.add('animated', 'fadeInDown')
      })
      this.setState({ section3Shown: true })
    }
  }

  componentDidMount () {
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

  render () {
    // TODO: fill the blanks
    // TODO: Pink panther
    return (
      <div id='intro'>
        <section className='section1'>
          <div className='top'>
            <div className='logo-wrapper animated infinite'>
              <i className='fas fa-heart animated infinite logo-icon' />
            </div>
          </div>
          <div className='bottom'>
            <h1>Feel Good</h1>
            <ul>
              <li>point1</li>
              <li>point2</li>
              <li>point3</li>
              <li>point4</li>
            </ul>
            <div>
              <button className='button'>Try it</button>
            </div>
          </div>
        </section>
        <section className='section2'>
          <div>
            <div className='num'>
              <div className='num-inner hide'>
                1.6M
                </div>
            </div>
            <div className='text'>
              <h2>Title1</h2>
              <div>Description1</div>
            </div>
          </div>
          <div>
            <div className='num'>
              <div className='num-inner hide'>
                365
                </div>
            </div>
            <div className='text'>
              <h2>Title2</h2>
              <div>Description2</div>
            </div>
          </div>
          <div>
            <div className='num'>
              <div className='num-inner hide'>
                72%
                </div>
            </div>
            <div className='text'>
              <h2>Title3</h2>
              <div>Description3</div>
            </div>
          </div>
        </section>
        <section className='section3'>
          <div>
            <div>
              <h2>Blood Center</h2>
              <ul>
                <li>- blood center 1</li>
                <li>- blood center 2</li>
                <li>- blood center 3</li>
              </ul>
            </div>
            <div className='icon-wrapper hide' onClick={() => { (window.location.href = '/stage-1') }}>
              <i className='fas fa-ambulance' />
            </div>
          </div>
          <div>
            <div>
              <h2>Test Center</h2>
              <ul>
                <li>- test center 1</li>
                <li>- test center 2</li>
                <li>- test center 3</li>
              </ul>
            </div>
            <div className='icon-wrapper hide' onClick={() => { (window.location.href = '/stage-2') }}>
              <i className='fas fa-hospital' />
            </div>
          </div>
          <div>
            <div>
              <h2>Blood user</h2>
              <ul>
                <li>- blood user 1</li>
                <li>- blood user 2</li>
                <li>- blood user 3</li>
              </ul>
            </div>
            <div className='icon-wrapper hide' onClick={() => { (window.location.href = '/stage-3') }}>
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
