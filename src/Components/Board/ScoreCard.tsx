import {
  Card,
  CardBody,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import React from "react";

export function ScoreCard() {
  return (
    <Card width={"20vw"}>
      <CardHeader backgroundColor="#0831c4">
        <Editable textColor={"white"} fontSize={"xl"} defaultValue="Enter Name">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </CardHeader>
      <CardBody backgroundColor="#0831c4">
        <Editable textColor={"white"} as="b" fontSize={"xl"} defaultValue="0">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </CardBody>
    </Card>
  );
}
