import styled from 'styled-components';
import {
  Box,
  LinearProgress,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  IconButton,
  TableHead
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useState } from 'react';

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  return (
    <Box display="flex">
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}

const BankList = ({ selectedBanks, setSelectedBanks, bankList, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function createData(
    id,
    bank_name,
    city_name,
    state_name,
    district_name,
    branch_name,
    address,
    ifsc
  ) {
    return {
      id,
      bank_name,
      city_name,
      state_name,
      district_name,
      branch_name,
      address,
      ifsc
    };
  }

  const rows = bankList
    .map((bank) =>
      createData(
        bank.bank_id,
        bank.bank_name,
        bank.city,
        bank.state,
        bank.district,
        bank.branch,
        bank.address,
        bank.ifsc
      )
    )
    .sort((a, b) => (a.bank_name < b.bank_name ? -1 : 1));

  if (isLoading)
    return (
      <StyledLoadingContainer display="flex" my={8}>
        <StyledLinearProgress color="primary" />
      </StyledLoadingContainer>
    );

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <TableContainer>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Bank Name</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">District</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Branch</TableCell>
              <TableCell align="right">IFSC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => {
              const { ifsc } = row;
              const isSelected = selectedBanks.includes(ifsc);

              return (
                <StyledTableRow
                  key={ifsc}
                  onClick={() =>
                    setSelectedBanks((prev) =>
                      !!isSelected
                        ? prev.filter((p) => p !== ifsc)
                        : [...prev, ifsc]
                    )
                  }
                  selected={isSelected}
                >
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell scope="row">{row.bank_name}</TableCell>
                  <TableCell align="right">{row.city_name}</TableCell>
                  <TableCell align="right">{row.state_name}</TableCell>
                  <TableCell align="right">{row.district_name}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.branch_name}</TableCell>
                  <TableCell align="right">{row.ifsc}</TableCell>
                </StyledTableRow>
              );
            })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BankList;

const Container = styled.div`
  display: flex;
  margin: 2em auto 5em;
  width: 100%;
`;

const StyledLoadingContainer = styled(Box)`
  margin: 5em auto;
  width: 100%;
`;

const StyledLinearProgress = styled(LinearProgress)`
  max-width: 600px;
  width: 80%;
  margin: 0 auto;
`;

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`;
