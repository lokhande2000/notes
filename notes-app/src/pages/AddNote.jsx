import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const AddNote = () => {
  const [note, setNote] = useState({ title: "", description: "" });
  const [error, setError] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const toastSuccess = useToast();
  const toastFailed = useToast();

  const { title, description } = note;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });

    // Clear error for the field being edited
    if (error[name]) {
      setError({ ...error, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    const newError = { title: "", description: "" };

    if (title.trim() === "") {
      newError.title = "Title is required";
      hasError = true;
    }

    if (description.trim() === "") {
      newError.description = "Description is required";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    setError({ title: "", description: "" });
    setLoading(true);

    try {
      const res = await axios.post(
        "https://notes-sblz.onrender.com/note/notes",
        note
      );
      // console.log(res);
      if (res.status === 201) {
        toastSuccess({
          title: "Note added successfully!",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        // Clear the form after submission
        setNote({ title: "", description: "" });
      }
    } catch (error) {
      toastFailed({
        title: "Failed to add note. Please try again !",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <VStack
        alignItems="center"
        justify="center"
        w="100%"
        h="100vh"
        bg="#017d07"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "flex-start",
            backgroundColor: "#373b53",
            padding: "80px",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <FormControl isInvalid={!!error.title}>
            <Input
              value={title}
              name="title"
              onChange={handleChange}
              placeholder="Enter Title"
              fontSize="xl"
              fontWeight={500}
              type="text"
              id="title"
            />
            <FormErrorMessage>{error.title}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!error.description}>
            <Textarea
              value={description}
              name="description"
              onChange={handleChange}
              placeholder="Write Description"
              fontSize="xl"
              fontWeight={500}
            />
            <FormErrorMessage>{error.description}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            w="full"
            isLoading={loading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </form>
      </VStack>
    </div>
  );
};

export default AddNote;
