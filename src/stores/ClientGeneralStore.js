import { observable, action, makeObservable } from  'mobx'

export class ClientGeneralStore {
  constructor() {
      this.clientDialog = false
      this.firstNameInput = ''
      this.lastNameInput = ''
      this.emailInput = ''
      this.countryInput = ''

      makeObservable(this, {
          clientDialog: observable,
          firstNameInput: observable,
          lastNameInput: observable,
          emailInput: observable,
          countryInput: observable,
          openClientDialog: action,
          closeClientDialog: action,
          setClientInput: action,
          handleClientInput: action
      })
  }

  handleClientInput = (event) => {
    console.log(event)
    const target = event.target
    this[target.name] = target.value
  }

  setClientInput = (name, value) => {
    this[name] = value
  }

  openClientDialog = () => {
    this.clientDialog = true
  }

  closeClientDialog = () => {
    this.clientDialog = false
  }
}
