import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  GridItem,
  Text,
  Input,
} from "@chakra-ui/react";

export function CategoryCard({
  title,
  categoryID,
  index,
  isEditMode,
}: {
  title: string;
  categoryID: number;
  index: number;
  isEditMode: boolean;
}) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [curCategory, setCurCategory] = useState<string | undefined>(undefined);
  const [newCategory, setNewCategory] = useState(title);

  const saveCard = async () => {
    const res = await fetch("http://localhost:8080/category/update_name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryID: categoryID,
        title: newCategory,
      }),
    });

    if (!res.ok) {
      const resJOSN = await res.json();
      throw resJOSN.message;
    }

    setCurCategory(newCategory);
  };

  useEffect(() => {
    if (curCategory === undefined) {
      setCurCategory(title);
    }
  }, [title, curCategory]);

  return (
    <>
      <GridItem
        key={index}
        colSpan={1}
        rowSpan={1}
        gridColumn={index / 6}
        gridRow={1}
        border={"3px solid black"}
      >
        {isEditMode ? (
          <div onClick={onOpenEdit}>
            <Box
              padding={4}
              border="1px"
              borderColor="black"
              boxShadow="md"
              backgroundColor="#0831c4"
              minH="100px"
              textAlign={"center"}
            >
              <Text textColor={"white"} as="b" fontSize={"xl"}>
                {curCategory}
              </Text>
            </Box>
          </div>
        ) : (
          <Box
            padding={4}
            border="1px"
            borderColor="black"
            boxShadow="md"
            backgroundColor="#0831c4"
            minH="100px"
            textAlign={"center"}
          >
            <Text textColor={"white"} as="b" fontSize={"xl"}>
              {curCategory}
            </Text>
          </Box>
        )}
      </GridItem>
      <Modal
        isOpen={isOpenEdit}
        onClose={() => {
          onCloseEdit();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            <Text>Editing Category Name</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginX="5%" marginY="5%" textAlign={"center"}>
            <Input
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              defaultValue={newCategory}
            ></Input>
            <Button onClick={saveCard}>Save</Button>
            <Button>Undo</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
