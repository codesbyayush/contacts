import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const Form: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const disabled = !firstName || !lastName || !email || !phoneNumber || !company || !jobTitle;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        const contact = { first_name: firstName, last_name: lastName, email, phone: phoneNumber, company, job_title: jobTitle };
        const res = await saveContact(contact);

        if (res.error) {
            setErrors(res.error);
            console.log(res.error);
        }
    };

    async function saveContact(contact: any) {
        setLoading(true);
        const res = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        console.log(res)
        const data = await res.json();
        setLoading(false);
        return { error: data.errors, status: res.status };
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Contact Form
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2} >
                    <Box display="flex" gap={2}>
                        <TextField
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            error={!!errors.first_name}
                            helperText={errors.first_name}
                        />
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            error={!!errors.last_name}
                            helperText={errors.last_name}
                        />
                    </Box>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        inputMode='numeric'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        required
                        fullWidth
                        id="company"
                        label="Company"
                        variant="outlined"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        error={!!errors.company}
                        helperText={errors.company}
                    />
                    <TextField
                        required
                        fullWidth
                        id="jobTitle"
                        label="Job Title"
                        variant="outlined"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        error={!!errors.job_title}
                        helperText={errors.job_title}
                    />
                    <Button variant="contained" color="primary" type="submit" disabled={disabled || loading}>
                        Submit
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default Form;