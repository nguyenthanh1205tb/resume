import React from 'react'
import MyTechs from 'src/configs/myTechs.json'

interface ResumeProps {}
function Resume({}: ResumeProps) {
  const myTechs = MyTechs
  return (
    <div>
      <>
        {/* About */}
        <div className="pb-3">
          <h1 className="title title--h1 title__separate">Resume</h1>
        </div>
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
        <div className="timeline">
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
                  - Develop the Wallet Pass editor. The clients can create the passes easier and intuitively and add
                  them to Apple Wallet and Google Wallet.
                </li>
                <li>
                  - Develop a schedule calendar for the Wallet Pass. The clients can change the content over time and
                  push the notification for users.
                </li>
              </ul>
            </div>
          </article>
          <article className="timeline__item">
            <h5 className="title title--h4 timeline__title">
              viAct.ai - <span className="opacity-70">Remote fulltime frontend developer</span>
            </h5>
            <span className="timeline__period">10/2021 — 10/2022</span>
            <p className="timeline__description">
              Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas
              molestias exceptur.
            </p>
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
                      - Take the main responsibility to transfer from the design to code by using Vuejs. and React
                      Native for mobile.
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
              <li
                className="flex items-center justify-center p-4 mr-2 mt-2 cursor-pointer box box-inner box--s2"
                key={i}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  )
}
export default Resume
