import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { AppStatusBar } from '../../components'
import { AddRequestSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const HomeScreen = ({ navigation }) => {

   const handleAddAction = React.useCallback(() => {
      navigation.navigate('AddRequestScreen')
   }, [])

   return (
      <AppStatusBar>
         <View style={styles.fab_container}>
            <Pressable
               onPress={handleAddAction}
               android_ripple={{ color: COLORS.DARK_100 }}
               style={styles.fab}>
               <AddRequestSVG h={35} w={35} />
            </Pressable>
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING
   },
   fab_container: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderRadius: 500,
      overflow: 'hidden',
      elevation: 10
   },
   fab: {
      height: 60,
      width: 60,
      borderRadius: 500,
      elevation: 10,
      backgroundColor: COLORS.PRIMARY,
      justifyContent: 'center',
      alignItems: 'center'
   }
})

HomeScreen.navigationOptions = () => ({
   headerShown: false
})

export default HomeScreen