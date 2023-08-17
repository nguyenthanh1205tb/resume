import React from 'react'
import ViescanPNG from 'src/assets/images/projects/viescan.png'

interface PortfolioProps {}
function Portfolio({}: PortfolioProps) {
  const data = [
    {
      name: 'Viescan',
      desc: 'Conversion tool',
      thumb: ViescanPNG,
      link: 'https://www.viescan.tech/',
    },
    {
      name: 'Business 01',
      desc: 'Demo template website',
      thumb: '',
      link: 'https://demo-flc-business-01.alpinus.tech',
    },
  ]
  return (
    <div>
      <div className="pb-3">
        <h1 className="title title--h1 title__separate">Portfolio</h1>
      </div>
      <div className="select">
        <span className="placeholder">Select category</span>
        <ul className="filter">
          <li className="filter__item">Category</li>
          <li className="filter__item active">
            <p className="filter__link active">All</p>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, i) => (
          <div key={i} className="category-design">
            <a className="text-white" href={item.link} target="_blank" rel="noreferrer">
              <div className="gallery-grid__image-wrap">
                {item.thumb !== '' ? (
                  <img className="gallery-grid__image cover lazyload" src={item.thumb} alt="" />
                ) : (
                  <div className="bg-amber-500 w-full h-full flex items-center justify-center">
                    <p className="text-2xl font-bold ">Demo</p>
                  </div>
                )}
              </div>
              <div className="gallery-grid__caption">
                <h3 className="title gallery-grid__title">{item.name}</h3>
                <span className="gallery-grid__category">{item.desc}</span>
              </div>
            </a>
          </div>
        ))}
        {Array.from(new Array(12 - data.length), (_, i) => (
          <div key={data.length + i}>
            <div>
              <div className="gallery-grid__image-wrap border !border-dashed !border-zinc-700 flex items-center justify-center">
                <p className="text-2xl opacity-10 font-bold">Empty</p>
              </div>
              <div className="gallery-grid__caption">
                <h3 className="title gallery-grid__title"></h3>
                <span className="gallery-grid__category"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Portfolio
