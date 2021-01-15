import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';

const ClientDialog = inject('ClientStore', 'ClientGeneralStore', 'GeneralStore')(observer((props) => {

  let { ClientStore, ClientGeneralStore, GeneralStore } = props

  useEffect(() => {
    ClientGeneralStore.setClientInput('firstNameInput', ClientStore.currentClient.first_name)
    ClientGeneralStore.setClientInput('lastNameInput', ClientStore.currentClient.last_name)
    ClientGeneralStore.setClientInput('countryInput', ClientStore.currentClient.country)
    ClientGeneralStore.setClientInput('emailInput', ClientStore.currentClient.email)
  }, [ClientGeneralStore,
      ClientStore.currentClient.country,
      ClientStore.currentClient.email,
      ClientStore.currentClient.first_name,
      ClientStore.currentClient.last_name
  ])


  
  const classes = GeneralStore.formStyles();

  return (    
    <Dialog open={ClientGeneralStore.clientDialog} onClose={ClientGeneralStore.closeClientDialog} aria-labelledby="form-dialog-title">
    <DialogTitle>Change Client Details</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter new details for the client:
      </DialogContentText>
      <form className={classes.root} >
        <TextField
          name="firstNameInput"
          value={ClientGeneralStore.firstNameInput}
          onChange={ClientGeneralStore.handleClientInput}
          label="First Name"
        />
        <TextField
          name="lastNameInput"
          value={ClientGeneralStore.lastNameInput}
          onChange={ClientGeneralStore.handleClientInput}
          label="Last Name"
        />
        <TextField
          name="emailInput"
          value={ClientGeneralStore.emailInput}
          onChange={ClientGeneralStore.handleClientInput}
          label="Email"
        />
        <Autocomplete
        defaultValue={ClientStore.currentClient.country}
        freeSolo
        inputValue={ClientGeneralStore.countryInput}
        onInputChange={(_, newVal) => {
          ClientGeneralStore.setClientInput('countryInput', newVal)
        console.log(ClientGeneralStore.countryInput)}}
        options={ClientStore.countries}
        getOptionLabel={(option) => option.name ? option.name : option}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
                                  name="countryInput"
                                  label="Country"/>}
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={ClientGeneralStore.closeClientDialog} color="primary">
        Cancel
      </Button>
      <Button onClick={() => {
                        ClientStore.updateClientDetails(ClientGeneralStore.firstNameInput, ClientGeneralStore.lastNameInput, ClientGeneralStore.emailInput, ClientGeneralStore.countryInput)
                        ClientGeneralStore.closeClientDialog()}} color="primary">
        Change
      </Button>
    </DialogActions>
  </Dialog>
  )
}))

export default ClientDialog