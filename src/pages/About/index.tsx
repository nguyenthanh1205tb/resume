import React, { PropsWithChildren } from 'react'
import MobileAppImg from 'src/assets/icons/icon-app.svg'
import WebDesignImg from 'src/assets/icons/icon-design.svg'
import WebDevImg from 'src/assets/icons/icon-dev.svg'
import MoreImg from 'src/assets/icons/more.png'

interface AboutProps {}
function About({}: PropsWithChildren<AboutProps>) {
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
      <div style={{ height: '200px' }}></div>
    </div>
  )
}
export default About
