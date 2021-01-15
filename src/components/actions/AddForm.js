import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { observer, inject } from 'mobx-react'
import './UpdateForm.scss'

const AddForm = inject('ClientStore', 'ActionsGeneralStore', 'GeneralStore')(observer((props) => {

  let { ActionsGeneralStore, ClientStore, GeneralStore } = props

  const classes = GeneralStore.formStyles()

  return (
    <form className={classes.root} autoComplete="off">
      
      <div className="innerForm">
        <Typography>First name:</Typography>
        <TextField size="small" onChange={ActionsGeneralStore.handleInput} name="addFirstNameInput" value={ActionsGeneralStore.addFirstNameInput}/>
      </div>
      <div className="innerForm">
        <Typography>Surname:</Typography>
        <TextField size="small" onChange={ActionsGeneralStore.handleInput} name="addLastNameInput" value={ActionsGeneralStore.addLastNameInput}/>
      </div>
      <div className="innerForm">
        <Typography>Email:</Typography>
        <TextField size="small" onChange={ActionsGeneralStore.handleInput} name="addEmailInput" value={ActionsGeneralStore.addEmailInput}/>
      </div>
      <div className="innerForm">
        <Typography>Country:</Typography>
        <Autocomplete
        key={ClientStore.countForClientInput}
        freeSolo
        onInputChange={(event, newValue) => ActionsGeneralStore.setInput('addCountryInput', newValue)}
        options={ClientStore.countries}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}
                                  size="small"/>}
        />
      </div>
      <div className="innerForm">
        <Typography>Owner:</Typography>
        <Autocomplete
        key={ClientStore.countForClientInput}
        onInputChange={(event, newValue) => ActionsGeneralStore.setInput('addOwnerInput', newValue)}
        options={ClientStore.owners}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}

                                  size="small"/>}
        />
      </div>
      <div className="innerForm">
        <Button variant="contained" color="secondary" onClick={() => {
          if(ActionsGeneralStore.addFirstNameInput === '' ||
          ActionsGeneralStore.addLastNameInput === '' ||
          ActionsGeneralStore.addEmailInput === '' ||
          ActionsGeneralStore.addCountryInput === '' ||
          ActionsGeneralStore.addOwnerInput === '') {
            GeneralStore.openSnackbar('Please fill in all inputs', 'bad')
            return
          }
          ClientStore.addClient(ActionsGeneralStore.addFirstNameInput, ActionsGeneralStore.addLastNameInput, ActionsGeneralStore.addEmailInput, ActionsGeneralStore.addCountryInput, ActionsGeneralStore.addOwnerInput)
          GeneralStore.openSnackbar('Client added!', 'good')
          ActionsGeneralStore.clearInputs()
          ClientStore.setCurrentClient({})
        }}>Add New Client</Button>
      </div>
    </form>

  )
}))

export default AddForm