import type Highlighter from 'web-highlighter'
import { SlotMap, createServer } from '../../../../Server/Template'

import './context-menu.css'

export interface DataType {
  highlighter: Highlighter
  name: string
  title: string // 组件的中文名称
  lookingId: string
}
const { Template, controller, DataContext } = createServer<
    DataType,
    'Header' | 'Footer',
    'Button'
>({
  name: 'poetry-content',
})
export { controller as ContextMenuController }
export const ContextMenu = Template(({ Slots, SlotList }) => {
  return (
        <main className="context-menu box-col">
            {Slots.Header && (
                <header>
                    <DataContext.Consumer>
                        {({ title }) => {
                          return <div className="title">{title}</div>
                        }}
                    </DataContext.Consumer>

                    <Slots.Header></Slots.Header>
                </header>
            )}
            <nav className="box-row box button-group">
                <SlotMap list={SlotList.Button}></SlotMap>
            </nav>
        </main>
  )
})
