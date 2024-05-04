import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import BlobBackground from '../components/BlobBackground';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define the navigation params type
type RootStackParamList = {
  CelebrityInfo: {
    name: string;
    role: string;
    image: any;  // Assume image is imported locally
    date: string;
    description: string;
  };
};

type CelebrityInfoRouteProp = RouteProp<RootStackParamList, 'CelebrityInfo'>;

const CelebrityInfo: React.FC = () => {
  const route = useRoute<CelebrityInfoRouteProp>();
  const { name, role, image, date, description } = route.params;

  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  // Toggle selection for time
  const toggleTime = (time: string) => {
    setSelectedTime(selectedTime === time ? '' : time);
  };

  // Toggle selection for tickets
  const toggleTicket = (ticket: number) => {
    setSelectedTicket(selectedTicket === ticket ? null : ticket);
  };

  return (
    <BlobBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image source={image} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.timetableContainer}>
            {['Afternoon', 'Evening'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeButton, selectedTime === time && styles.selectedButton]}
                onPress={() => toggleTime(time)}
              >
                <Text style={styles.buttonText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.ticketContainer}>
            {[1, 2, 3, 4].map((ticket) => (
              <TouchableOpacity
                key={ticket}
                style={[styles.ticketButton, selectedTicket === ticket && styles.selectedButton]}
                onPress={() => toggleTicket(ticket)}
              >
                <Text style={styles.buttonText}>{ticket}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.donateButton}>
            <Text style={styles.donateButtonText}>Donate (--$)</Text>
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
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  timetableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  ticketButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
  selectedButton: {
    color: '#f5f5f5',
    backgroundColor: '#4D8D93',  
},
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  donateButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#4D8D93',
    borderRadius: 6,
  },
  donateButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  }
});

export default CelebrityInfo;
