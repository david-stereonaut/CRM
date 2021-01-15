import axios from 'axios'
import moment from 'moment'
import { observable, computed, action, makeObservable } from  'mobx'

export class ClientStore {
  constructor() {
    this.clients = []
    this.owners = []
    this.countries = []
    this.currentClient = {}
    this.countForClientInput = 0
    this.topEmployees = []
    this.salesByCountry = []

    makeObservable(this, {
      clients: observable,
      owners: observable,
      countries: observable,
      currentClient: observable,
      fetchClients: action,
      setCurrentClient: action,
      getClients: computed,
      setCurrentClientByName: action,
      updateClientDetails: action,
      transferClient: action,
      sendEmail: action,
      declareSale: action,
      updateClient: action,
      addClient: action,
      countForClientInput: observable,
      topEmployees: observable,
      salesByCountry: observable,
      fetchTopEmployees: action,
      fetchSalesByCountry: action
    })
  }

  fetchClients = async () => {
    let { data } = await axios.get('http://localhost:3001/clients')
    this.clients = data.clientData
    this.owners = data.ownerData
    this.countries = data.countryData
    this.currentClient = {}
    this.countForClientInput++
  }

  fetchTopEmployees = async () => {
    let { data } = await axios.get('http://localhost:3001/topEmployees')
    this.topEmployees = data
  }

  fetchSalesByCountry = async () => {
    let { data } = await axios.get('http://localhost:3001/salesByCountry')
    this.salesByCountry = data
  }

  setCurrentClientByName = (name) => {
    if (name === '') {
      this.currentClient = {}
      return
    }
    const clientName = name.split(' ')
    const capitalizedName = []
    clientName.forEach(n => capitalizedName.push(n.charAt(0).toUpperCase() + n.slice(1)))
    this.clients.forEach(c => {
      if (c.first_name === capitalizedName[0] && c.last_name === capitalizedName[1]){
        this.currentClient = c
      }
    })
  }

  setCurrentClient = (client) => {
    this.currentClient = client
  }

  transferClient = (newOwner) => {
    const client = {...this.currentClient, owner: newOwner}
    this.updateClient(client)
  }

  sendEmail = (emailType) => {
    let type = emailType ==='A' ? 1 : emailType === 'B' ?  2 : emailType === 'C' ? 3 : 4
    const client = {...this.currentClient, emailType: type }
    this.updateClient(client)
  }

  declareSale = () => {
    const client = {...this.currentClient, sold: 1 }
    this.updateClient(client)
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  updateClientDetails = (firstName, lastName, email, country) => {
    const client = {...this.currentClient,
                    first_name: this.capitalize(firstName),
                    last_name: this.capitalize(lastName),
                    email,
                    country: this.capitalize(country)}
    this.updateClient(client)
  }

  updateClient = async (client) => {
    let type = client.type === 'A' ? 1 : client.type === 'B' ?  2 : client.type === 'C' ? 3 : client.type === 'D' ? 4 : 0
    let newCountry = this.countries.some(c => c.name === client.country) ? false : client.country
    const newClient = {
      ...client,
      newCountry,
      country_id: !newCountry ? this.countries.find(c => c.name === client.country).id : null,
      owner_id: this.owners.find(c => c.name === client.owner).id,
      email_type_id: client.emailType ? client.emailType : type
    }
    await axios.put('http://localhost:3001/client', newClient)
    this.fetchClients()
  }

  addClient = async (firstName, lastName, email, country, owner) => {
    let newCountry = this.countries.some(c => c.name === this.capitalize(country)) ? false : this.capitalize(country)
    let client = {
      first_name: firstName,
      last_name: lastName,
      email,
      first_contact: moment().toISOString(),
      owner_id: this.owners.find(c => c.name === owner).id,
      country_id: !newCountry ? this.countries.find(c => c.name === this.capitalize(country)).id : null,
      newCountry
    }
    await axios.post('http://localhost:3001/client', client)
    this.fetchClients()
  }

  get getClients() {
    return this.clients
  }
}