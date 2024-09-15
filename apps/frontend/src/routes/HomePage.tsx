// routes/HomePage.tsx
import React from 'react';
import { Container, Flex, Box, Text } from '@chakra-ui/react';
import { matchedLocations, posters } from '../components/Camera'; // Import global variables
import { InfoCard } from '../components/InfoCard'; // Adjust path if needed

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

        {/* Display matched locations and images */}
        <Box mt={10} w={"full"}>
          {matchedLocations.map((location) => (
            <Box key={location.id} mt={5} textAlign="center"> {/* Center the content */}
              <Text fontWeight="bold" mb={4}>{location.name}</Text>
              {/* Display images stored in the posters global variable */}
              {posters[location.id].map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Uploaded at ${location.name}`} 
                  style={{ 
                    width: "80%", 
                    margin: "10px auto", 
                    display: "block", 
                    borderRadius: "15px" // Added borderRadius for rounded corners
                  }} 
                />
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Flex>
  );
};

export default HomePage;
