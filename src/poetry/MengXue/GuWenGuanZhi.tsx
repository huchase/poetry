import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import {
  CommonBook,
  IndexPageOrigin,
} from '../components/BookGenerator/index'

interface SingleData {
  chapter: string
  source: string
  author: string
  paragraphs: string[]
}
export interface FetchData {
  title: string
  content: {
    title: string
    content: SingleData[]
  }[]
}

const info = {
  title: '古文观止',
  root: '/guwenguanzhi',
  adapter(i: SingleData) {
    return {
      ...i,
      section: i.source,
      title: i.chapter,
      content: i.paragraphs,
    }
  },
  getData(): Promise<SingleData[]> {
    return BookStore.getBook<FetchData>('/mengxue/guwenguanzhi.json').then(
      i => i.content.flatMap(i => i.content),
    )
  },
}
export const GuWenGuanZhi: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

export const GuWenGuanZhiIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function GuWenGuanZhiRouter() {
  return <>
        <Route path="/guwenguanzhi" element={<GuWenGuanZhiIndex />}></Route>
        <Route
            path="/guwenguanzhi/:poetryId"
            element={<GuWenGuanZhi />}></Route>
    </>
}
