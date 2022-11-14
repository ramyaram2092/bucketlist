import { StyleSheet, View, ImageBackground} from 'react-native';
import homepic from '../assets/home_2.jpg'


export function Restaurants() {
  return (
    <View style={styles.restaurants}>
      <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>
      </ImageBackground>

    </View>

  )

}

const styles = StyleSheet.create({

  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 2.0,

  },
  text: {
    color: "white",
    fontSize: 30,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#000000c0",
  },

  restaurants: {
    flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        justifyContent: 'center',

  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
  }

});
