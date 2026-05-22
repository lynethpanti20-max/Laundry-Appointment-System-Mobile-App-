import { Button, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Laundry Booking App
      </Text>

      <Button
        title="Add Booking"
        onPress={() => navigation.navigate("Add")}
      />
    </View>
  );
}