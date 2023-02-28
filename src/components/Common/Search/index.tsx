import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import SearchImg from 'src/assets/images/search.png'

interface HeroSearchProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  onChange?: (value: string) => void
}
function HeroSearch({ className, size, ...props }: PropsWithChildren<HeroSearchProps>) {
  return (
    <div className="flex flex-col justify-center items-center py-8 px-8">
      <div className={classNames('"form-control drop-shadow-sm w-full sm:w-96"', className)}>
        <label className={classNames('input-group input-group-lg', { 'h-16': size === 'large' })}>
          <label className="input-group">
            <span className="!bg-white !rounded-l-full">
              <img src={SearchImg} alt="i" className="w-7" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className={classNames('input input-bordered w-full !outline-none border-none !pl-0', {
                '!h-16': size === 'large',
              })}
              onChange={e => props.onChange && props.onChange(e.target.value)}
            />
            <div className="bg-white !rounded-r-full pr-2 flex items-center">
              <button
                className={classNames('btn border-none !bg-blue-500 btn-sm !rounded-full !text-md !capitalize', {
                  '!btn-md': size === 'large',
                })}>
                Search
              </button>
            </div>
          </label>
        </label>
      </div>
    </div>
  )
}
export default HeroSearch
