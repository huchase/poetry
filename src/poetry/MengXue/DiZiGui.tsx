import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import {
  CommonBook,
  IndexPageOrigin,
} from '../components/BookGenerator/index'

interface SingleData {
  chapter: string
  paragraphs: string[]
}
export interface FetchData {
  title: string
  author: string
  content: SingleData[]
}

const info = {
  title: '弟子规',
  root: '/dizigui',
  adapter(i: SingleData) {
    return {
      ...i,
      title: i.chapter,
      content: i.paragraphs,
    }
  },
  getData(): Promise<SingleData[]> {
    return BookStore.getBook<FetchData>('/mengxue/dizigui.json').then(
      i => i.content,
    )
  },
}
const DiZiGui: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

const DiZiGuiIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function DiZiGuiRouter() {
  return <>
        <Route path="/dizigui" element={<DiZiGuiIndex />}></Route>
        <Route path="/dizigui/:poetryId" element={<DiZiGui />}></Route>
    </>
}
