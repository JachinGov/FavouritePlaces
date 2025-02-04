import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('');

    function changeTitleHandler(enterendText) {
        setEnteredTitle(enterendText);
    }

    return (
        <ScrollView style={styles.form} >
            <View>
                <Text style={styles.labels} >Title</Text>
                <TextInput 
                style={styles.inputs}
                onChangeText={changeTitleHandler} 
                value={enteredTitle} />
            </View>
            <ImagePicker />
            <LocationPicker/>
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    labels: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1aacf0',
    },
    inputs: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: '#0570c9',
        borderBottomWidth: 2,
        backgroundColor: '#a0defb',
    },
}); 