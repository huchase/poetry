import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import {
  CommonBook,
  IndexPageOrigin,
} from '../components/BookGenerator/index'

interface SingleData {
  title: string
  content: {
    chapter: string
    paragraphs: string[]
  }[]
}
export interface FetchData {
  title: string
  author: string
  content: SingleData[]
}

const info = {
  title: '幼学琼林',
  root: '/youxueqionglin',
  adapter(i: SingleData) {
    return {
      ...i,
      content: i.content.flatMap((item) => {
        return [item.chapter, ...item.paragraphs]
      }),
    }
  },
  getData(): Promise<SingleData[]> {
    return BookStore.getBook<FetchData>(
      '/mengxue/youxueqionglin.json',
    ).then(res => res.content)
  },
}
export const YouXueQiongLin: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

export const YouXueQiongLinIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function YouXueQiongLinRouter() {
  return <>
        <Route path="/youxueqionglin" element={<YouXueQiongLinIndex />}></Route>
        <Route
            path="/youxueqionglin/:poetryId"
            element={<YouXueQiongLin />}></Route>
    </>
}
