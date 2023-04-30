import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import DocumentImg from 'src/assets/images/document.png'
import Group1Img from 'src/assets/images/group1.png'
import Group2Img from 'src/assets/images/group2.png'
import HeroSVG from 'src/assets/images/hero.svg'
import ImageImg from 'src/assets/images/image.png'
import PDFImg from 'src/assets/images/pdf.png'
import PageContainer from 'src/components/Common/Container/Page'
import HeroSearch from 'src/components/Common/Search'

function Landing() {
  const tools = [
    {
      name: 'PDF tools',
      desc: 'Resolve your PDF Problems',
      img: PDFImg,
      totalTools: 12,
      featuredTool: 'Unlock PDF',
      colors: {
        bgHead: '#6F56EC',
        bgFeatured: '#EFEDFD',
      },
    },
    {
      name: 'File tools',
      desc: 'Resolve your File Problems',
      img: DocumentImg,
      totalTools: 3,
      featuredTool: 'Convert to PDF',
      colors: {
        bgHead: '#D61C4E',
        bgFeatured: '#FDEDF1',
      },
    },
    {
      name: 'Images tools',
      desc: 'Resolve your Image Problems',
      img: ImageImg,
      totalTools: 4,
      featuredTool: 'Add Watermark',
      colors: {
        bgHead: '#1C67CA',
        bgFeatured: '#EDF4FD',
      },
    },
  ]
  const history = useHistory()
  const goToToolsPage = () => history.push('/tools')

  return (
    <PageContainer>
      <div className="py-4 flex items-center space-x-2">
        <p>
          <span className="font-semibold">Recent tool added: </span>
        </p>
        <Link to="#" className="btn btn-sm btn-outline !text-blue-600 !capitalize recent-tool-btn">
          PDF to DOCX
        </Link>
      </div>
      <div>
        <p className="text-5xl text-center mt-4 font-extrabold tracking-wide">
          Free tools to make <span className="text-primary">Everything</span> simple
        </p>
        <div className="flex justify-center py-8">
          <img src={HeroSVG} />
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center text-center">
          <p>We offer PDF, file, image and other online tools to make your life easier</p>
          <HeroSearch className="sm:w-128" size="large" />
          <div
            className="w-full md:w-10/12 m-auto
          ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <div key={index}>
                  <div className="p-4 rounded-t-3xl text-white text-left" style={{ background: tool.colors.bgHead }}>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="rounded-full w-10 h-10 bg-white/40 flex justify-center items-center">
                        <img src={tool.img} className="w-5" />
                      </div>
                      <div className="bg-white/40 rounded-3xl text-sm px-2 py-1">
                        {tool.totalTools > 10 ? '10+' : tool.totalTools} tools
                      </div>
                    </div>
                    <div className="pt-2 flex flex-col space-y-2">
                      <p className="font-semibold text-lg">{tool.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{tool.desc}</p>
                        <FiArrowRight />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 pb-4 px-4 bg-white rounded-b-3xl">
                    <div
                      className="flex items-center justify-between py-2 px-4 rounded-lg"
                      style={{ background: tool.colors.bgFeatured }}>
                      <p className="text-xs capitalize">Featured tool:</p>
                      <p className="text-blue-500 font-semibold text-xs">{tool.featuredTool}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex justify-center space-x-8 items-center py-8 rounded-3xl my-16 text-left"
            style={{ background: '#EFF7FD' }}>
            <div className="flex items-center justify-center space-x-4 flex-initial">
              <p className="text-blue-500 text-5xl font-semibold">20k</p>
              <p className="flex flex-col text-gray-600">
                <span>Active</span>
                <span>Users</span>
              </p>
            </div>
            <div className="text-gray-300 text-2xl">|</div>
            <div className="flex items-center justify-center space-x-4 flex-initial">
              <p className="text-blue-500 text-5xl font-semibold">10k</p>
              <p className="flex flex-col text-gray-600">
                <span>Files</span>
                <span>Files</span>
              </p>
            </div>
            <div className="text-gray-300 text-2xl">|</div>
            <div className="flex items-center justify-center space-x-4 flex-initial">
              <p className="text-blue-500 text-5xl font-semibold">10+</p>
              <p className="flex flex-col text-gray-600">
                <span>Online</span>
                <span>tools</span>
              </p>
            </div>
            <div className="text-gray-300 text-2xl">|</div>
            <div className="flex items-center justify-center space-x-4 flex-initial">
              <p className="text-blue-500 text-5xl font-semibold">50k+</p>
              <p className="flex flex-col text-gray-600">
                <span>PDFs</span>
                <span>Created</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 text-left py-8">
            <div className="pt-16 flex flex-col space-y-4">
              <p className="text-3xl font-semibold">We present the best of the best. All free, no catch</p>
              <div className="w-4/5 flex flex-col space-y-4">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, illum quos architecto facilis
                  quae, aliquid suscipit at molestias omnis delectus fugiat alias, itaque in maxime deserunt labore
                  magni necessitatibus cumque
                </p>
                <p className="font-semibold text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Group1Img} />
            </div>
          </div>

          <div className="grid grid-cols-2 text-left py-8">
            <div className="flex justify-start">
              <img src={Group2Img} />
            </div>
            <div className="pt-16 flex flex-col space-y-4">
              <p className="text-3xl font-semibold">No Limits, No Sign-Up</p>
              <div className="w-4/5 flex flex-col space-y-4">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, illum quos architecto facilis
                  quae, aliquid suscipit at molestias omnis delectus fugiat alias, itaque in maxime deserunt labore
                  magni necessitatibus cumque
                </p>
                <p className="font-semibold text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="py-4">
                <button className="btn !capitalize !bg-blue-500 !border-blue-500 !text-white" onClick={goToToolsPage}>
                  See all tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
export default Landing
