import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, HStack, Text, VStack, Icon, useColorModeValue, useToast } from "@chakra-ui/react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";
import { blobToBase64, resizeImage } from "../util";
import { useDisclosure, useSubmission } from "../hooks";
import { useWallet } from "@vechain/dapp-kit-react"; // Import useWallet

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  images: string[];
};

const locations: Location[] = [
  { id: 1, name: "Open Farm Community", lat: 1.304896, lng: 103.812891, images: [] },
  { id: 2, name: "Scaled by Ah Hua Kelong", lat: 1.313387, lng: 103.85973, images: [] },
  { id: 3, name: "At Feast", lat: 1.304231, lng: 103.814708, images: [] },
  { id: 4, name: "The Summerhouse", lat: 1.409229, lng: 103.86854, images: [] },
  { id: 5, name: "SaladStop!", lat: 1.281551, lng: 103.850597, images: [] },
  { id: 6, name: "Poison Ivy Bistro", lat: 1.437373, lng: 103.730705, images: [] },
  { id: 7, name: "Artichoke", lat: 1.29092, lng: 103.841799, images: [] },
];

const posters: { [key: number]: string[] } = {};
const matchedLocations: Location[] = [...locations];

locations.forEach((location) => {
  posters[location.id] = [];
});

const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const Camera: React.FC = () => {
  const { setIsLoading } = useSubmission();
  const { onOpen } = useDisclosure();
  const { account } = useWallet();
  const toast = useToast();
  const dropzoneBg = useColorModeValue("gray.50", "gray.700");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles);
    },
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });

  const onFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length > 1 || files.length === 0) {
        toast({
          title: "Upload Error",
          description: "Please upload only one file.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: <WarningIcon />, // Icon for error
        });
        return;
      }

      if (!account) {
        alert("Please connect your wallet");
        return;
      }
        

      setIsLoading(true);
      onOpen();

      const file = files[0];
      const resizedBlob = await resizeImage(file);
      const base64Image = await blobToBase64(resizedBlob as Blob);

      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const proximityThreshold = 5;
        let closestLocation: Location | null = null;

        for (const location of matchedLocations) {
          const distance = getDistance(latitude, longitude, location.lat, location.lng);
          if (distance <= proximityThreshold) {
            closestLocation = location;
            break;
          }
        }

        if (closestLocation) {
          posters[closestLocation.id].push(base64Image);
          console.log(`Image appended to location ID ${closestLocation.id}`);
          console.log("Updated posters:", posters);

          toast({
            title: "Image Verified",
            description: `Your image has been successfully added to ${closestLocation.name}.`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            icon: <CheckCircleIcon />, // Icon for success
          });
        } else {
          toast({
            title: "No Nearby Locations",
            description: "No nearby locations found within 5 km.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
            icon: <InfoIcon />, // Icon for information
          });
        }

        setIsLoading(false);
      });
    },
    [onOpen, setIsLoading, toast]
  );

  return (
    <VStack w="full" mt={3} spacing={6}>
      <Box
        {...getRootProps()}
        p={5}
        borderWidth={2}
        borderColor={isDragActive ? "green.400" : "gray.400"}
        borderStyle="dashed"
        borderRadius="lg"
        bgGradient="linear(to-br, teal.300, green.200)"
        textAlign="center"
        cursor="pointer"
        shadow="lg"
        transition="all 0.2s"
        _hover={{
          shadow: "xl",
          bgGradient: "linear(to-br, teal.400, green.300)",
        }}
        w="full"
        h="250px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <input {...getInputProps()} />
        <VStack>
          <Icon as={MdOutlineCameraAlt} boxSize={16} color="white" />
          <Text fontSize="lg" color="white" fontWeight="bold">
            {isDragActive ? "Drop the image here..." : "Upload an image to scan"}
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export { posters, matchedLocations };
