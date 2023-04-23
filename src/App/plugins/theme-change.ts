import { ThemeChange } from '../ThemeChange'
import { TopMenuController } from '../TopMenu'

export function applyThemeChange() {
  TopMenuController.emit('register', {
    slot: 'Button',
    component: ThemeChange,
    list: true,
  })
}
