import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import { CommonBook, IndexPageOrigin } from '../components/BookGenerator'

interface SingleData {
  title: string
  section: string
  author: string
  content: string[]
}
export type FetchData = SingleData[]

const info = {
  title: '楚辞',
  root: '/chuci',
  adapter(i: SingleData) {
    // 这里不需要使用 tag、belongTo，系统自动生成
    return { ...i, subTitle: i.section }
  },
  async getData(): Promise<FetchData> {
    return BookStore.getBook(
      'https://cdn.jsdelivr.net/gh/chinese-poetry/chinese-poetry/chuci/chuci.json',
      true,
    )
  },
}
export const ChuCi: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

export const ChuCiIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function ChuCiRouter() {
  return <>
        <Route path="/chuci" element={<ChuCiIndex />}></Route>
        <Route path="/chuci/:poetryId" element={<ChuCi />}></Route>
    </>
}
