import {
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast()

  const getData = async () => {
    try {
      const res = await axios.get("https://notes-sblz.onrender.com/note/notes");
      setLoading(false);
      setData(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      let res = await axios.delete(
        `https://notes-sblz.onrender.com/note/notes/${id}`
      ); // Added '/' before id
      toast({
        title: 'Note delete succesfully.',
        status: 'success',
        position: 'top',
        duration: 9000,
        isClosable: true,
      })
      // console.log(res.data); // logging the response data
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };



  useEffect(() => {
    getData();
  }, [data]);

  return (
    <VStack minH="100vh" bg="yellowgreen" p={5}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
          {data?.map((ele) => (
            <VStack
              key={ele._id}
              alignItems="flex-start"
              border="1px solid black"
              borderBottom='10px solid #866804'
              rounded="xl"
              shadow="2xl"
              p={3}
              bg='yellow.500'
            >
              <Heading as="h2" color="red.700" fontSize="xl">
                {ele.title}
              </Heading>

              <Text>{ele.description}</Text>
              {/* Flex container */}
              <Flex
                w="full"
                alignItems="center"
                justifyContent="flex-end"
                gap={5}
                h="40px"
              >
                <EditIcon boxSize={6} cursor="pointer" />{" "}
                {/* Increase the size */}
                <DeleteIcon
                  onClick={() => handleDelete(ele._id)}
                  boxSize={6}
                  cursor="pointer"
                />
              </Flex>
            </VStack>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default Home;
