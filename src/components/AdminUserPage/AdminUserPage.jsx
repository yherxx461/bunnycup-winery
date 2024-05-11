import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import bunnycup from "/images/bunnycup.png";

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
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "black" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.main,
  fontSize: 15,
}));

// return the CURRENT YEAR
const currentYear = new Date().getFullYear();
console.log("YEAR is:", currentYear);

function AdminUserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const clients = useSelector((store) => store.clients);
  const orders = useSelector((store) => store.orders.orders);
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  // onload makes GET call to fetch all boarding data.
  useEffect(() => {
    dispatch({ type: "FETCH_CLIENTS" });
    dispatch({ type: "GET_ADMIN_ORDERS" });
  }, []);

  const handleClickOpenClient = (id) => {
    history.push(`/retailer-info/${id}`);
  };

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5173/api/search/?name=${name}`
      );

      const parseResponse = await response.json();

      setUsers(parseResponse);
    } catch (err) {
      console.log("ERROR: Search error", err);
    }
  };

  // tracking counts for NEW ORDERS
  let newOrders = [];
  function checkNewOrders() {
    for (let order of orders)
      if (order.status === "Pending") {
        newOrders.push(order);
      }
    return newOrders.length;
  }

  return (
    <Container>
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
            <Accordion defaultExpanded expanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
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
                  <Typography
                    fontSize={25}
                    sx={{
                      marginTop: 2,
                      marginLeft: 1,
                      width: "20%",
                    }}
                  >
                    RETAILERS
                  </Typography>
                  <Button
                    sx={{ alignItems: "flex-end", marginTop: 1 }}
                    variant="contained"
                    size="large"
                    color="pinot"
                    onClick={() => {
                      history.push("/register-new");
                    }}
                  >
                    <Box
                      // marginInlineStart={15}
                      // marginInlineEnd={15}
                      sx={{ width: "%" }}
                      marginInlineStart={10}
                      marginInlineEnd={10}
                      fontSize={18}
                    >
                      ADD NEW
                    </Box>
                  </Button>
                  <Stack>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": {
                          m: 1,
                          width: "25ch",
                          height: "1px",
                        },
                      }}
                      autoComplete="off"
                      onSubmit={onSubmitSearch}
                    >
                      <TextField
                        type="text"
                        name="name"
                        placeholder="Search Retailers"
                        size="medium"
                        id="outlined-basic"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="formControl"
                      />
                      <Button
                        type="submit"
                        className="btn btn-search"
                        color="pinot"
                        variant="contained"
                        size="large"
                        onSubmit={onSubmitSearch}
                        sx={{
                          width: "8ch",
                          marginTop: 2.5,
                        }}
                      >
                        Search
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </AccordionSummary>

              {name !== "" && (
                <AccordionDetails
                  sx={{
                    minHeight: 400,
                    maxHeight: 400,
                    overflowY: "scroll",
                  }}
                >
                  {users.map((client) => {
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
                          <Typography sx={{ width: "35%" }}>
                            {client.name}
                          </Typography>
                          <Link
                            sx={{ width: "35%" }}
                            href={`mailto:${client.email}`}
                          >
                            {client.email}
                          </Link>
                          {/* <p>{client.name}</p>
                        <a href={`mailto:${client.email}`}>{client.email}</a> */}
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
              )}

              {!name && (
                <AccordionDetails
                  sx={{
                    minHeight: 400,
                    maxHeight: 400,
                    overflowY: "scroll",
                  }}
                >
                  {clients.map((client) => {
                    return (
                      <>
                        <div className="clientItem" key={client.id}>
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
                            <Typography sx={{ width: "35%" }}>
                              {client.name}
                            </Typography>
                            <Link
                              sx={{ width: "35%" }}
                              href={`mailto:${client.email}`}
                            >
                              {client.email}
                            </Link>
                            {/* <p>{client.name}</p>
                        <a href={`mailto:${client.email}`}>{client.email}</a> */}
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
                        </div>
                      </>
                    );
                  })}
                </AccordionDetails>
              )}
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
                <Typography sx={{ width: "40%", flexShrink: 0 }}>
                  NEW
                </Typography>
                <Typography
                  color="pinot"
                  sx={{ fontWeight: "bold", width: "35%" }}
                >
                  {checkNewOrders()} NEW ORDERS
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              >
                {orders.map((order) => {
                  if (order.status === "Pending") {
                    return (
                      <>
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
                          <Typography sx={{ width: "40%" }}>
                            {order.date}
                          </Typography>
                          <Typography sx={{ width: "35%" }}>
                            {order.name}
                          </Typography>
                          <Typography sx={{ width: "25%" }}>
                            $ {order.total_cost}
                          </Typography>
                          <Button
                            variant="text"
                            sx={{
                              color: "#861F41",
                            }}
                            // onClick={() => handleClickOpenClient(client.id)}
                          >
                            VIEW
                          </Button>
                        </Box>
                      </>
                    );
                  }
                })}
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
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              >
                {orders.map((order) => {
                  if (order.status === "Complete") {
                    return (
                      <>
                        <div key={order.id}>
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
                            <Typography sx={{ width: "40%" }}>
                              {order.date}
                            </Typography>
                            <Typography sx={{ width: "35%" }}>
                              {order.name}
                            </Typography>
                            <Typography sx={{ width: "25%" }}>
                              $ {order.total_cost}
                            </Typography>
                            <Button
                              variant="text"
                              sx={{
                                color: "#861F41",
                              }}
                              // onClick={() => handleClickOpenClient(client.id)}
                            >
                              VIEW
                            </Button>
                          </Box>
                        </div>
                      </>
                    );
                  }
                })}
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
                  minHeight: 300,
                  maxHeight: 300,
                  overflowY: "scroll",
                }}
              >
                {orders.map((order) => {
                  if (order.status === "Cancelled") {
                    return (
                      <>
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
                          <Typography sx={{ width: "40%" }}>
                            {order.date}
                          </Typography>
                          <Typography sx={{ width: "35%" }}>
                            {order.name}
                          </Typography>
                          <Typography sx={{ width: "25%" }}>
                            $ {order.total_cost}
                          </Typography>
                          <Button
                            variant="text"
                            sx={{
                              color: "#861F41",
                            }}
                            // onClick={() => handleClickOpenClient(client.id)}
                          >
                            VIEW
                          </Button>
                        </Box>
                      </>
                    );
                  }
                })}
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
