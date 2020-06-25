import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button } from "@material-ui/core";
import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const auth = useContext(AuthContext);

  // const userId = useParams().uid;
  // const userId = auth.userId
  console.log(auth.token);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let response;
    const fetchCart = async () => {
      try {
        const token = auth.token;
        const userId = auth.userId;
        response = await axios.get(
          `http://localhost:5000/api/auth/${userId}/cart`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        setCart(response.data.cart);
        console.log(cart);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [auth.token, cart.length, auth.userId]);

  const totalPrice = (cart) => {
    let total = 0;
    cart.map((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const decreaseOneProduct = (productAddId) => async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/product/addToCart`,
      {
        productAddId: productAddId,
        quantity: -1,
      },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );

    let item = cart.find((item) => item.product._id === productAddId);
    item.quantity = item.quantity - 1;
    setCart([...cart]);
  };

  const increaseOneProduct = (productAddId) => async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/product/addToCart`,
      {
        productAddId: productAddId,
        quantity: 1,
      },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );

    let item = cart.find((item) => item.product._id === productAddId);
    item.quantity = item.quantity + 1;
    setCart(
      [...cart]
      // [...cart].map((item) => {
      //   if (item.product._id === productAddId) {
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1,
      //     };
      //   } else return item;
      // })
    );
  };

  const removeFromCart = (productRemoveId) => async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/product/removeFromCart`,
      {
        productRemoveId: productRemoveId,
      },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );
    setCart([...cart].filter((item) => item.product._id !== productRemoveId));
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Title</TableCell>
            <TableCell>Product Image</TableCell>
            <TableCell>Product Quantity</TableCell>
            <TableCell>Product Price/unit</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.length > 0 &&
            cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.product.title}</TableCell>
                <TableCell>
                  <img
                    alt={item.product._id}
                    src={`http://localhost:5000/${item.product.imagePath}`}
                    style={{ height: "50px", width: "25px" }}
                  />
                </TableCell>
                <TableCell>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={
                      item.quantity === 1
                        ? removeFromCart(item.product._id)
                        : decreaseOneProduct(item.product._id)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={increaseOneProduct(item.product._id)}
                  >
                    +
                  </button>
                </TableCell>
                <TableCell>${item.product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={removeFromCart(item.product._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Typography
        variant="h5"
        color="error"
        style={{ marginLeft: "20px", marginTop: "10px" }}
        component="h3"
      >
        Total : $ {totalPrice(cart)}
      </Typography>
    </div>
  );
};

export default Cart;
