import {
  Card,
  CardBody,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Box,
  TabPanel,
  Text,
  Textarea,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export function QuestionCard({
  qNo,
  points,
  isDaily,
  categoryName,
  categoryID,
  question,
  answer,
  isEditMode,
}: {
  qNo: number
  points: number;
  isDaily: boolean;
  categoryName: string;
  categoryID: string;
  question: string;
  answer: string;
  isEditMode: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  const [ curQuestion, setCurQuestion ] = useState<string | undefined>(undefined);
  const [ curAnswer, setCurAnswer ] = useState<string | undefined>(undefined);
  const [ newQuestion, setNewQuestion ] = useState(question);
  const [ newAnswer, setNewAnswer ] = useState(answer);

  const saveCard = async () => {
    const res = await fetch('http://localhost:8080/category/update',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryID: categoryID,
        qNo: qNo,
        question: newQuestion,
        answer: newAnswer,
      })
    });

    if (!res.ok) {
      const resJOSN = await res.json();
      throw resJOSN.message;
    }
    
    setCurQuestion(newQuestion);
    setCurAnswer(newAnswer);
  }

  useEffect(()=>{
    if(curQuestion === undefined || curAnswer === undefined){
      setCurQuestion(question);
      setCurAnswer(answer);
    }
  },[question,answer,curQuestion,curAnswer]);

  return (
    <Card>
      <CardBody backgroundColor="#0831c4">
        {isEditMode ? (
          <div onClick={onOpenEdit}>
            <Text textShadow={"2px 2px #000000"}
            textColor={"#F2B636"}>{curQuestion}</Text>
                   <Text textShadow={"2px 2px #000000"}
            textColor={"#F2B636"} backgroundColor={"darkblue"}>({curAnswer})</Text>
          </div>
        ) : (
          <Button
            textShadow={"2px 2px #000000"}
            textColor={"#F2B636"}
            variant="ghost"
            onClick={onOpen}
            fontSize={"4xl"}
          >
            {isCompleted ? "" : points}
          </Button>
        )}
      </CardBody>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsCompleted(true);
          onClose();
        }}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#0831c4">
          <ModalHeader textAlign={"center"}>
            <Text textColor={"white"}>
              {points} ({categoryName})
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginX="25%" marginY="15%" textAlign={"center"}>
            {isDaily ? (
              <Tabs>
                <TabList>
                  <Tab>Daily Double</Tab>
                  <Tab>Question</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <h1>Daily Double!</h1>
                  </TabPanel>
                  <TabPanel>
                    <p>{curQuestion}</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <Text as="b" width={"40vw"} fontSize={"5xl"} textColor={"white"}>
                {curQuestion}
              </Text>
            )}
          </ModalBody>
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
            <Text>
              Editing {points} ({categoryName})
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginX="5%" marginY="5%" textAlign={"center"}>
            <Textarea onChange={(e)=>{setNewQuestion(e.target.value)}} defaultValue={newQuestion}></Textarea>
            <Input onChange={(e)=>{setNewAnswer(e.target.value)}} defaultValue={newAnswer}></Input>
            <Button onClick={saveCard}>Save</Button>
            <Button>Undo</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
