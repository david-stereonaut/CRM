import { observer, inject } from 'mobx-react'
import LanguageIcon from '@material-ui/icons/Language';
import { Paper, Typography } from '@material-ui/core';


const CountryBadge = inject('ClientStore')(observer((props) => {

  let {ClientStore} = props


  let countries = {}
  ClientStore.clients.forEach(c => {
    if(countries[c.country]) {
      countries[c.country]++
    } else {
      countries[c.country] = 1
    }
  })

  let countryCount = 0
  let country = ''
  Object.keys(countries).forEach(key => {
    if (countries[key] > countryCount) {
      countryCount = countries[key]
      country = key
    }
  })

  return (
    <div className="badge">
      <Paper style={{ backgroundColor: '#F3B61F' }}>
        <LanguageIcon style={{ fontSize: 50, color: '#DDE1E4' }}/>
      </Paper>
      <div className="badge-text">
        <Typography variant="h4">{country}</Typography>
        <Typography>Hottest Country</Typography>
      </div>
    </div>
  )
}))

export default CountryBadge