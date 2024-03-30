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
  points: number;
}) {
  const { changeScore, updateScore } = useScoreContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card width={"20vw"}>
      <CardHeader backgroundColor="#0831c4">
        <Editable textColor={"white"} fontSize={"xl"} value={player.name}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </CardHeader>
      <CardBody backgroundColor="#0831c4">
        {isEditing ? (
          <>
            <Input
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
                console.log(value);
                updateScore(id, Number(value));
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </>
        )}
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Button
            onClick={() => {
              changeScore(id, points, true);
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
            onClick={() => {
              changeScore(id, points, false);
            }}
          >
            -
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
