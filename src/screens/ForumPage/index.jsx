import React from 'react';
import { SafeAreaView, StatusBar, View} from 'react-native';
import { style } from './styles';

function ForumPage(props) {

    return (
        <>
            <StatusBar hidden/>
            <SafeAreaView style={style.screen}>
                <View style={style.container}>

                </View>
            </SafeAreaView>
        </>
    );
}


export default ForumPage;