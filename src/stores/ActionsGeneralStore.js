import { observable, action, makeObservable } from  'mobx'

export class ActionsGeneralStore {
  constructor() {
      this.clientInput = ''
      this.newOwnerInput = ''
      this.emailTypeInput = ''
      this.addFirstNameInput = ''
      this.addLastNameInput = ''
      this.addEmailInput = ''
      this.addCountryInput = ''
      this.addOwnerInput = ''

      makeObservable(this, {
          clientInput: observable,
          newOwnerInput: observable,
          emailTypeInput: observable,
          addFirstNameInput: observable,
          addLastNameInput: observable,
          addEmailInput: observable,
          addCountryInput: observable,
          addOwnerInput: observable,
          handleInput: action,
          setInput: action,
          clearInputs: action

      })
  }

  handleInput = (event) => {
    const target = event.target
    this[target.name] = target.value
  }

  setInput = (name, value) => {
    this[name] = value
  }

  clearInputs = () => {
    this.clientInput = ''
    this.newOwnerInput = ''
    this.emailTypeInput = ''
    this.addFirstNameInput = ''
    this.addLastNameInput = ''
    this.addEmailInput = ''
    this.addCountryInput = ''
    this.addOwnerInput = ''
  }
}
