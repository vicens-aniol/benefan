import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image } from 'react-native';
import BlobBackground from '../components/BlobBackground'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import from vector icons
import commonStyles from '../styles/commonStyles';


// navigation-types.d.ts (or any TypeScript file)
import { StackNavigationProp } from '@react-navigation/stack';

// Define a type for your stack navigator params
type RootStackParamList = {
  Schedule: undefined; // Replace with the screen's name and params
  AnotherScreen: undefined; // Other screens in your navigation
};

// Define the specific navigation prop type
type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Schedule'>;

export type { ScheduleScreenNavigationProp, RootStackParamList };


// Define a type for timeslot objects
interface Timeslot {
  time: string;
  available: boolean;
}

// New type to represent a row of timeslots
interface RowData {
    row: Timeslot[];
  }

interface SectionData {
    title: string;
    data: Timeslot[];
  }
  
  // Function to generate a range of timeslots with unique entries
const generateTimeSlots = (startHour: number, endHour: number, isAM: boolean): Timeslot[] => {
  const slots: Timeslot[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const formattedHour = hour === 0 ? 12 : hour % 12;
    const suffix = isAM ? 'AM' : 'PM';
    slots.push({ time: `${formattedHour}:00 ${suffix}`, available: true });
    slots.push({ time: `${formattedHour}:30 ${suffix}`, available: true });
  }
  return slots;
};

// Generate morning, afternoon, evening, and night slots
const morningSlots = generateTimeSlots(6, 12, true); // 6:00 AM - 12:00 PM
const afternoonSlots = [
  ...generateTimeSlots(0, 6, false) // 12:30 PM - 6:00 PM
];
const eveningSlots = generateTimeSlots(6, 9, false); // 6:00 PM - 9:00 PM
const nightSlots = [
  ...generateTimeSlots(9, 12, false), // 9:30 PM - 11:30 PM
  { time: '12:00 AM', available: true } // Midnight
];

// Create sections without duplicates
const sections: SectionData[] = [
  { title: 'Morning', data: morningSlots },
  { title: 'Afternoon', data: afternoonSlots },
  { title: 'Evening', data: eveningSlots },
  { title: 'Night', data: nightSlots }
];




  
 // Define the props of the ScheduleScreen
interface ScheduleScreenProps {
  navigation: ScheduleScreenNavigationProp;
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ navigation }) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    // Handle slot selection and toggling
    const handleSlotPress = (slot: Timeslot): void => {
      if (slot.available) {
        setSelectedSlots((prevSelected) => {
          const alreadySelected = prevSelected.includes(slot.time);
          if (alreadySelected) {
            // Deselect if already in the list
            return prevSelected.filter((time) => time !== slot.time);
          } else {
            // Add to selected list
            const updatedSlots = [...prevSelected, slot.time];
            console.log('Selected Slots:', updatedSlots);
            return updatedSlots;
          }
        });
      }
    };

    // Function to chunk an array into rows of a specified size
    const chunkTimeslots = (data: Timeslot[], size: number): Timeslot[][] => {
        const chunked = [];
        for (let i = 0; i < data.length; i += size) {
        chunked.push(data.slice(i, i + size));
        }
        return chunked;
    };

    // Transform each section's data into rows
    const transformSectionData = (data: Timeslot[], size: number): RowData[] => {
        const rows: RowData[] = [];
        for (let i = 0; i < data.length; i += size) {
        rows.push({ row: data.slice(i, i + size) });
        }
        return rows;
    };
    
    // Use the new transform function
    const transformedSections = sections.map((section) => ({
        title: section.title,
        data: transformSectionData(section.data, 3),
    }));
  

    // Render section headers for each time period
    const renderSectionHeader = ({ section: { title } }: { section: SectionData }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );
  
  
    // Update renderItem to map each row of timeslots
    const renderItem = ({ item }: { item: RowData }) => {
        return (
          <View style={styles.row}>
            {item.row.map((slot) => {
              const isSelected = selectedSlots.includes(slot.time);
              const slotStyle = {
                backgroundColor: slot.available ? (isSelected ? '#4D8D93' : '#ebebeb') : '#d6d4d4',
                borderWidth: slot.available ? 1 : 1,
                borderColor: slot.available ? '#4D8D93' : 'transparent',
              };
              const textStyle = {
                color: slot.available ? (isSelected ? '#fff' : '#4D8D93') : '#999',
              };
      
              return (
                <TouchableOpacity
                  key={slot.time}
                  style={[styles.timeslotButton, slotStyle]}
                  onPress={() => handleSlotPress(slot)}
                  disabled={!slot.available}
                >
                  <Text style={[styles.timeslotText, textStyle]}>{slot.time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      };
      
  
  
    return (
      <BlobBackground>
        <View style={styles.container}>
          {/* Back Icon */}
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={27} color="#666" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/IMG/Celebrities/TaylorSwift.png')} // Adjust path as necessary
              style={styles.topImage}
            />
            <Text style={styles.topName}>Taylor Swift</Text>
            <Text style={styles.shortDescription}>Singer, wannabe activist</Text>
          </View>
  
          <Text style={styles.dateText}>23 February</Text>
          <SectionList
            sections={transformedSections}
            renderItem={({ item }: { item: RowData }) => (
              <View style={styles.row}>
                {item.row.map((slot) => {
                  const isSelected = selectedSlots.includes(slot.time);
                  const slotStyle = {
                    backgroundColor: slot.available ? (isSelected ? '#4D8D93' : '#ebebeb') : '#d6d4d4',
                    borderWidth: slot.available ? 1 : 1,
                    borderColor: slot.available ? '#4D8D93' : 'transparent',
                  };
                  const textStyle = {
                    color: slot.available ? (isSelected ? '#fff' : '#4D8D93') : '#999',
                  };

                  return (
                    <TouchableOpacity
                      key={slot.time}
                      style={[styles.timeslotButton, slotStyle]}
                      onPress={() => handleSlotPress(slot)}
                      disabled={!slot.available}
                    >
                      <Text style={[styles.timeslotText, textStyle]}>{slot.time}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.timeslotContainer}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
        />
  
          <TouchableOpacity style={commonStyles.buttonContainer_rounded}>
            <Text style={commonStyles.boldlabelforbutton}>Select this timetable</Text>
          </TouchableOpacity>
        </View>
      </BlobBackground>
    );
  };

// Define component styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 80, // Extra padding at the top
      paddingBottom: 40, // Extra padding at the bottom
      backgroundColor: 'transparent',
    },
    backIcon: {
      position: 'absolute',
      top: 60, // Adjust to fit your layout
      left: 20, // Adjust to fit your layout
      color: '#fff',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    topImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    topName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    shortDescription: {
      fontSize: 16,
      color: '#666',
    },
    dateText: {
      fontSize: 18,
      marginBottom: 10,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: '#000',
    },
    timeslotButton: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
    },
    timeslotText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    timeslotContainer: {
      alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
      },
      
  });

export default ScheduleScreen;
