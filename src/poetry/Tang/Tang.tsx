import type { FC } from 'react'
import React from 'react'

import { Route, useParams } from 'react-router-dom'
import { BookStore } from '../utils/BookStore'
import { CommonBook, IndexPageOrigin } from '../components/BookGenerator'
import { NumberToCN } from '../utils/NumberToCN'
import { AllIndex } from './SpecialIndex'

interface SingleData {
  author: string
  dynasty: string
  paragraphs: string[]
  title: string
}
export type FetchData = SingleData[]

const info = {
  title: '唐诗',
  root: '/tang/', // 这个字段在下面会被加工
  adapter(i: SingleData) {
    return { ...i, content: i.paragraphs }
  },
  async getData(root: string): Promise<FetchData> {
    const index = parseInt(root.replace(/^\/tang\/(.*)/, '$1'))
    if (Number.isNaN(index)) {
      console.log(root)
      throw new Error('解析错误')
    }
    return BookStore.getBook(`json/poet.tang.${index}.json`)
  },
}

const Tang: FC = () => {
  const { index } = useParams()
  return <CommonBook {...info} root={info.root + index!}></CommonBook>
}
const TangIndex: FC = () => {
  const { index } = useParams()
  return (
        <IndexPageOrigin
            {...info}
            title={
                `${info.title
                } 其${
                NumberToCN((parseInt(index!) / 1000).toString())}`
            }
            root={info.root + index!}></IndexPageOrigin>
  )
}
export function TangRouter(): React.ReactElement {
  return (
        <>
            <Route path="/tang" element={<AllIndex />}></Route>
            <Route path="/tang/:index" element={<TangIndex />}></Route>
            <Route path="/tang/:index/:poetryId" element={<Tang />}></Route>
        </>
  )
}
