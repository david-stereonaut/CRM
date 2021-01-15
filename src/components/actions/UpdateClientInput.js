import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { observer, inject } from 'mobx-react'

const UpdateClientInput = inject('ClientStore', 'ActionsGeneralStore')(observer((props) => {

  let {ClientStore, ActionsGeneralStore} = props

  return (
    <Autocomplete
        key={ClientStore.countForClientInput}
        onInputChange={(event, newValue) => {
                                            ActionsGeneralStore.clearInputs()
                                            ActionsGeneralStore.setInput('clientInput', newValue)
                                            ClientStore.setCurrentClientByName(newValue)}}
        options={ClientStore.clients.map(c => (`${c.first_name} ${c.last_name}`))}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
                                  label="Client"/>}
        />
  )
}))

export default UpdateClientInput