import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { db } from "../firebase";

export default function AddScreen() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addBooking = async () => {
    if (!name || !service || !date || !time) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        name,
        service,
        date,
        time,
        status: "Pending"
      });

      Alert.alert("Success", "Booking Added!");

      setName("");
      setService("");
      setDate("");
      setTime("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Add Laundry Appointment
      </Text>

      <TextInput
        placeholder="Customer Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Service (Wash, Dry, Fold)"
        value={service}
        onChangeText={setService}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={setTime}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Add Booking" onPress={addBooking} />
    </View>
  );
}