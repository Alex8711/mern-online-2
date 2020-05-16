import React, { useEffect, useState, useContext } from "react";
import { Card, Grid, GridList, Typography, Button } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

const ProductDetail = () => {
  //   const productId = props.match.params.productId;
  const auth = useContext(AuthContext);
  const productId = useParams().productId;
  const [product, setProduct] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/product/${productId}`
      );
      setProduct(response.data.product);
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/product/addToCart`,
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: { Authorization: "Bearer " + auth.token },
      }
    );
    console.log(response.data);

    alert(`You have added one product to your cart`);
  };

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      {product === undefined ? (
        <div>
          <h2>Loading</h2>
        </div>
      ) : (
        <GridList>
          <Card
            style={{
              width: "300px",
              height: "600px",
              marginRight: "10px",
              elevation: 0,
            }}
          >
            <img
              alt={product.title}
              src={`http://localhost:5000/${product.imagePath}`}
              style={{ width: "250px" }}
            />
          </Card>
          <Card style={{ width: "500px", height: "300px" }}>
            <Typography>{product.title}</Typography>
            <Typography>${product.price}</Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "10px" }}
              onClick={addToCartHandler}
            >
              Add To Cart
            </Button>
          </Card>
        </GridList>
      )}
    </Grid>
  );
};

export default ProductDetail;
