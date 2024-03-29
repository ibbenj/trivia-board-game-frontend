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
// import { FinalJeopardy } from "./FinalJeopardy";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export function Layout(/*{ points, isDaily, question, category }*/) {
  const params = useParams();
  const gameID = params.gameID;
  const [isEditMode, setIsEditMode] = useState(false);

  // const jeopardyRound1 = [
  //   {
  //     category: "apples",
  //     points: 1,
  //     isDaily: false,
  //     question:
  //       'In 1976 "BOHEMIAN RHAPSODY" was replaced at no. 1 on the U.K. charts by this Europop song whose title is heard in Queen\'s lyrics.',
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 2,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 3,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 4,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 5,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 1,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 2,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 3,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 4,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 5,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 1,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 2,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 3,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 4,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 5,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 1,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 2,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 3,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 4,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 5,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 1,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 2,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 3,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 4,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "apples",
  //     points: 5,
  //     isDaily: false,
  //     question: "who are you?",
  //     answer: "",
  //   },
  //   {
  //     category: "Let’s Get the (Political) Party Started",
  //     points: 1,
  //     isDaily: false,
  //     question:
  //       "In 1860, this man became the first Republican Party candidate to become president.",
  //     answer: "",
  //   },
  //   {
  //     category: "Let’s Get the (Political) Party Started",
  //     points: 2,
  //     isDaily: false,
  //     question:
  //       "Known as the “Mehapakh”, or ”The Revolution”, this man dethroned the governing Labor party in Israel’s 1977 election in his newly united Likud party.",
  //     answer: "",
  //   },
  //   {
  //     category: "Let’s Get the (Political) Party Started",
  //     points: 3,
  //     isDaily: false,
  //     question:
  //       "After helping to unite the Reform and Progressive Conversative parties, this man became the first member of the modern Conversative Party of Canada to become prime minister.",
  //     answer: "",
  //   },
  //   {
  //     category: "Let’s Get the (Political) Party Started",
  //     points: 4,
  //     isDaily: false,
  //     question:
  //       "Now the governing party of France, Emmanuel Macron founded this French political party in 2016.",
  //     answer: "",
  //   },
  //   {
  //     category: "Let’s Get the (Political) Party Started",
  //     points: 5,
  //     isDaily: true,
  //     question:
  //       "Becoming the official opposition of Canada in 1993, this man was the first leader of the Quebec Nationalist party known as the Bloq Québécois.",
  //     answer: "",
  //   },
  // ];

  // const categories = [
  //   "apples",
  //   "apples",
  //   "apples",
  //   "apples",
  //   "apples",
  //   "Test 1",
  // ];

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
    <>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
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
            <Button onClick={homePage}>Exit Game</Button>
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
            {/* <FinalJeopardy finalBoard={final} /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ScoreCards />
    </>
  );
}
