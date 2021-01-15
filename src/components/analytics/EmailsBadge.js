import { observer, inject } from 'mobx-react'
import EmailIcon from '@material-ui/icons/Email';
import { Paper, Typography } from '@material-ui/core';


const EmailsBadge = inject('ClientStore')(observer((props) => {

  let {ClientStore} = props



  let emails = ClientStore.clients.filter(c => c.type === '-').length

  return (
    <div className="badge">
      <Paper style={{ backgroundColor: '#32A287' }}>
        <EmailIcon style={{ fontSize: 50, color: '#DDE1E4' }}/>
      </Paper>
      <div className="badge-text">
        <Typography variant="h4">{emails}</Typography>
        <Typography>Emails Sent</Typography>
      </div>
    </div>
  )
}))

export default EmailsBadge