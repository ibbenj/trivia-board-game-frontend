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
  useDisclosure
} from "@chakra-ui/react";
  
  export function FinalJeopardy({ question, category }:{ question: string, category: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Card>
        <CardBody backgroundColor="#0831c4">
          <Button textShadow={"2px 2px #000000"} textColor={"#F2B636"} variant='ghost' onClick={onOpen} fontSize={"4xl"}>{category}</Button>
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
              <Text textColor={"white"}>{category}</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody marginX="25%" marginY="15%" textAlign={"center"}>
              <Text  as="b" width={"40vw"} fontSize={"5xl"} textColor={"white"}>{question}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Card>
    );
  }
  