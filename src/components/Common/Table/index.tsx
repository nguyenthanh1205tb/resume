/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, ReactNode } from 'react'

export interface TableColumns {
  label: string
  dataIndex: string
  key: string
  render?: (val: any, index: number) => string | ReactNode | React.Component
}

export type TableDataSources = Array<Record<string, any>> | Array<any>

interface TableProps {
  cols: TableColumns[]
  dataSources: TableDataSources
}
function Table({ cols, dataSources }: PropsWithChildren<TableProps>) {
  return (
    <div className="overflow-x-auto w-full min-h-screen">
      <table className="table w-full text-xs">
        <thead>
          <tr>
            {cols.map(c => (
              <th className="!capitalize !bg-gray-100" key={`top-head-${c.key}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSources.map((d, index) => (
            <tr key={index}>
              {cols.map(c => (
                <td key={`${c.key}-${index}`}>{c.render ? c.render(d, index) : d[c.dataIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {dataSources.length > 10 ? (
          <tfoot>
            <tr>
              {cols.map(c => (
                <th className="!capitalize !bg-gray-100" key={`bot-head-${c.key}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  )
}
export default Table
