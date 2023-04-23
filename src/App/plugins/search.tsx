import { IconSearch } from '@arco-design/web-react/icon'
import { useNavigate } from 'react-router-dom'
import { TopMenuController } from '../TopMenu'

function component() {
  const nav = useNavigate()
  return <IconSearch onClick={() => nav('/search')}></IconSearch>
}
export function applySearchButton() {
  TopMenuController.emit('register', {
    slot: 'Button',
    component,
    list: true,
  })
}
