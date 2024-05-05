// BlobBackground.tsx
import React, { ReactNode } from 'react';
import { View, Image, StyleSheet } from 'react-native';



interface BlobBackgroundProps {
    children: ReactNode;
  }
  
  const BlobBackground: React.FC<BlobBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Background blobs */}
        <Image
        source={require('../assets/IMG/Blobs/OrangeBlob.png')}
        style={[styles.blob, styles.blobTopLeft]}
        resizeMode="cover"
        />
        <Image
        source={require('../assets/IMG/Blobs/OrangeBlob.png')}
        style={[styles.blob, styles.blobTopLeft]}
        resizeMode="cover"
        />
        <Image
        source={require('../assets/IMG/Blobs/GreenBlob.png')}
        style={[styles.blob, styles.blobBottomRight]}
        resizeMode="cover"
        />
      {/* Foreground content */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // White background or other color
  },
  blob: {
    position: 'absolute',
    width: 400,
    height: 300,
  },
  blobTopLeft: {
    top: -50,
    left: -50,
  },
  blobBottomRight: {
    bottom: -100,
    right: -30,
  },
});

export default BlobBackground;
