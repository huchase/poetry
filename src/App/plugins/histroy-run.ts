import { TopMenuController } from '../TopMenu'
import { HistoryController } from '../../History/Pannel'

export function applyHistoryRun() {
  TopMenuController.emit('register', {
    slot: 'Button',
    component: HistoryController,
    list: true,
  })
}
