import { observer, inject } from 'mobx-react'
import moment from 'moment'
import TimelineIcon from '@material-ui/icons/Timeline';
import { Paper, Typography } from '@material-ui/core';


const NewClientsBadge = inject('ClientStore')(observer((props) => {

  let {ClientStore} = props



  let newClients = ClientStore.clients.filter(c => moment(c.first_contact).format('MM/YYYY') === moment().format('MM/YYYY')).length

  return (
    <div className="badge">
      <Paper style={{ backgroundColor: '#44CF6C' }}>
        <TimelineIcon style={{ fontSize: 50, color: '#DDE1E4' }}/>
      </Paper>
      <div className="badge-text">
        <Typography variant="h4">{newClients}</Typography>
        <Typography>New {moment().format('MMMM')} Clients</Typography>
      </div>
    </div>
  )
}))

export default NewClientsBadge