import React, { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Text, VStack, Container, Divider, Image } from '@chakra-ui/react';
import User from "./components/user";
import imagejulie from './assets/julie.jpg';
import imageanine from './assets/anine.jpg';
import imagejennyM from './assets/jennyM.jpg';
import imagejennyL from './assets/jennyL.jpg';
import imagehanna from './assets/hanna.jpg';
import image1 from './assets/image1.jpg'; 
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.jpg';
import image6 from './assets/image6.jpg';

const residents = [
  { name: "Julie", imageUrl: imagejulie },
  { name: "Anine", imageUrl: imageanine },
  { name: "Jenny L", imageUrl: imagejennyL },
  { name: "Jenny M", imageUrl: imagejennyM },
  { name: "Hanna", imageUrl: imagehanna }
];

const areas = ["Bad🚽", "Kjøkken🧼", "Stue💦"];
const offWeeks = [null, null]; // Represents the week when you are not washing any area

// Array of images to create a background image grid
const backgroundImages = [image1, image2, image3, image4, image5, image6];

function App() {
  const [schedules, setSchedules] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(getDateWeek(new Date()));

  const updateSchedules = () => {
    let nextSchedules = [];

    for (let weekOffset = 0; weekOffset < 5; weekOffset++) {
      let weeklySchedule = [];
      const fullRotation = [...areas, ...offWeeks];

      residents.forEach((resident, index) => {
        const rotationIndex = (currentWeek + weekOffset + index) % fullRotation.length;
        const areaOrOff = fullRotation[rotationIndex];

        weeklySchedule.push({ person: resident, area: areaOrOff || "Ingen" });
      });

      nextSchedules.push(weeklySchedule);
    }

    setSchedules(nextSchedules);
  };

  useEffect(() => {
    updateSchedules();
  }, [currentWeek]);

  return (
    <Box position="relative" minH="100vh">
      <Box
        position="fixed" // Keep the background fixed when scrolling
        top={0}
        left={0}
        width="100vw" // Cover the entire width of the viewport
        height="100vh" // Cover the entire height of the viewport
        opacity={0.5}
      >
        {/* picture-wall as background to the page, three columns */}
        <SimpleGrid columns={3} spacing={0} height="100%">
          {backgroundImages.map((src, index) => (
            <Box key={index} overflow="hidden">
              <Image src={src} objectFit="cover" w="100%" h="100%" />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Container minH="100vh" py={10} centerContent zIndex={1} position="relative">
        <VStack spacing={10} justifyContent="center" alignItems="center" w="100%" color='purple'>
          <Heading as="h1" size="2xl" textAlign="center" mb={6}>
          🧼💜💃🏼Vaskeliste🫧🌸☀️
          </Heading>

          {schedules.map((schedule, weekIndex) => (
            <VStack key={weekIndex} spacing={10} justifyContent="center" alignItems="center" w="100%">
              <Heading as="h2" size="lg" textAlign="center">
                Uke {currentWeek + weekIndex}
              </Heading>
              <SimpleGrid columns={3} spacing={20} justifyContent="center" alignItems="center">
                {schedule
                  .filter(item => item.area !== "Ingen")
                  .map((item, index) => (
                    <VStack key={index} spacing={4} justifyContent="center" alignItems="center">
                      <User name={item.person.name} imageUrl={item.person.imageUrl} />
                      <Divider borderColor="gray.400" />
                      <Text fontSize="lg" fontWeight="bold" textAlign="center">
                        {item.area}
                      </Text>
                    </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

//Get current week-number. function taken from https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
function getDateWeek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date();
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);

    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}

export default App;
