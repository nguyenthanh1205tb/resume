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
    <Modal isOpen={isOpen} onClose={onClose} styles={{ width: '768px' }}>
      <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-surface-2)' }}>
        <Typo.Title>Project details</Typo.Title>
        <div className="cursor-pointer" onClick={onClose}>
          <MdClose size={30} />
        </div>
      </div>
      <div className="flex flex-col items-start mt-2 pb-4">
        <div className="w-full pt-3 space-y-4 flex flex-col">
          {data?.thumb === '' ? (
            <div
              className="bg-amber-500 w-full flex items-center justify-center"
              style={{ borderRadius: 'var(--radius-8)' }}>
              <p className="text-2xl font-bold text-white">Demo</p>
            </div>
          ) : (
            <div className="w-full bg-center bg-cover bg-no-repeat" style={{ borderRadius: 'var(--radius-8)' }}>
              <img src={data?.thumb} alt={data?.name} />
            </div>
          )}
          <div className="w-full">
            <ul className="flex flex-row space-x-4 flex-wrap items-center">
              <li className="flex items-center space-x-1">
                <BiLink size={19} />
                <a href={data?.link} target="_blank" rel="noreferrer">
                  {data?.name}
                </a>
              </li>
              {data?.otherLink?.map((item, i) => (
                <li key={i} className="flex items-center space-x-1">
                  <BiLink size={19} />
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {`${data?.name} ${item.name}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full ">
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
