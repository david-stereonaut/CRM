import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react'
import UpdateClientInput from './UpdateClientInput'
import UpdateForm from './UpdateForm';

const Update = observer(() => {


  return (
    <div id="update-container">
      <Typography variant="h6">Update</Typography>
      <UpdateClientInput />
      <UpdateForm />
    </div>
  )
})

export default Update