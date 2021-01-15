import { TableCell, TableRow } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import moment from 'moment';
import CheckIcon from '@material-ui/icons/Check'

const ClientTableRow = inject('ClientStore', 'ClientGeneralStore')(observer((props) => {

  let { row, ClientStore, ClientGeneralStore } = props

  const handleClick = () => {
    ClientStore.setCurrentClient(row)
    ClientGeneralStore.openClientDialog()
  }

  return (    
    <TableRow hover onClick={handleClick}>
      <TableCell align="center">{row.first_name}</TableCell>
      <TableCell align="center">{row.last_name}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.country}</TableCell>
      <TableCell align="center">{moment(row.first_contact).format('DD/MM/YYYY')}</TableCell>
      <TableCell align="center">{row.sold ? <CheckIcon fontSize='inherit' /> : '-'}</TableCell>
      <TableCell align="center">{row.type}</TableCell>
      <TableCell align="center">{row.owner}</TableCell>
    </TableRow>
  )
}))

export default ClientTableRow