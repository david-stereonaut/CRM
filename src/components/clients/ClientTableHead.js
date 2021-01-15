import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import { observer, inject } from 'mobx-react'


const ClientTableHead = inject('ClientStore')(observer((props) => {

  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const visuallyHidden = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }

  const headCells = [
    { id: 'first_name', label: 'Name' },
    { id: 'last_name', label: 'Surame' },
    { id: 'email', label: 'Email' },
    { id: 'country', label: 'Country' },
    { id: 'first_contact', label: 'First Contact' },
    { id: 'sold', label: 'Sold' },
    { id: 'type', label: 'Type' },
    { id: 'owner', label: 'Owner' },
  ];

  return (    
    <TableHead>
      <TableRow>
      {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{headCell.label}
              {orderBy === headCell.id ? (
                <span style={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}))

export default ClientTableHead