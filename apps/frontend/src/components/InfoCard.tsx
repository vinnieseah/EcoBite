import {
  Box,
  Card,
  VStack,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";

export const InfoCard = () => {
  return (
    <Card w={"full"}>
      <Box p={3}>
        <VStack w={"full"} spacing={{ base: 2, md: 4 }}>
          {/* Make the image clickable and link to the user's profile */}
          <Link href="/user/profile" isExternal>
            <Image src="/ecology-bag-with-leaves.png" borderRadius={16} />
          </Link>
          <Flex
            w={"full"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {/* Make the user name clickable */}
            <Link href="/user/profile" isExternal>
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Card>
  );
};
