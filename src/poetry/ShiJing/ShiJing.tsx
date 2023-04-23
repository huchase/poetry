import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import { CommonBook, IndexPageOrigin } from '../components/BookGenerator/index'

interface SingleData {
  chapter: string
  title: string
  section: string
  content: string[]
}
export type FetchData = SingleData[]

async function getData(): Promise<FetchData> {
  return BookStore.getBook('shijing/shijing.json')
}
function adapter(i: SingleData) {
  /** @ts-expect-error */
  i.subTitle = `${i.chapter} ${i.section}`
  return i
}

const info = {
  title: '诗经',
  root: '/shijing',
  adapter,
  getData,
}
const ShiJing: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

const ShiJingIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function ShiJingRouter() {
  return <>
        <Route path="/shijing" element={<ShiJingIndex />}></Route>
        <Route path="/shijing/:poetryId" element={<ShiJing />}></Route>
    </>
}
