import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Text, Flex, Grid } from '@chakra-ui/react'; // Optional: If using Chakra UI for styling

// Sample data for cards
const cardData = [
  { id: 1, name: 'Open Farm Community', logo: '1.jpg', description: 'Urban farm meets restaurant 🌱 | Local produce & sustainable dining 🍴 | Herb & veggie gardens 🌿', address: '130E Minden Road, Singapore 248819', mapLink: 'https://www.google.com/maps/search/?api=1&query=130E+Minden+Road,+Singapore+248819' },
  { id: 2, name: 'Scaled by Ah Hua Kelong', logo: '2.jpg', description: 'Freshest seafood in SG 🐟 | Farm-to-table dining 🍽️ | Smoked, torched & curry seafood delights 🌊', address: '8 Hamilton Road, Singapore 209179', mapLink: 'https://www.google.com/maps/search/?api=1&query=8+Hamilton+Road,+Singapore+209179' },
  { id: 3, name: 'At Feast', logo: '3.jpg', description: 'Seasonal & organic eats 🌍 | Carbon-neutral & plastic-free dining ♻️ | Eco-friendly cutlery 🌿', address: '16A Dempsey Road, Singapore 247695', mapLink: 'https://www.google.com/maps/search/?api=1&query=16A+Dempsey+Road,+Singapore+247695' },
  { id: 4, name: 'test feast', logo: '/3.jpg', description: 'Modern dining space with a focus on innovation and sustainability 🌱 | Located in the heart of the research and development district 📍 | Offers a variety of cuisines with locally sourced ingredients.',address: '11 Slim Barracks Rise, Singapore',mapLink: 'https://www.google.com/maps/search/?api=1&query=11+Slim+Barracks+Rise,+Singapore'},  
  { id: 5, name: 'The Summerhouse', logo: '5.jpg', description: 'Nature-inspired cuisine 🌿 | Edible garden & local produce 🍽️ | Farm-to-table dining 🌾', address: '3 Park Lane, Singapore 798387', mapLink: 'https://www.google.com/maps/search/?api=1&query=3+Park+Lane,+Singapore+798387' },
  { id: 6, name: 'SaladStop!', logo: '6.jpg', description: 'Eat fresh, go green 🥗 | Carbon-labeled menu 🌱 | Offset your meal’s carbon footprint 🌍 | Mangrove reforestation project 🌳', address: '88 Market Street, #01-03, CapitaSpring Singapore, Singapore 048948', mapLink: 'https://www.google.com/maps/search/?api=1&query=88+Market+Street,+Singapore+048948' },
  { id: 7, name: 'Poison Ivy Bistro', logo: '7.jpg', description: 'Farm-to-table cafe 🌾 | Rustic vibes & local fusion cuisine 🍚 | Fresh from Bollywood Veggies farm 🌱', address: '100 Neo Tiew Road, Singapore 719026', mapLink: 'https://www.google.com/maps/search/?api=1&query=100+Neo+Tiew+Road,+Singapore+719026' },
  { id: 8, name: 'Artichoke', logo: '8.jpg', description: 'Middle Eastern eats with a twist 🌿 | Seasonal menu 🍴 | Locally sourced produce 🥗', address: '46 & 58 Kim Yam Road, Singapore 239351', mapLink: 'https://www.google.com/maps/search/?api=1&query=46+Kim+Yam+Road,+Singapore+239351' }
];

const PageHub: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (data: any) => {
    // Navigate to the Page component and pass the data via state
    navigate(`/page/${data.id}`, { state: { ...data } });
  };

  return (
    <Box p={6}>
      {/* Use a responsive grid layout for the cards */}
      <Grid
        templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}
        gap={6}
      >
        {cardData.map((card) => (
          <Box
            key={card.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
            transition="all 0.3s ease"
            onClick={() => handleCardClick(card)}
          >
            <Image src={card.logo} alt={card.name} height="150px" width="100%" objectFit="cover" />
            <Box p={4} textAlign="center">
              <Text fontWeight="bold" fontSize="xl" mb={2}>{card.name}</Text>
              {/* Short description or address */}
              <Text fontSize="sm" color="gray.500">{card.address}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default PageHub;
