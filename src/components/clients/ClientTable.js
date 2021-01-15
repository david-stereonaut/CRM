import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import { useState } from 'react';
import './ClientTable.scss'
import ClientTableHead from './ClientTableHead'
import ClientTableRow from './ClientTableRow'


const ClientTable = inject('ClientStore')(observer((props) => {

  let { clients } = props

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, clients.length - page * rowsPerPage);
  return (
    <div id="client-table-container">
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={clients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
      <TableContainer component={Paper}>
      <Table>
          <ClientTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={clients.length}
            />
          <TableBody>
            {stableSort(clients, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <ClientTableRow row={row} key={row.id}/>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height:  53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}))

export default ClientTable