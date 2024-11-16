import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Paper, TextField, Button } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

interface Contact {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
    job_title: string;
}

const ContactsTable: React.FC = () => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Contact>('first_name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [contacts, setContacts] = useState([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingContact, setEditingContact] = useState<Partial<Contact>>({});

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const res = await fetch('http://localhost:3000/contacts');
        const data = await res.json();
        console.log(data)
        setContacts(data);
    }

    const handleRequestSort = (property: keyof Contact) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedContacts = [...contacts].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    async function deleteContact(id: number) {
        const res = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
        fetchContacts();
    }

    const handleEditClick = (contact: Contact) => {
        setEditingId(contact.id);
        setEditingContact(contact);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingContact({
            ...editingContact,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveClick = async () => {
        const res = await fetch(`http://localhost:3000/contacts/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingContact),
        });
        const data = await res.json();
        console.log(data);
        setEditingId(null);
        setEditingContact({});
        fetchContacts();
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditingContact({});
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['first_name', 'last_name', 'email', 'phone', 'company', 'job_title'].map((headCell) => (
                                <TableCell key={headCell}>
                                    <TableSortLabel
                                        active={orderBy === headCell}
                                        direction={orderBy === headCell ? order : 'asc'}
                                        onClick={() => handleRequestSort(headCell as keyof Contact)}
                                    >
                                        {headCell.charAt(0).toUpperCase() + headCell.slice(1).replace('_', ' ')}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact, index) => (
                            <TableRow key={index}>
                                {['first_name', 'last_name', 'email', 'phone', 'company', 'job_title'].map((field) => (
                                    <TableCell key={field}>
                                        <input
                                            name={field}
                                            value={editingId === contact.id ? editingContact[field] : contact[field]}
                                            onChange={handleEditChange}
                                            disabled={editingId !== contact.id}
                                            
                                            readOnly={editingId !== contact.id}
                                                
                                            className={`text-black disabled:text-black bg-transparent py-3 pl-2 pr-1 ${editingId === contact.id && "border-2 border-black"}`}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {editingId === contact.id ? (
                                        <>
                                            <IconButton onClick={handleSaveClick}><Save /></IconButton>
                                            <IconButton onClick={handleCancelClick}><Cancel /></IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleEditClick(contact)}><Edit /></IconButton>
                                            <IconButton onClick={() => deleteContact(contact.id)}> <Delete /></IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ContactsTable;