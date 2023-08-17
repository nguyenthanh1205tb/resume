import React from 'react'
import MobileAppImg from 'src/assets/icons/icon-app.svg'
import WebDesignImg from 'src/assets/icons/icon-design.svg'
import WebDevImg from 'src/assets/icons/icon-dev.svg'
import MoreImg from 'src/assets/icons/more.png'
import MyTechs from 'src/configs/myTechs.json'

function About() {
  const myTechs = MyTechs

  return (
    <div>
      <div className="pb-0 pb-sm-2">
        <h1 className="title title--h1 title__separate">About Me</h1>
        <p>
          I&lsquo;m frontend engineer from Viet Nam, working in web development. I have a strong base of knowledge about
          Frontend. With many years of experience, i&lsquo;m confident can bring the best fit &quot;therapy&quot; for
          the projects, thereby enhancing the user experience with the product.
        </p>
        <p>
          My job is to build your website so that it is functional and user-friendly but at the same time attractive.
          Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is
          to bring across your message and identity in the most creative way. I enjoy turning complex problems into
          simple, beautiful and intuitive designs.
        </p>
      </div>
      <h2 className="title title--h2 mt-3">What I&lsquo;m Doing</h2>
      <div className="row">
        {/* Case Item */}
        <div className="col-12 col-lg-6">
          <div className="case-item box box--s2 box-inner">
            <img className="case-item__icon" src={WebDesignImg} alt="" />
            <div>
              <h3 className="title title--h3">Web Design</h3>
              <p className="case-item__caption">
                The most modern and high-quality design made at a professional level.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="case-item box box--s2 box-inner">
            <img className="case-item__icon" src={WebDevImg} alt="" />
            <div>
              <h3 className="title title--h3">Web Development</h3>
              <p className="case-item__caption">High-quality development of sites at the professional level.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="case-item box box--s2 box-inner">
            <img className="case-item__icon" src={MobileAppImg} alt="" />
            <div>
              <h3 className="title title--h3">Mobile Apps</h3>
              <p className="case-item__caption">Professional development of applications for iOS and Android.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 opacity-50">
          <div className="case-item box box--s2 box-inner">
            <img className="case-item__icon" src={MoreImg} alt="" />
            <div>
              <h3 className="title title--h3">More...</h3>
              <p className="case-item__caption">I&lsquo;m always learning more to can do more things.</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="title title--h2 mt-3">Resume</h2>
      {/* Experience */}
      <h2 className="title title--h2">
        <span className="box box--s2 icon-box">
          <i className="font-icon feathericon-book-open" />
        </span>
        Education
      </h2>
      <div className="timeline">
        {/* Item */}
        <article className="timeline__item">
          <h5 className="title title--h4 timeline__title">Economic and Technical school district 12</h5>
          <span className="timeline__period">2015 — 2018</span>
          <p className="timeline__description">
            Graduated with an excellent degree. <br />
            Participating in school-level excellent student awards 2018: First prize. <br />
            Participating in the district-level excellent student award 2018: Consolation prize.
          </p>
        </article>
      </div>
      <h2 className="title title--h2">
        <span className="box box--s2 icon-box">
          <i className="font-icon feathericon-briefcase" />
        </span>
        Experience
      </h2>
      <div className="timeline exp">
        {/* Item */}
        <article className="timeline__item">
          <h5 className="title title--h4 timeline__title">
            Ongoing - <span className="opacity-70">Freelancer developer</span>
          </h5>
          <span className="timeline__period">07/2023 — Present</span>
          <p className="timeline__description">Continue write my life...</p>
        </article>
        <article className="timeline__item">
          <h5 className="title title--h4 timeline__title">
            Missmoney Penny Technologies - <span className="opacity-70">Remote fulltime frontend developer</span>
          </h5>
          <span className="timeline__period">06/2022 — 07/2023</span>
          <div className="timeline__description">
            <ul>
              <li>- I take the main responsibility to transfer from the design to code by Vuejs and Reactjs.</li>
              <li>- Use Python, Playwright, and Behave for the test cases to check bugs.</li>
              <li>- Create common components and common functions to reuse.</li>
              <li>
                - Work directly with clients to get feedback regarding errors and discuss other features want to
                develop.
              </li>
              <li>
                - Develop the Wallet Pass editor. The clients can create the passes easier and intuitively and add them
                to Apple Wallet and Google Wallet.
              </li>
              <li>
                - Develop a schedule calendar for the Wallet Pass. The clients can change the content over time and push
                the notification for users.
              </li>
            </ul>
          </div>
        </article>
        <article className="timeline__item">
          <h5 className="title title--h4 timeline__title">
            viAct.ai - <span className="opacity-70">Remote fulltime frontend developer</span>
          </h5>
          <span className="timeline__period">10/2021 — 10/2022</span>
          <div className="timeline__description">
            <ul>
              <li>- I take the main responsibility to transfer from the design to code by Reactjs.</li>
              <li>- Cooperate, and discuss with other teams to develop the company&lsquo;s AI services.</li>
              <li>- Responsible for reviewing code and making sure the quality code is fine to read and maintain.</li>
            </ul>
          </div>
        </article>
        <article className="timeline__item">
          <h5 className="title title--h4 timeline__title">
            VTVLive - <span className="opacity-70">Fulltime frontend developer</span>
          </h5>
          <span className="timeline__period">03/2020 — 09/2021</span>
          <div className="timeline__description">
            <ul>
              <li>- Brainstorm design ideas and use Figma to design interfaces (UI).</li>
              <li>
                - Design UI, use Reactjs and Adobe Flash to build TV productions, such as rewinding previously played
                programs, and especially live interactive TV by the remote.
              </li>
              <li>- Responsible for reviewing code and making sure the quality code is fine to read and maintain.</li>
            </ul>
          </div>
        </article>
        <article className="timeline__item">
          <h5 className="title title--h4 timeline__title">
            Xtek Company (outsource) - <span className="opacity-70">Fulltime frontend developer</span>
          </h5>
          <span className="timeline__period">09/2018 — 02/2020</span>
          <div className="timeline__description">
            <div className="flex flex-col space-y-4">
              <div>
                <p className="font-semibold">
                  Mubarat&lsquo;s pitch management:{' '}
                  <i>Pitch Management Website - E-Commerce Exchange sports equipment.</i>
                </p>
                <ul className="ml-4">
                  <li>- Take the main responsibility to transfer from the design to code by using ReactJS</li>
                  <li>
                    - Build a system for managing data football pitches. That&lsquo;s handling booking, timeframe for
                    the game time between teams, set game matches according to the user&lsquo;s needs.
                  </li>
                  <li>- Build a system for football players, and provide a scoring-rating system.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">
                  CSE exchange: <i>Cryptocurrency Exchange Marketplace.</i>
                </p>
                <ul className="ml-4">
                  <li>- Use Figma to design interfaces (UI).</li>
                  <li>- Take the main responsibility to transfer from the design to code by using Vuejs.</li>
                  <li>- Find technology solutions alternatives regarding candlestick charts</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">
                  GoTrippie: <i>Backpacking Tourism Website.</i>
                </p>
                <ul className="ml-4">
                  <li>
                    - Take the main responsibility to transfer from the design to code by using Vuejs. and React Native
                    for mobile.
                  </li>
                  <li>
                    - Discuss with the backend team and product team to find the solutions to solve the problems
                    regarding the suggestion journey for the user.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
      {/* Skills */}
      <h2 className="title title--h2 mt-3">My Techs</h2>
      <div className="box box--s2 box-inner mb-0">
        <ul className="techs flex flex-wrap">
          {myTechs.map((tech, i) => (
            <li className="flex items-center justify-center p-4 mr-2 mt-2 cursor-pointer box box-inner box--s2" key={i}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center" style={{ height: '200px' }}>
        <p className="animate__animated animate__infinite text-6xl cursor-pointer text-amber-400 animate__headShake">
          Hire me!
        </p>
      </div>
    </div>
  )
}
export default About
