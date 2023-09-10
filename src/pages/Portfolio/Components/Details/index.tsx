import React, { PropsWithChildren } from 'react'
import { BiLink } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import Modal from 'src/components/Common/Modal'
import Typo from 'src/components/Common/Typo'
import { Project } from 'src/configs/Types'
import BadgedProject from '../Badged'

interface DetailsProjectProps {
  isOpen?: boolean
  onClose: () => void
  data: Project | null
}
function DetailsProject({ isOpen = false, onClose, data }: PropsWithChildren<DetailsProjectProps>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} styles={{ width: '650px' }}>
      <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-surface-2)' }}>
        <Typo.Title>Project details</Typo.Title>
        <div className="cursor-pointer" onClick={onClose}>
          <MdClose size={30} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:space-x-8 mt-2">
        <div className="w-full md:w-52 pt-3 space-y-4 flex flex-col">
          {data?.thumb === '' ? (
            <div
              className="bg-amber-500 w-full md:w-52 h-52 md:h-40 flex items-center justify-center"
              style={{ borderRadius: 'var(--radius-8)' }}>
              <p className="text-2xl font-bold text-white">Demo</p>
            </div>
          ) : (
            <div
              className="w-full md:w-52 h-52 md:h-40 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${data?.thumb})`, borderRadius: 'var(--radius-8)' }}></div>
          )}
          <div className="w-full">
            <ul className="flex flex-col space-y-2">
              <li className="flex items-center space-x-3">
                <BiLink size={24} />
                <a href={data?.link} target="_blank" rel="noreferrer">
                  {data?.name}
                </a>
              </li>
              {data?.otherLink?.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <BiLink size={24} />
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {`${data?.name} ${item.name}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:flex-1">
          <div className="flex justify-between items-center">
            <Typo.Title>{data?.name}</Typo.Title>
            <BadgedProject>{!data?.isDone ? 'in progress' : 'Done'}</BadgedProject>
          </div>
          <p>{data?.desc}</p>
        </div>
      </div>
    </Modal>
  )
}
export default DetailsProject
