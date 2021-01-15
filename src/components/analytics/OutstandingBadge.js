import { observer, inject } from 'mobx-react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Paper, Typography } from '@material-ui/core';


const OutstandingBadge = inject('ClientStore')(observer((props) => {

  let {ClientStore} = props



  let outstanding = ClientStore.clients.filter(c => c.sold === 0).length

  return (
    <div className="badge">
      <Paper style={{ backgroundColor: '#FA8334' }}>
        <AccountCircleIcon style={{ fontSize: 50, color: '#DDE1E4' }}/>
      </Paper>
      <div className="badge-text">
        <Typography variant="h4">{outstanding}</Typography>
        <Typography>Outstanding Clients</Typography>
      </div>
    </div>
  )
}))

export default OutstandingBadge