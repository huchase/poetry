import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import { CommonBook, IndexPageOrigin } from '../components/BookGenerator/index'

interface SingleData {
  chapter: string
  paragraphs: string[]
}
export type FetchData = SingleData[]

const info = {
  title: '论语',
  root: '/lunyu',
  adapter(i: SingleData) {
    return { title: i.chapter, content: i.paragraphs }
  },
  getData(): Promise<FetchData> {
    return BookStore.getBook('lunyu/lunyu.json')
  },
}
const LunYu: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

const LunYuIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function LunYuRouter() {
  return <>
        <Route path="/lunyu" element={<LunYuIndex />}></Route>
        <Route path="/lunyu/:poetryId" element={<LunYu />}></Route>
    </>
}
