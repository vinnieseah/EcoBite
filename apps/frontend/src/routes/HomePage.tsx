// routes/HomePage.tsx
import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import {InfoCard} from '../components/InfoCard';  // Adjust path if needed

const HomePage: React.FC = () => {
  return (
    <Flex flex={1} flexDirection="column">
      <Container
        mt={{ base: 4, md: 10 }}
        maxW={"container.xl"}
        mb={{ base: 4, md: 10 }}
        display={"flex"}
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDirection={"column"}
      >
        <InfoCard />
      </Container>
    </Flex>
  );
};

export default HomePage;
