import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Textarea,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ScoreCards } from "./ScoreCards";

export function FinalJeopardy({
  finalBoard,
  isEditMode,
}: {
  finalBoard: any;
  isEditMode: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [curQuestion, setCurQuestion] = useState<string | undefined>(undefined);
  const [curAnswer, setCurAnswer] = useState<string | undefined>(undefined);
  const [curCategory, setCurCategory] = useState<string | undefined>(undefined);
  const [newQuestion, setNewQuestion] = useState(finalBoard.question);
  const [newAnswer, setNewAnswer] = useState(finalBoard.answer);
  const [newCategory, setNewCategory] = useState(finalBoard.category);

  const saveFinalCard = async () => {
    const res = await fetch("http://localhost:8080/final/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finalBoardID: finalBoard.id,
        category: newCategory,
        question: newQuestion,
        answer: newAnswer,
      }),
    });

    if (!res.ok) {
      const resJOSN = await res.json();
      throw resJOSN.message;
    }

    setCurCategory(newCategory);
    setCurQuestion(newQuestion);
    setCurAnswer(newAnswer);
  };

  useEffect(() => {
    if (curQuestion === undefined || curAnswer === undefined || curCategory === undefined) {
      setCurCategory(finalBoard.category);
      setCurQuestion(finalBoard.question);
      setCurAnswer(finalBoard.answer);
    }
  }, [finalBoard, curQuestion, curAnswer, curCategory]);

  return (
    <Card>
      <CardBody backgroundColor="#0831c4">
        <Button
          textShadow={"2px 2px #000000"}
          textColor={"#F2B636"}
          variant="ghost"
          onClick={isEditMode ? onOpenEdit : onOpen}
          fontSize={"4xl"}
        >
          {curCategory}
        </Button>
      </CardBody>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#0831c4">
          <ModalHeader textAlign={"center"}>
            <Text textColor={"white"}>{curCategory}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginX="25%" marginTop="15%" textAlign={"center"}>
            <Text as="b" width={"40vw"} fontSize={"5xl"} textColor={"white"}>
              {curQuestion}
            </Text>
          </ModalBody>
          <ModalFooter marginX={"auto"}>
          <ScoreCards points={undefined} />
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            <Text>Editing Final Jeopardy</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginX="5%" marginY="5%" textAlign={"center"}>
            Category: <Input
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              defaultValue={newAnswer}
            ></Input>
            Question: <Textarea
              onChange={(e) => {
                setNewQuestion(e.target.value);
              }}
              defaultValue={newQuestion}
            ></Textarea>
            Answer: <Input
              onChange={(e) => {
                setNewAnswer(e.target.value);
              }}
              defaultValue={newAnswer}
            ></Input>
            <Button onClick={saveFinalCard}>Save</Button>
            <Button>Undo</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
