import {Pressable, StyleSheet} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

function IconButton({icon, color, size, action}) {

    return (
        <Pressable onPress={action} style={({pressed}) => [styles.button, pressed && styles.pressed]} >
            <FontAwesome5 name={icon} size={size} color={color} />
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: {
        opacity: .8
    }
})