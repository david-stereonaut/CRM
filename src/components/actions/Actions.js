import { Divider } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';
import Update from './Update';
import Add from './Add';
import './Actions.scss'


const Actions = inject('ClientStore', 'ActionsGeneralStore', 'GeneralStore')(observer((props) => {

  let {ClientStore, ActionsGeneralStore, GeneralStore} = props

  useEffect(() => {
    ClientStore.fetchClients()
    ClientStore.setCurrentClient({})
    ActionsGeneralStore.clearInputs()
    GeneralStore.currentTab !== 1 && GeneralStore.setTab(1)
  }, [ActionsGeneralStore, ClientStore, GeneralStore])

  return (
    <div id="actions-container">
      <Update />
      <Divider />
      <Add />
    </div>
  )
}))

export default Actions