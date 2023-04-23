import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import { CommonBook, IndexPageOrigin } from '../components/BookGenerator/index'

interface SingleData {
  title: string
  author: string
  para: string[]
}
export type FetchData = SingleData[]

const info = {
  title: '纳兰性德诗集',
  root: '/nalanxingde',
  adapter(i: SingleData) {
    return { ...i, content: i.para }
  },
  getData(): Promise<FetchData> {
    return BookStore.getBook(
      'https://cdn.jsdelivr.net/gh/chinese-poetry/chinese-poetry/nalanxingde/纳兰性德诗集.json',
      true,
    )
  },
}
const NaLanXingDe: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

const NaLanXingDeIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function NaLanXingDeRouter() {
  return <>
        <Route path="/nalanxingde" element={<NaLanXingDeIndex />}></Route>
        <Route path="/nalanxingde/:poetryId" element={<NaLanXingDe />}></Route>
    </>
}
