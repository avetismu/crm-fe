import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { contactsSelector, fetchContacts } from "../store/contactsSlice";
import React, { useEffect } from "react"; // Import the useEffect hook
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface ContactsProps {
        
}

interface Column {
        id: 'name' | 'email' | 'phone' | 'location' | 'type' | 'contact_method' | 'last_contacted';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
}

const columns: readonly Column[] = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 170 },
        { id: 'location', label: 'Location', minWidth: 170 },
        { id: 'type', label: 'Type', minWidth: 170 },
        { id: 'contact_method', label: 'Primary Contact Method', minWidth: 170 },
        { id: 'last_contacted', label: 'Last Contacted', minWidth: 170 },
]

const ContactsPage: React.FC<ContactsProps> = () => {

        const dispatch = useDispatch();
        const appDispatch = useDispatch<AppDispatch>()
        const selector = useSelector(contactsSelector)

        useEffect(() => { 
                appDispatch(fetchContacts(1))
        }, []) 

        return (
                <div>
                        <h1>Contacts</h1>
                        <TableContainer sx={{maxHeight: 600}}>
                                <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                                <TableRow>
                                                {columns.map((column) => (
                                                        <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                        >
                                                        {column.label}
                                                        </TableCell>
                                                ))}
                                                </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                {selector.contacts
                                                .map((row) => {
                                                        return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}>
                                                                <TableCell>
                                                                        {row.firstName} {row.lastName}
                                                                </TableCell>
                                                                <TableCell>
                                                                        {row.email}
                                                                </TableCell>
                                                                <TableCell>
                                                                        {row.countryPhoneAreaCode}
                                                                        {row.phone}
                                                                </TableCell>
                                                                <TableCell>
                                                                        {row.streetAddress}, {row.city}, {row.province}, {row.country}
                                                                </TableCell>
                                                                <TableCell>
                                                                        {row.contact_type}
                                                                </TableCell>
                                                                <TableCell>
                                                                        {row.contactMethod}
                                                                </TableCell>
                                                                <TableCell>
                                                                        {row.lastContacted}
                                                                </TableCell>   
                                                        </TableRow>
                                                        );
                                                })}
                                        </TableBody>
                                </Table>

                        </TableContainer>
                        {/* <ul>
                                {selector.contacts.contacts.map((contact, index) => {
                                        return <li key={index}>{contact.firstName}</li>
                                })}
                        </ul> */}
                </div>
                
        )
}

export default ContactsPage