import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';
import ClientDialog from './ClientsDialog';
import ClientTable from './ClientTable'


const Clients = inject('ClientStore', 'GeneralStore')(observer((props) => {

  let {ClientStore, GeneralStore} = props

  useEffect(() => {
    ClientStore.fetchClients()
    ClientStore.setCurrentClient({})
    GeneralStore.currentTab !== 0 && GeneralStore.setTab(0)
  }, [ClientStore, GeneralStore])

  let clients = ClientStore.clients


  return (
    <div id="clients-container">
      <ClientTable clients={clients} />
      <ClientDialog />
    </div>
  )
}))

export default Clients