import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ScanIcon } from "./Icon";
import { blobToBase64, resizeImage } from "../util";
import { useWallet } from "@vechain/dapp-kit-react";
import { useDisclosure, useSubmission } from "../hooks";

// Define a type for the location
type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  images: string[]; // Store base64 images
};


// Predefined locations with latitude and longitude
const locations: Location[] = [
  { id: 1, name: 'Open Farm Community', lat: 1.304896, lng: 103.812891, images: [] },
  { id: 2, name: 'Scaled by Ah Hua Kelong', lat: 1.313387, lng: 103.859730, images: [] },
  { id: 3, name: 'At Feast', lat: 1.304231, lng: 103.814708, images: [] },
  { id: 4, name: 'The Summerhouse', lat: 1.409229, lng: 103.868540, images: [] },
  { id: 5, name: 'SaladStop!', lat: 1.281551, lng: 103.850597, images: [] },
  { id: 6, name: 'Poison Ivy Bistro', lat: 1.437373, lng: 103.730705, images: [] },
  { id: 7, name: 'Artichoke', lat: 1.290920, lng: 103.841799, images: [] },
];

// Utility function to calculate the distance between two points (Haversine formula)
const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const Camera: React.FC = () => {
  const { account } = useWallet();
  const { setIsLoading, setResponse } = useSubmission();
  const { onOpen } = useDisclosure();

  // State to store matched location and images
  const [matchedLocations, setMatchedLocations] = useState<Location[]>(locations);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles); // Pass the files to the callback
    },
    maxFiles: 1, // Allow only one file
    accept: {
      "image/*": [], // Accept only image files
    },
  });

  const onFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length > 1 || files.length === 0) {
        alert("Please upload only one file");
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

      // Get the user's current location
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Check proximity to predefined locations (within 0.5 km)
        const proximityThreshold = 5; // kilometers
        let closestLocation: Location | null = null;

        for (const location of matchedLocations) {
          const distance = getDistance(latitude, longitude, location.lat, location.lng);
          if (distance <= proximityThreshold) {
            closestLocation = location;
            break;
          }
        }

        if (closestLocation) {
          // Append the image to the location's images array
          const updatedLocations = matchedLocations.map((loc) => {
            if (loc.id === closestLocation?.id) {
              return { ...loc, images: [...loc.images, base64Image] };
            }
            return loc;
          });

          setMatchedLocations(updatedLocations);
          

          console.log(`Image appended to ${closestLocation.name}`);
        } else {
          alert("No nearby locations found.");
        }

        setIsLoading(false);
      });
    },
    [account, onOpen, setIsLoading, setResponse, matchedLocations]
  );

  return (
    <VStack w={"full"} mt={3}>
      <Box
        {...getRootProps()}
        p={5}
        border="2px"
        borderColor={isDragActive ? "green.300" : "gray.300"}
        borderStyle="dashed"
        borderRadius="md"
        bg={isDragActive ? "green.100" : "gray.50"}
        textAlign="center"
        cursor="pointer"
        _hover={{
          borderColor: "green.500",
          bg: "green.50",
        }}
        w={"full"}
        h={"200px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <input {...getInputProps()} />
        <HStack>
          <ScanIcon size={120} color={"gray"} />
          <Text>Upload to scan</Text>
        </HStack>
      </Box>

      {/* Display matched locations and images */}
      {matchedLocations.map((location) => (
        <Box key={location.id} mt={5}>
          <Text fontWeight="bold">{location.name}</Text>
          {location.images.map((img, index) => (
            <img key={index} src={img} alt={`Uploaded at ${location.name}`} style={{ width: '100px', margin: '5px' }} />
          ))}
        </Box>
      ))}
    </VStack>
  );
};
