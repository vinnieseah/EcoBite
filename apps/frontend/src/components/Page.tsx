import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { posters } from './Camera'; // Import the global posters variable

// Sample data for 6 cards
const cardData = [
  { 
    id: 1, 
    name: 'Open Farm Community', 
    logo: '/1.jpg',  
    description: 'Urban farm meets restaurant 🌱 | Local produce & sustainable dining 🍴 | Herb & veggie gardens 🌿', 
    address: '130E Minden Road, Singapore 248819', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=130E+Minden+Road,+Singapore+248819',
    latitude: 1.304896, 
    longitude: 103.812891 
  },
  { 
    id: 2, 
    name: 'Scaled by Ah Hua Kelong', 
    logo: '/2.jpg',  
    description: 'Freshest seafood in SG 🐟 | Farm-to-table dining 🍽️ | Smoked, torched & curry seafood delights 🌊', 
    address: '8 Hamilton Road, Singapore 209179', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=8+Hamilton+Road,+Singapore+209179',
    latitude: 1.313387, 
    longitude: 103.859730 
  },
  { 
    id: 3, 
    name: 'At Feast', 
    logo: '/3.jpg',  
    description: 'Seasonal & organic eats 🌍 | Carbon-neutral & plastic-free dining ♻️ | Eco-friendly cutlery 🌿', 
    address: '16A Dempsey Road, Singapore 247695', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=16A+Dempsey+Road,+Singapore+247695',
    latitude: 1.304231, 
    longitude: 103.814708
  },
  {
    id: 4,
    name: 'test feast',
    logo: '/3.jpg',  
    description: 'Modern dining space with a focus on innovation and sustainability 🌱 | Located in the heart of the research and development district 📍 | Offers a variety of cuisines with locally sourced ingredients.',
    address: '11 Slim Barracks Rise, Singapore',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=11+Slim+Barracks+Rise,+Singapore',
    latitude: 1.304867, 
    longitude: 103.787498
  },  
  { 
    id: 5, 
    name: 'The Summerhouse', 
    logo: '/5.jpg',  
    description: 'Nature-inspired cuisine 🌿 | Edible garden & local produce 🍽️ | Farm-to-table dining 🌾', 
    address: '3 Park Lane, Singapore 798387', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=3+Park+Lane,+Singapore+798387',
    latitude: 1.409229, 
    longitude: 103.868540
  },
  { 
    id: 6, 
    name: 'SaladStop!', 
    logo: '/6.jpg',  
    description: 'Eat fresh, go green 🥗 | Carbon-labeled menu 🌱 | Offset your meal’s carbon footprint 🌍 | Mangrove reforestation project 🌳', 
    address: '88 Market Street, #01-03, CapitaSpring Singapore, Singapore 048948', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=88+Market+Street,+Singapore+048948',
    latitude: 1.281551, 
    longitude: 103.850597
  },
  { 
    id: 7, 
    name: 'Poison Ivy Bistro', 
    logo: '/7.jpg',  
    description: 'Farm-to-table cafe 🌾 | Rustic vibes & local fusion cuisine 🍚 | Fresh from Bollywood Veggies farm 🌱', 
    address: '100 Neo Tiew Road, Singapore 719026', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=100+Neo+Tiew+Road,+Singapore+719026',
    latitude: 1.437373, 
    longitude: 103.730705
  },
  { 
    id: 8, 
    name: 'Artichoke', 
    logo: '/8.jpg',  
    description: 'Middle Eastern eats with a twist 🌿 | Seasonal menu 🍴 | Locally sourced produce 🥗', 
    address: '46 & 58 Kim Yam Road, Singapore 239351', 
    mapLink: 'https://www.google.com/maps/search/?api=1&query=46+Kim+Yam+Road,+Singapore+239351',
    latitude: 1.290920, 
    longitude: 103.841799
  }
];

const Page: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the `id` parameter from the URL
  const [pageImages, setPageImages] = useState<string[]>([]);

  // Find the corresponding entry in the cardData array
  const pageData = cardData.find((card) => card.id === parseInt(id || ''));

  // If no data is found, return an error message
  if (!pageData) {
    return <div>Page not found</div>;
  }

  useEffect(() => {
    // Check the global posters variable for images corresponding to the page index
    if (posters[pageData.id] && posters[pageData.id].length > 0) {
      setPageImages(posters[pageData.id]);
    }
  }, [pageData]);

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1>{pageData.name}</h1>
      </header>

      {/* Logo and Description Section */}
      <section style={styles.infoSection}>
        {/* Logo */}
        {pageData.logo && <img src={pageData.logo} alt={pageData.name} style={styles.logo} />}
        <div style={styles.textContainer}>
          {/* Description */}
          <div style={styles.description}>
            {pageData.description.split('|').map((line, index) => (
              <p key={index}>{line.trim()}</p>
            ))}
          </div>
          {/* Address */}
          <p style={styles.description}><strong>Address:</strong> {pageData.address}</p>
          {/* Map Link */}
          {pageData.mapLink && (
            <a href={pageData.mapLink} target="_blank" rel="noopener noreferrer" style={styles.websiteLink}>
              View on Google Maps
            </a>
          )}
        </div>
      </section>

      {/* Display images from global posters */}
      {pageImages.length > 0 && (
        <section style={styles.imageSection}>
          <h2>Uploaded Images</h2>
          {pageImages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Uploaded image ${index + 1}`} 
              style={styles.uploadedImage} 
            />
          ))}
        </section>
      )}
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '20px',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '150px',
    height: '150px',
    borderRadius: '50%', // Make the logo circular
    marginBottom: '20px',
    objectFit: 'cover', // Ensure the image covers the circular area
  },
  textContainer: {
    textAlign: 'center',
  },
  description: {
    whiteSpace: 'pre-line',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '10px',
  },
  websiteLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  imageSection: {
    marginTop: '20px',
  },
  uploadedImage: {
    width: '80%', // Increased the width to make the images larger
    height: 'auto',
    margin: '10px auto', // Center the images
    borderRadius: '15px', // Added rounded corners
    display: 'block',
  },
};

export default Page;
