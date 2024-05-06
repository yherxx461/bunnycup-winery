import React, {useEffect} from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import bunnycup from "../../../public/images/bunnycup.png";

// MUI imports
// import * as React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { primaryTheme } from "../App/App";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "black" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.main,
  fontSize: 15,
}));

// export default function AccordionUsage() {
//   return (

function AdminUserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const clients = useSelector((store) => store.clients);
  // const orders = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("CLIENTS", clients);

  // onload makes GET call to fetch all boarding data.
  useEffect(() => {
    dispatch({ type: "FETCH_CLIENTS" });
    // dispatch({ type: 'FETCH_ALL_ORDERS' });
  }, []);

  const handleClickOpenClient = (id) => {
    history.push(`/retailer-info/${id}`);
  };

  return (
    <Container maxWidth>
      <ThemeProvider theme={primaryTheme}>
        <center>
          <h2>Welcome ADMIN!</h2>
          <img src={bunnycup} width="100" height="100" />
        </center>
        <div className="container">
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
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "#F9F7F4",
                  display: "flex",
                  justifyContent: "space-between",
                  m: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 800,
                  }}
                >
                  <Stack
                    spacing={3}
                    margin={1}
                    sx={{
                      direction: "row",
                      justifyContent: "end",
                      fontSize: "22px",
                    }}
                  >
                    <p>
                      RETAILERS
                      <Button
                        variant="text"
                        size="large"
                        color="pinot"
                        onClick={() => {
                          history.push("/register-new");
                        }}
                      >
                        <Box
                          marginInlineStart={20}
                          marginInlineEnd={15}
                          fontSize={22}
                        >
                          ADD NEW
                        </Box>
                      </Button>
                      <TextField
                        size="medium"
                        id="outlined-basic"
                        label="SEARCH"
                        variant="outlined"
                      />
                    </p>
                  </Stack>
                </Box>
              </AccordionSummary>

              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Item>Name</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>Email</Item>
                  </Grid>
                </Grid>
              </Box>
              <AccordionDetails
                sx={{
                  minHeight: 400,
                  maxHeight: 400,
                }}
              >
                {clients.map((client) => {
                  return (
                    <>
                      <div className="clientItem" key={client.id}></div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 0,
                          m: 1,
                          bgcolor: "background.paper",
                          borderRadius: 1,
                        }}
                      >
                        <p>{client.name}</p>
                        <a href={`mailto:${client.email}`}>{client.email}</a>
                        <Button
                          variant="text"
                          sx={{
                            color: "#861F41",
                          }}
                          onClick={() => handleClickOpenClient(client.id)}
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
                  bgcolor: "#F9F7F4",
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
                  bgcolor: "#F9F7F4",
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
                FUNCTION completedOrders() to .map and filter for completed
                orders.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  bgcolor: "#F9F7F4",
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
                FUNCTION canceledOrders() to .map and filter for cancelled
                orders.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default AdminUserPage;
