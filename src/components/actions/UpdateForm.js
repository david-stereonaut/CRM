import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { observer, inject } from 'mobx-react'
import './UpdateForm.scss'

const UpdateForm = inject('ClientStore', 'ActionsGeneralStore', 'GeneralStore')(observer((props) => {

  let { ActionsGeneralStore, ClientStore, GeneralStore } = props

  const classes = GeneralStore.formStyles()

  return (
    <form className={classes.root}>
      <div className="innerForm">
      <Typography>Transfer Ownership to</Typography>
      <Autocomplete
        key={ClientStore.countForClientInput}
        onInputChange={(event, newValue) => ActionsGeneralStore.setInput('newOwnerInput', newValue)}
        options={ClientStore.owners}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
                                  label="Owner"
                                  size="small"/>}
      />
      <Button variant="contained" color="secondary" onClick={() => {
        if (!ClientStore.currentClient.first_name) {
          GeneralStore.openSnackbar('Please choose a client!', 'bad')
          return
        }
        if (ActionsGeneralStore.newOwnerInput === '') {
          GeneralStore.openSnackbar('Please choose a new owner!', 'bad')
          return
        }
        ClientStore.transferClient(ActionsGeneralStore.newOwnerInput)
        GeneralStore.openSnackbar('Client transfered!', 'good')
        ActionsGeneralStore.clearInputs()
        ClientStore.setCurrentClient({})
      }}>Transfer</Button>
      </div>
      <div className="innerForm">
      <Typography>Send email</Typography>
      <Autocomplete
        key={ClientStore.countForClientInput}
        onInputChange={(event, newValue) => ActionsGeneralStore.setInput('emailTypeInput', newValue)}
        options={['A', 'B', 'C', 'D']}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
                                  label="Email Type"
                                  size="small"/>}
      />
      <Button variant="contained" color="secondary" onClick={() => {
        if (!ClientStore.currentClient.first_name) {
          GeneralStore.openSnackbar('Please choose a client!', 'bad')
          return
        }
        if (ActionsGeneralStore.emailTypeInput === '') {
          GeneralStore.openSnackbar('Please choose an email type!', 'bad')
          return
        }
        ClientStore.sendEmail(ActionsGeneralStore.emailTypeInput)
        GeneralStore.openSnackbar('Email sent!', 'good')
        ActionsGeneralStore.clearInputs()
        ClientStore.setCurrentClient({})
      }}>Send</Button>
      </div>
      <div className="innerForm">
      <Typography>Declare sale!</Typography>
      <Button variant="contained" color="secondary" onClick={() => {
        if (!ClientStore.currentClient.first_name) {
          GeneralStore.openSnackbar('Please choose a client!', 'bad')
          return
        }
        if (ClientStore.currentClient.sold) {
          GeneralStore.openSnackbar('This client is already declared as sold!', 'bad')
          return
        }
        ClientStore.declareSale()
        GeneralStore.openSnackbar('Sold!', 'good')
        ActionsGeneralStore.clearInputs()
        ClientStore.setCurrentClient({})
      }}>Declare</Button>
      </div>

    </form>

  )
}))

export default UpdateForm