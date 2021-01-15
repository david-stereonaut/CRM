import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';
import Badges from './Badges';
import Charts from './Charts';


const Analytics = inject('ClientStore', 'GeneralStore')(observer((props) => {

  let {ClientStore, GeneralStore} = props

  useEffect(() => {
    ClientStore.fetchClients()
    ClientStore.setCurrentClient({})
    GeneralStore.currentTab !== 2 && GeneralStore.setTab(2)
  }, [ClientStore, GeneralStore])

  return (
    <div id="analytics-container">
      <Badges />
      <Charts />
    </div>
  )
}))

export default Analytics