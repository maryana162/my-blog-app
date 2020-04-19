import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons'

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context)

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        return () => {
            listener.remove()
        }
    }, [])

    return(
        <View>
            <FlatList 
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({ item }) => {
                    return(
                        <TouchableOpacity onPress={() => {navigation.navigate('Show', {id: item.id})}}>
                            <View style={styles.rowStyle}>
                                <Text style={styles.titleStyle}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => {deleteBlogPost(item.id)}}>
                                    <Feather style={styles.iconStyle} name="trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => 
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather style={styles.plusStyle} name="plus"/>
        </TouchableOpacity> 
    }
}

const styles = StyleSheet.create({
    rowStyle: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 20,
        borderTopWidth:1,
        borderColor: "gray"        
    },
    titleStyle: {
        fontSize: 18
    },
    iconStyle: {
        fontSize: 24
    },
    plusStyle:{
        fontSize:30,
        marginRight: 10
    }
})

export default IndexScreen