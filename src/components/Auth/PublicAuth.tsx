import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import AvatarImg from 'src/assets/images/my-avatar.png'
import { useCurrentPath } from 'src/hooks/useHelp'

function PublicAuth() {
  const navs = [
    {
      path: '/about',
      name: 'About',
      disable: false,
    },
    {
      path: '/resume',
      name: 'Resume',
      disable: false,
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      disable: false,
    },
    {
      path: '/blog',
      name: 'Blog',
      disable: true,
    },
  ]

  return (
    <div className="container">
      <main className="main">
        <div className="container gutter-top gutter-bottom">
          <div className="row sticky-parent">
            <aside className="col-12 col-md-12 col-xl-3">
              <div className="sidebar box-outer sticky-column">
                <div className="sidebar__base-info">
                  <figure className="avatar-box">
                    <img src={AvatarImg} alt="Ricardo Black" />
                  </figure>
                  <div className="text-xl-center">
                    <h3 className="title title--h3 sidebar__name">Aaron Nguyen</h3>
                    <div className="badge">Frontend Developer</div>
                  </div>
                  {/* <button className="btn btn--small btn--icon-right sidebar__btn js-btn-toggle">
                    <span>Show Contacts</span>
                    <i className="feathericon-chevron-down" />
                  </button> */}
                </div>
                <div className="sidebar__additional-info js-show">
                  <div className="separation" />
                  <ul className="details-info">
                    <li className="details-info__item">
                      <span className="box box--s2 icon-box">
                        <i className="font-icon icon-envelope" />
                      </span>
                      <div className="contacts-block__info">
                        <span className="overhead">Email</span>
                        <a
                          className="text-overflow"
                          href="mailto:nguyenhthanh1205tb@example.com"
                          title="nguyenhthanh1205tb@example.com">
                          nguyenhthanh1205tb@example.com
                        </a>
                      </div>
                    </li>
                    <li className="details-info__item">
                      <span className="box box--s2 icon-box">
                        <i className="font-icon icon-phone" />
                      </span>
                      <div className="contacts-block__info">
                        <span className="overhead">Phone</span>
                        <span className="text-overflow" title="+1 (070) 123-4567">
                          +84 398-958-598
                        </span>
                      </div>
                    </li>
                    <li className="details-info__item">
                      <span className="box box--s2 icon-box">
                        <i className="font-icon icon-calendar" />
                      </span>
                      <div className="contacts-block__info">
                        <span className="overhead">Birthday</span>
                        <span className="text-overflow" title="March 12, 1995">
                          May 12, 1998
                        </span>
                      </div>
                    </li>
                    <li className="details-info__item">
                      <span className="box box--s2 icon-box">
                        <i className="font-icon icon-location" />
                      </span>
                      <div className="contacts-block__info">
                        <span className="overhead">Location</span>
                        <span className="text-overflow" title="San-Francisco, USA">
                          Thai Binh, Viet Nam
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="separation d-xl-none" />
                  <div className="social">
                    <a
                      className="social__link"
                      href="https://www.facebook.com/Aaron.nguyen.1205tb/"
                      target="_blank"
                      rel="noreferrer">
                      <i className="feathericon-facebook" />
                    </a>
                    <a
                      className="social__link"
                      href="https://www.linkedin.com/in/aaron-nguyen-4509a2185/"
                      target="_blank"
                      rel="noreferrer">
                      <i className="feathericon-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-12 col-md-12 col-xl-9">
              <div className="box-outer">
                {/* Menu */}
                <div className="nav-container">
                  <ul className="nav">
                    {navs.map((n, i) =>
                      !n.disable ? (
                        <li key={i} className="nav__item">
                          <Link className={classnames({ active: useCurrentPath(navs, n.path) })} to={n.path}>
                            {n.name}
                          </Link>
                        </li>
                      ) : (
                        <li key={i} className="nav__item opacity-40 cursor-default">
                          {n.name}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default observer(PublicAuth)
