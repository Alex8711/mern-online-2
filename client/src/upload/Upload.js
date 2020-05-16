import React, { useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import { VALIDATOR_MINLENGTH } from "../shared/util/validators";
import Input from "../shared/components/Input";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from "../shared/context/auth-context";
import ImageUpload from "../shared/components/ImageUpload";
import axios from "axios";

const Upload = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("image", formState.inputs.image.value);

      const response = await axios.post(
        "http://localhost:5000/api/product/upload",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
    console.log(formState.inputs);
    auth.login();
  };
  return (
    <Grid container spacing={0} justify="center">
      <form onSubmit={handleSubmitForm}>
        <ImageUpload center id="image" onInput={inputHandler} />
        <Input
          element="input"
          id="title"
          type="title"
          label="Title"
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="description"
          type="description"
          label="description"
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText="Please enter description."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="price"
          type="price"
          label="price"
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText="Please enter price."
          onInput={inputHandler}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formState.isValid}
        >
          Upload
        </Button>
      </form>
    </Grid>
  );
};

export default Upload;
