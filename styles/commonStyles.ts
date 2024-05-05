// commonStyles.ts
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description_centered: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  description_left: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginVertical: 10,
  },
  primaryText: {
    color: '#4D8D93',
    fontSize: 18,
    textAlign: 'center',
  },
  textContainer: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20, // Increased font size
    lineHeight: 54, // Aligns text vertically within the container
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer_rounded: {
    backgroundColor: '#4D8D93', // Color de fondo del botón
    borderRadius: 25,          // Bordes redondeados
    paddingVertical: 10,       // Padding vertical
    paddingHorizontal: 100,     // Padding horizontal
    alignItems: 'center',      // Centra el texto horizontalmente
    justifyContent: 'center',  // Centra el texto verticalmente
  },
  boldlabelforbutton: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default commonStyles;
