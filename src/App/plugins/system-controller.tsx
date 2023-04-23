import { IconSettings } from '@arco-design/web-react/icon'
import type { FC } from 'react'
import { TopMenuController } from '../TopMenu'
import { useSetting } from '../../Setting/index'
import { SettingServer } from '../../Setting/Setting'

/** 在顶栏的控制按钮 */
export const Controller: FC = () => {
  const { init } = useSetting()
  return (
        <>
            {init()}
            <IconSettings
                onClick={() => {
                  SettingServer.emit('toggle', true)
                }}
            />
        </>
  )
}

export function applySystemController() {
  TopMenuController.emit('register', {
    slot: 'Button',
    component: Controller,
    list: true,
  })
}
