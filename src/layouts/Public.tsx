import React, { PropsWithChildren, Fragment } from 'react'
import FacebookImg from 'src/assets/images/facebook.png'
import TwitterImg from 'src/assets/images/twitter.png'
import GithubImg from 'src/assets/images/github.png'
import { Link } from 'react-router-dom'
import PageContainer from 'src/components/Common/Container/Page'
import HeroContactImg from 'src/assets/images/hero-contact.png'
import Navbar from 'src/components/Navbar'

interface PublicLayoutProps {}

function PublicLayout({ children }: PropsWithChildren<PublicLayoutProps>) {
  return (
    <Fragment>
      {!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
        <div className="flex justify-center items-center w-full bg-blue-400 text-white py-4">Dev environment</div>
      ) : null}
      <Navbar />
      <div className="flex items-center justify-center p-4 bg-blue-500 text-white space-x-4">
        <p>Want new updates? No Spam.</p>
        <button className="btn btn-sm btn-outline !border-white !text-white !capitalize !text-xs">Subscribe</button>
      </div>
      {children}
      <div className="bg-blue-400 text-white pt-8">
        <PageContainer>
          <div className="grid grid-cols-2 text-left py-8">
            <div className="pt-32 flex flex-col space-y-4">
              <p className="text-3xl font-semibold">Support Sota-Conversion</p>
              <div className="w-4/5 flex flex-col space-y-4">
                <p>
                  SotaConversion is 100% free to use (even OCR), with no pesky registration required. For our most loyal
                  supporters, a $5.99/month plan unlocks an ad and captcha free experience.
                </p>
              </div>
              <div className="py-4">
                <button className="btn !capitalize !bg-white !border-none !text-blue-500">support us</button>
              </div>
            </div>
            <div className="flex justify-start">
              <img src={HeroContactImg} />
            </div>
          </div>
        </PageContainer>
      </div>
      <div className="text-white">
        <div className="bg-blue-500">
          <div className="py-6 px-4 flex items-center justify-between m-auto" style={{ maxWidth: '1024px' }}>
            <p>Find us on any of these platforms, we respond 1-2 business days.</p>
            <div className="flex flex-row items-center justify-center space-x-4">
              <a className="btn btn-outline border-none hover:bg-transparent !p-0">
                <img src={FacebookImg} className="w-6" />
              </a>
              <a className="btn btn-outline border-none hover:bg-transparent !p-0">
                <img src={TwitterImg} className="w-6" />
              </a>
              <a className="btn btn-outline border-none hover:bg-transparent !p-0">
                <img src={GithubImg} className="w-6" />
              </a>
            </div>
          </div>
        </div>
        <div
          className="px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 text-black m-auto"
          style={{ maxWidth: '1024px' }}>
          <div>
            <p className="text-4xl font-semibold">Let&apos;s keep in touch!</p>
            <p className="mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600 text-2xl">
                Sota Conversion
              </span>{' '}
              provides free online conversion, pdf, and other handy tools to help you solve problems of all types. All
              files both processed and unprocessed are deleted after 1 hour
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-bold">Useful links</p>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link to="#">About</Link>
                </li>
                <li>
                  <Link to="#">Blog</Link>
                </li>
                <li>
                  <Link to="#">Free products</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-bold">Other resources</p>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link to="#">Terms & conditions</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link to="#">Contact us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-black flex justify-center items-center pb-4">
          <p className="text-sm">Copyright © 2023 SOTA Solutions.</p>
        </div>
      </div>
    </Fragment>
  )
}

export default PublicLayout
