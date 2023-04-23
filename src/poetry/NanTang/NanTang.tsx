import type { FC } from 'react'

import { Route } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import { CommonBook, IndexPageOrigin } from '../components/BookGenerator'

interface SingleData {
  title: string
  author: string
  notes: string[]
  paragraphs: string[]
}
export type FetchData = SingleData[]

async function getData(): Promise<FetchData> {
  return BookStore.getBook('/wudai/nantang/poetrys.json')
}
function adapter(i: SingleData) {
  return { ...i, content: i.paragraphs }
}

const info = {
  title: '南唐二主词',
  root: '/nantang',
  adapter,
  getData,
}
export const NanTang: FC = () => {
  return <CommonBook {...info}></CommonBook>
}

export const NanTangIndex: FC = () => {
  return <IndexPageOrigin {...info}></IndexPageOrigin>
}
export function NanTangRouter() {
  return <>
        <Route path="/nantang" element={<NanTangIndex />}></Route>
        <Route path="/nantang/:poetryId" element={<NanTang />}></Route>
    </>
}
