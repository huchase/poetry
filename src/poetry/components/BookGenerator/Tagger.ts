import { Tagger as _T } from '../../../../packages/IndexBuilder/src/Tagger.mjs'
import type { InnerObjectType, ObjectProvider, TaggerType } from './CommonBook'

/** @ts-expect-error */

// 使用全局统一的 Tagger 保证代码不出错
export const Tagger: TaggerType<InnerObjectType> = _T
export function wrapAdapter<T>(func: (i: T) => ObjectProvider): ((i: T) => InnerObjectType) {
  return (data) => {
    const i = func(data)
    /** @ts-expect-error */
    i.tag = Tagger.gen(i)
    return i as InnerObjectType
  }
}
