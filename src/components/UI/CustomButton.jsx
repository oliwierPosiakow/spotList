import {Pressable, Text, StyleSheet} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from "../../constants/colors";

function CustomButton({icon, onPress, text}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed] }>
            <FontAwesome5 name={icon} size={20} color={COLORS.primary} />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export  default CustomButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 7,
        gap: 10,
    },
    pressed: {
        opacity: .7,
    },
    text: {
        color: COLORS.primary,
        fontWeight: "bold"
    }
})