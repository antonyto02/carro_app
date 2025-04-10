import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 16,
        marginTop: 15,
    },
    time: {
        fontSize: 20,
        fontWeight: '600',
    },
    });

export default HomeStyles; 