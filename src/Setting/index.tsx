import { useState } from 'react'
import { AsyncLoad } from '../poetry/components/AsyncComponent'
import { Setting, SettingServer } from './Setting'

const AsyncLoadSetting = AsyncLoad(
  async () => {
    const { FloatWindow } = await import('./FloatWindow')
    return {
      default: FloatWindow,
    }
  },
  'default',
  {},
  null, // 将加载页面去除
)

// import { SettingPage } from "./SettingPage";
export function useSetting() {
  let page: JSX.Element

  const [setting, setNewSetting] = useState(Setting)
  SettingServer.on('change', () => {
    setNewSetting({ ...Setting })
  })
  return {
    server: SettingServer,
    init() {
      if (page)
        return page
      page = AsyncLoadSetting
      return AsyncLoadSetting
    },
    setting,
  }
}
