import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { JeopardyRound } from "./JeopardyRound";
import { ScoreCards } from "./ScoreCards";
import { FinalJeopardy } from "./FinalJeopardy";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export function Layout(/*{ points, isDaily, question, category }*/) {
  const params = useParams();
  const gameID = params.gameID;
  const [isEditMode, setIsEditMode] = useState(false);

  const [board1, setBoard1] = useState<{boardInfo: any, boardContent: any} | undefined>(undefined);
  const [board2, setBoard2] = useState<{boardInfo: any, boardContent: any} | undefined>(undefined);
  const [final, setFinal] = useState(undefined);

  const setGame = useCallback(async () => {
    const res = await fetch(`http://localhost:8080/game/?gameID=${gameID}`, {
      method: "GET",
    });

    if (!res.ok) {
      const resJOSN = await res.json();
      throw resJOSN.message;
    }

    const resJSON = await res.json();
    setBoard1(resJSON.board1);
    setBoard2(resJSON.board2);
    setFinal(resJSON.finalBoard);
  }, [gameID]);

  useEffect(() => {
    setGame();
  }, [setGame]);

  const homePage = () => {
    window.location.href = "/";
  };

  if (!board1 || !board2 || !final) {
    return <p>Loading...</p>;
  }

  return (
    // Do three tabs, single, double and final jeopardy
    <Box marginY="5" marginX="2">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList justifyContent={"space-around"}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Flex direction={"row"} justifyContent={"left"}>
              <Tab>Jeopardy</Tab>
              <Tab>Double Jeopardy</Tab>
              <Tab>Final Jeopardy</Tab>
              {isEditMode ? (
                <Button
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  Play
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  Edit
                </Button>
              )}
            </Flex>
            <Button marginLeft={"5"} onClick={homePage}>Exit Game</Button>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <JeopardyRound
              boardInfo={board1.boardInfo}
              boardContent={board1.boardContent}
              isDouble={false}
              isEditMode={isEditMode}
            />
          </TabPanel>
          <TabPanel>
            <JeopardyRound
              boardInfo={board2.boardInfo}
              boardContent={board2.boardContent}
              isDouble={true}
              isEditMode={isEditMode}
            />
          </TabPanel>
          <TabPanel>
            <FinalJeopardy finalBoard={final} isEditMode={isEditMode} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ScoreCards />
    </Box>
  );
}
