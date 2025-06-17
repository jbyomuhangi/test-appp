import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import StandardCell from "./Cells/StandardCell";

const DataTable = ({ columns, data, tableRowDataKey = "id" }) => {
  const hasData = data.length > 0;

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#dfeafc" }}>
            <TableRow>
              {columns.map((column) => {
                const { HeaderRenderer = StandardCell } = column;

                return (
                  <TableCell key={column.id}>
                    <HeaderRenderer data={column.label} />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          {hasData && (
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow
                    key={item[tableRowDataKey]}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#f7f7f7",
                      },
                    }}
                  >
                    {columns.map((column) => {
                      const { CellRenderer } = column;

                      return (
                        <TableCell key={column.id}>
                          {CellRenderer && <CellRenderer item={item} />}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}

          {!hasData && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
