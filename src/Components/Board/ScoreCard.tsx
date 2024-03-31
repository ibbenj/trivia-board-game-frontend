import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useScoreContext } from "../../Context/ScoreContext";

export function ScoreCard({
  id,
  player,
  points,
}: {
  id: number;
  player: { name: string; score: number };
  points: number | undefined;
}) {
  const { changeScore, updateScore, updateName } = useScoreContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card width={"20vw"}>
      <CardHeader backgroundColor="#0831c4" paddingY={"2"}>
        <Input
          textAlign={"center"}
          isDisabled={points !== undefined}
          border={"none"}
          textColor={"white"}
          fontSize={"xl"}
          defaultValue={player.name}
          onChange={(e) => {
            updateName(id, e.target.value);
          }}
        />
      </CardHeader>
      <CardBody backgroundColor="#0831c4" paddingY={"2"}>
        {isEditing ? (
          <>
            <Input
              textAlign={"center"}
              textColor={"white"}
              fontSize={"xl"}
              defaultValue={player.score}
              onChange={(e) => {
                updateScore(id, Number(e.target.value));
              }}
            />
          </>
        ) : (
          <>
            <Editable
              textColor={"white"}
              as="b"
              fontSize={"xl"}
              defaultValue={player.score.toString()}
              value={player.score.toString()}
              onSubmit={(value) => {
                updateScore(id, Number(value));
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </>
        )}
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          marginTop={"2"}
        >
          <Button
            isDisabled={points === undefined}
            onClick={() => {
              changeScore(id, points!, true);
            }}
          >
            +
          </Button>

          <Button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>

          <Button
            isDisabled={points === undefined}
            onClick={() => {
              changeScore(id, points!, false);
            }}
          >
            -
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
