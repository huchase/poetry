import { Requester } from '../Requester'
import type { InnerObjectType, ObjectProvider } from './CommonBook'

export interface BookConverter<T> {
  getData(root: string): Promise<T[]>
  root?: string
  /** 将单个对象转化为对应属性的元素 */
  adapter: (i: T) => ObjectProvider
}
export function BookFetch<T>({
  getData,
  adapter,
  element,
  root = '',
}: {
  element: (i: InnerObjectType[]) => JSX.Element
} & BookConverter<T>) {
  return Requester<T[], ObjectProvider[]>({
    getData,
    url: root,
    adapter(data) {
      return data.map(adapter)
    },
    /** @ts-expect-error */
    element,
  })
}
