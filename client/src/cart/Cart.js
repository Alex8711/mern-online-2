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
  const userId = auth.userId;
  console.log(auth.userId);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // let response;
    const fetchCart = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/auth/${userId}/cart`,
        {
          headers: { Authorization: "Bearer " + auth.token },
        }
      );
      console.log(response.data);
      setCart(response.data.cart);
    };
    fetchCart();
  }, []);
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Title</TableCell>
            <TableCell>Product Image</TableCell>
            <TableCell>Product Quantity</TableCell>
            <TableCell>Product Price</TableCell>
            <TableCell>{userId}</TableCell>
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
