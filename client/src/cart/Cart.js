import React, { useEffect, useState, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button } from "@material-ui/core";
import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";

const Cart = () => {
  const auth = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Title</TableCell>
            <TableCell>Product Image</TableCell>
            <TableCell>Product Quantity</TableCell>
            <TableCell>Product Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
      <Typography style={{ marginLeft: "20px" }} component="h3">
        Total : $
      </Typography>
    </div>
  );
};

export default Cart;
