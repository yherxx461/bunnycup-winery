import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// MUI imports
// import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Stack from '@mui/material/Stack';

// export default function AccordionUsage() {
//   return (

function AdminUserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const clients = useSelector((store) => store.clients);
  // const orders = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('CLIENTS', clients);

  // onload makes GET call to fetch all boarding data.
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
    // dispatch({ type: 'FETCH_ALL_ORDERS' });
  }, []);

  const handleClickOpenClient = (client) => {
    alert(`displaying info for ${client.name}`);
    console.log(client);
    // Direct to new page to display selected client details
    // history.push('/______')
  };

  return (
    <div className="container">
      <h2>Welcome ADMIN!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <h2>RETAILERS</h2>
      {/* {clients.map((client) => {
                return (
                  <p>{client.name}</p>
                )})} */}
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              bgcolor: '#F9F7F4',
              // display: 'flex',
              // justifyContent: 'space-between',
              m: 0,
            }}
          >
            <Stack
              sx={{
                direction: 'row',
                justifyContent: 'end',
              }}
            >
              <p>RETAILERS</p>
              <TextField
                id="outlined-basic"
                label="SEARCH"
                variant="outlined"
              />
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              minHeight: 400,
              maxHeight: 400,
            }}
          >
            {clients.map((client) => {
              return (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      p: 0,
                      m: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <p>{client.name}</p>
                    {/* <p>{client.email}</p> */}
                    <a href={`mailto:${client.email}`}>{client.email}</a>
                    {/* <PhoneIcon/> <a href={`tel:${selectedMeetReq.phone}`}> {selectedMeetReq.phone}</a><br/><br/> */}
                    <Button
                      variant="text"
                      sx={{
                        color: '#861F41',
                      }}
                      onClick={() => handleClickOpenClient(client)}
                    >
                      VIEW
                    </Button>
                  </Box>
                </>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <h2>ORDERS</h2>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              bgcolor: '#F9F7F4',
            }}
          >
            NEW
            <div>
              {/* {orders.length} */}
              (orders.length) NEW ORDERS
            </div>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              minHeight: 400,
              maxHeight: 400,
            }}
          >
            DISPLAY NEW ORDERS HERE
            {/* {orders.map((order) => {
              return (
                <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 0,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}
                >
                  <p>{order.date}</p>
                  <p>{order.client_id}</p>
                  <p>{order.total_cost}</p>
                  <p type="button" onClick={() => handleClickOpenClient(client)}>VIEW</p>
                </Box>
                </>
            )})} */}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            sx={{
              bgcolor: '#F9F7F4',
            }}
          >
            COMPLETED
          </AccordionSummary>
          <AccordionDetails
            sx={{
              minHeight: 400,
              maxHeight: 400,
            }}
          >
            FUNCTION completedOrders() to .map and filter for completed orders.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              bgcolor: '#F9F7F4',
            }}
          >
            CANCELED
          </AccordionSummary>
          <AccordionDetails
            sx={{
              minHeight: 400,
              maxHeight: 400,
            }}
          >
            FUNCTION canceledOrders() to .map and filter for cancelled orders.
          </AccordionDetails>
        </Accordion>
      </div>
      {/* <br/>
    <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default AdminUserPage;
