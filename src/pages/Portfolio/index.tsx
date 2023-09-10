import React, { useState } from 'react'
import DemoBusiness01Thumb from 'src/assets/images/projects/demo-business-01.svg'
import DemoEcommerce01Thumb from 'src/assets/images/projects/demo-ecommerce-01.svg'
import ViescanThumb from 'src/assets/images/projects/viescan.svg'
import { Project } from 'src/configs/Types'
import { wait } from 'src/helpers'
import BadgedProject from './Components/Badged'
import DetailsProject from './Components/Details'

interface PortfolioProps {}
const data: Project[] = [
  {
    name: 'Viescan',
    shortDesc: 'Conversion tool',
    desc: 'Viescan is a web conversion tools, we can use this web for merge pdf page, delete pages on pdf file, add watermark for pdf file, and more. Besides Viescan provide a OCR (Optical Character Recognition) tools and file conversion. And the important thing is FREE, this web is free to use.',
    thumb: ViescanThumb,
    link: 'https://www.viescan.tech/',
    otherLink: [{ name: 'dev link', link: 'https://dev.viescan.tech/' }],
    isDone: false,
  },
  {
    name: 'Alpinus Business',
    shortDesc: 'Demo template website',
    desc: 'This is a demo website for business.',
    thumb: DemoBusiness01Thumb,
    link: 'https://demo-flc-business-01.alpinus.tech',
    isDone: false,
    isDemo: true,
  },
  {
    name: 'Irene shop',
    shortDesc: 'Demo template website',
    desc: 'This is a demo website for shop online, ecommerce domain.',
    thumb: DemoEcommerce01Thumb,
    link: 'https://demo-flc-ecommerce-01.alpinus.tech/',
    isDone: false,
    isDemo: true,
  },
]
function Portfolio({}: PortfolioProps) {
  const [isOpenProjectDetails, setIsOpenProjectDetails] = useState(false)
  const [projectClicked, setProjectClicked] = useState<Project | null>(null)

  const onOpenProjectDetail = async (project: Project) => {
    setProjectClicked(project)
    await wait(100)
    setIsOpenProjectDetails(true)
  }
  const onCloseProjectDetail = async () => {
    setIsOpenProjectDetails(false)
    await wait(200)
    setProjectClicked(null)
  }

  return (
    <div>
      <div className="pb-3">
        <h1 className="title title--h1 title__separate">Portfolio</h1>
      </div>
      <div className="select">
        <span className="placeholder">All</span>
        <ul className="filter">
          <li className="filter__item">Category</li>
          <li className="filter__item active">
            <p className="filter__link active">All</p>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <div key={i} className="category-design cursor-pointer" onClick={() => onOpenProjectDetail(item)}>
            <div className="text-white">
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
                <div className="flex items-center justify-between mt-2">
                  <h3 className="title gallery-grid__title mt-0">{item.name}</h3>
                  {!item.isDone ? <BadgedProject>in progress</BadgedProject> : <div></div>}
                </div>
                <span className="gallery-grid__category">{item.shortDesc}</span>
              </div>
            </div>
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
      <DetailsProject isOpen={isOpenProjectDetails} onClose={onCloseProjectDetail} data={projectClicked} />
    </div>
  )
}
export default Portfolio
