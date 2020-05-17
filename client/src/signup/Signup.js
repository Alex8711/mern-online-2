import React, { useContext } from "react";
import { Button, Grid, Card } from "@material-ui/core";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import Input from "../shared/components/Input";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    let response;
    try {
      response = await axios.post("http://localhost:5000/api/auth/register", {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
      console.log(response.data);
      props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }

    auth.login(response.data.user._id, response.data.token);
  };
  return (
    <Grid container spacing={0} justify="center" className={styles.container}>
      <Card className={styles.card}>
        <form onSubmit={handleSubmitForm}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formState.isValid}
          >
            SIGNUP
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default withRouter(Signup);
