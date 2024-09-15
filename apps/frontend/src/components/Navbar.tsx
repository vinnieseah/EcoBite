import { Box, Container, HStack, IconButton } from "@chakra-ui/react";
import { FaHome, FaSearch, FaCamera, FaInfoCircle } from "react-icons/fa"; // Import icons from react-icons
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ConnectWalletButton } from "./ConnectWalletButton";

export const Navbar = () => {
  return (
    <Box
      px={0}
      position={"sticky"}
      top={0}
      zIndex={10}
      py={4}
      h={"auto"}
      w={"full"}
      bg={"#f7f7f7"}
    >
      <Container
        w="full"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
        maxW={"container.xl"}
      >
        <HStack flex={1} justifyContent={"start"} spacing={4}>
          {/* Use Link to navigate to different routes */}
          <Link to="/home">
            <IconButton
              icon={<FaHome />}
              aria-label="Home"
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link to="/pages"> {/* Adjust this to the appropriate path */}
            <IconButton
              icon={<FaSearch />}
              aria-label="Search"
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link to="/camera">
            <IconButton
              icon={<FaCamera />}
              aria-label="Camera"
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link to="/instructions">
            <IconButton
              icon={<FaInfoCircle />}
              aria-label="Info"
              variant="ghost"
              size="lg"
            />
          </Link>
        </HStack>

        <HStack flex={1} spacing={4} justifyContent={"end"}>
          <ConnectWalletButton />
        </HStack>
      </Container>
    </Box>
  );
};
