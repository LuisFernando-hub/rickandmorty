import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Characters } from "../types/characters";


interface Props {
    selectedCharacter: Characters | undefined;
}


export const TableComponent = ({ selectedCharacter }: Props) => {
    return (
        <TableContainer sx={{ borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#4C4C4C', border: 0 }}>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0, color: '#FFFFFF' } }}>
                        <TableCell>Status</TableCell>
                        <TableCell>Species</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Origin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: '#2E2E2E' }}>
                    <TableRow
                        key={selectedCharacter?.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0, color: '#FFFFFF' } }}
                    >
                        <TableCell component="th" scope="row">
                            {selectedCharacter?.status === 'unknown' ? '' : selectedCharacter?.status}
                        </TableCell>
                        <TableCell>{selectedCharacter?.species === 'unknown' ? '' : selectedCharacter?.species}</TableCell>
                        <TableCell>{selectedCharacter?.gender === 'unknown' ? '' : selectedCharacter?.gender}</TableCell>
                        <TableCell>{selectedCharacter?.origin?.name === 'unknown' ? '' : selectedCharacter?.origin?.name}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}