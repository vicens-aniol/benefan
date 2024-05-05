import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import BlobBackground from '../components/BlobBackground';
import { useRoute, RouteProp } from '@react-navigation/native';
import commonStyles from '../styles/commonStyles';

type RootStackParamList = {
  CelebrityInfo: {
    name: string;
    role: string;
    image: any;
    date: string;
    description: string;
  };
};

type CelebrityInfoRouteProp = RouteProp<RootStackParamList, 'CelebrityInfo'>;

const CelebrityInfo: React.FC = () => {
  const route = useRoute<CelebrityInfoRouteProp>();
  const { name, role, image, date, description } = route.params;

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const handleSelectTime = (time: string) => {
    setSelectedTime(prev => prev === time ? null : time);
  };

  const handleSelectTicket = (ticket: number) => {
    setSelectedTicket(prev => prev === ticket ? null : ticket);
  };

  const ticketPrice = 50; // Precio base por boleto
  const totalPrice = selectedTicket ? selectedTicket * ticketPrice : 0;

  return (
    <BlobBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image source={image} style={styles.image} />
          <Text style={styles.header}>{name}</Text>
          <Text style={styles.primaryText}>{role}</Text>
          <Text style={styles.description_centered}>{date}</Text>
          
          <Text style={styles.sectionHeader}>Select Time</Text>
          <View style={styles.timeSelectionContainer}>
            {['Morning', 'Afternoon'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time ? styles.selected : styles.unselected
                ]}
                onPress={() => handleSelectTime(time)}
              >
                <Text style={[
                  styles.timeButtonText,
                  selectedTime === time ? styles.selectedText : styles.unselectedText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionHeader}>Tickets</Text>
          <View style={styles.ticketSelectionContainer}>
            {[1, 2, 3, 4].map(ticket => (
              <TouchableOpacity key={ticket} style={[
                styles.ticketButton,
                selectedTicket === ticket ? styles.selected : styles.unselected
              ]} onPress={() => handleSelectTicket(ticket)}>
                <Text style={[
                  styles.ticketButtonText,
                  selectedTicket === ticket ? styles.selectedText : styles.unselectedText
                ]}>{ticket}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[
            styles.description_centered, 
            styles.textWithPadding]}>{description}</Text>
          <TouchableOpacity style={commonStyles.buttonContainer_rounded}>
            <Text style={styles.donateButtonText}>Donate (${totalPrice})</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    alignItems: 'center',
    padding: '5%',
  },
  image: {
    width: '60%', // Use percentages for width
    height: undefined,
    aspectRatio: 1, // Keep the image aspect ratio
    borderRadius: 20,
    marginBottom: '5%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  primaryText: {
    fontSize: 18,
    color: '#4D8D93',
  },
  description_centered: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: '2%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: '5%',
    marginBottom: '2%',
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  timeButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: '2%',
    borderRadius: 6,
  },
  unselected: {
    backgroundColor: 'transparent',
    borderColor: '#4D8D93',
    borderWidth: 1,
  },
  selected: {
    backgroundColor: '#4D8D93',
  },
  timeButtonText: {
    textAlign: 'center',
  },
  unselectedText: {
    color: '#4D8D93',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ticketSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '5%',
  },
  ticketButton: {
    width: '20%',
    paddingVertical: 10,
    borderRadius: 6,
  },
  ticketButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  donateButton: {
    marginTop: '5%',
    backgroundColor: '#4D8D93',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '60%',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textWithPadding: {
    paddingBottom: 30
  },
});

export default CelebrityInfo;
