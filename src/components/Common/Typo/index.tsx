import React, { PropsWithChildren } from 'react'

interface TypoProps {}
function Typo({ children }: PropsWithChildren<TypoProps>) {
  return <div>{children}</div>
}
function Heading({ children }: PropsWithChildren<TypoProps>) {
  return <h1 className="title title--h1 title__separate">{children}</h1>
}
function Title({ children }: PropsWithChildren<TypoProps>) {
  return <h2 className="title title--h2 mt-3">{children}</h2>
}

Typo.Heading = Heading
Typo.Title = Title
export default Typo
