import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { QuestionCard } from "./QuestionCard";
import { CategoryCard } from "./CategoryCard";
import { useEffect, useState } from "react";

export function JeopardyRound({
  boardInfo,
  boardContent,
  isDouble,
  isEditMode,
}: {
  boardInfo: {};
  boardContent: any[];
  isDouble: boolean;
  isEditMode: boolean;
}) {
  // TODO: add daily double
  const [doubleJeopardy, setDoubleJeopardy] = useState<number[]>([]);

  const BoardItem = (
    q: string,
    a: string,
    id: string,
    title: string,
    row: number,
    col: number
  ) => {
    return (
      <GridItem
        key={col + "-" + row}
        colSpan={1}
        rowSpan={1}
        gridColumn={col / 6}
        gridRow={(row % 6) + 2}
        border={"3px solid black"}
      >
        <Box
          padding={4}
          border="1px"
          borderColor="black"
          boxShadow="md"
          backgroundColor="#0831c4"
        >
          <QuestionCard
            qNo={row}
            points={isDouble ? row * 400 : row * 200}
            isDaily={doubleJeopardy.includes(col * 5 + row)}
            question={q}
            categoryName={title}
            categoryID={id}
            answer={a}
            isEditMode={isEditMode}
          />
        </Box>
      </GridItem>
    );
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 30) + 1;
  };

  useEffect(() => {
    if (doubleJeopardy.length === 0) {
      const newDoubleJeopardy = [getRandomNumber()];
      console.log(newDoubleJeopardy, "num");
      if (isDouble) {
        let nextNumber = getRandomNumber();
        if (nextNumber === newDoubleJeopardy[0]) {
          nextNumber = nextNumber + (5 % 30);
        }

        newDoubleJeopardy.push(nextNumber);
      }

      setDoubleJeopardy(newDoubleJeopardy);
    }
  }, [doubleJeopardy, isDouble]);

  return (
    <>
      <Box backgroundColor={"black"}>
        <Grid templateColumns="repeat(6, 1fr)" width="80%" margin="auto">
          {boardContent.map((category, i) => (
            <div key={category.id + "c"}>
              <CategoryCard
                title={category.title}
                categoryID={category.id}
                index={i}
                isEditMode={isEditMode}
              />
              {BoardItem(
                category.q1,
                category.a1,
                category.id,
                category.title,
                1,
                i
              )}
              {BoardItem(
                category.q2,
                category.a2,
                category.id,
                category.title,
                2,
                i
              )}
              {BoardItem(
                category.q3,
                category.a3,
                category.id,
                category.title,
                3,
                i
              )}
              {BoardItem(
                category.q4,
                category.a4,
                category.id,
                category.title,
                4,
                i
              )}
              {BoardItem(
                category.q5,
                category.a5,
                category.id,
                category.title,
                5,
                i
              )}
              {/* {boardContent.map(entry)=>(
                <GridItem
                key={index}
                colSpan={1}
                rowSpan={1}
                gridColumn={index / 6}
                gridRow={(index % 5) + 2}
                border={"3px solid black"}
                >
                <Box
                  padding={4}
                  border="1px"
                  borderColor="black"
                  boxShadow="md"
                  backgroundColor="#0831c4"
                >
                  <QuestionCard
                    qNo={item.points}
                    points={isDouble ? item.points * 400 : item.points * 200}
                    isDaily={item.isDaily}
                    question={item.question}
                    category={item.category}
                    categoryID={item.categoryID}
                    answer={item.answer}
                    isEditMode={isEditMode}
                  />
                </Box>
                </GridItem>
            )} */}
            </div>
          ))}

          {/* {categories.map((category, index) => (
            <GridItem
              key={index}
              colSpan={1}
              rowSpan={1}
              gridColumn={index / 6}
              gridRow={1}
              border={"3px solid black"}
            >
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
                  {category}
                </Text>
              </Box>
            </GridItem>
          ))}
          {qSet.map((item, index) => (
            <GridItem
              key={index}
              colSpan={1}
              rowSpan={1}
              gridColumn={index / 6}
              gridRow={(index % 5) + 2}
              border={"3px solid black"}
            >
              <Box
                padding={4}
                border="1px"
                borderColor="black"
                boxShadow="md"
                backgroundColor="#0831c4"
              >
                <QuestionCard
                  qNo={item.points}
                  points={isDouble ? item.points * 400 : item.points * 200}
                  isDaily={item.isDaily}
                  question={item.question}
                  category={item.category}
                  categoryID={item.categoryID}
                  answer={item.answer}
                  isEditMode={isEditMode}
                />
              </Box>
            </GridItem>
          ))} */}
        </Grid>
      </Box>
    </>
  );
}
