import React, { useState } from 'react';
import Form from './components/Form';
import ContactsTable from './components/ContactsTable';
import { Button } from '@mui/material';

function App() {

  const [currPage, setCurrPage] = useState(false);
  
  
  return (
    <>
      <div className='ml-auto bg-gray-100 py-3 flex items-center justify-center w-full'>
      <Button onClick={() => setCurrPage(prev => !prev)} variant='outlined'>
        Change Page
        </Button>
        </div>
      {currPage ? <div className='w-1/2 mx-auto pt-12'>
      <Form />
      </div> :
        <div className='max-w-screen-2xl w-11/12 mx-auto py-12'>
      <ContactsTable/></div>}
      </>
    
  );
}

export default App;
