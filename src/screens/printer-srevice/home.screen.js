import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, RequestItem, Space } from '../../components'
import { NotificationSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const HomeScreen = ({ navigation }) => {

   const [loading, setLoading] = React.useState(false)
   const [content, setContent] = React.useState([])

   React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         setContent([
            { id: 'id1', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
            { id: 'id2', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Pending' },
            { id: 'id3', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
            { id: 'id4', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Pending' },
            { id: 'id5', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
            { id: 'id6', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Pending' },
            { id: 'id7', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Pending' },
            { id: 'id8', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Printed' },
            { id: 'id9', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Pending' },
            { id: 'id10', title: 'TD sheet N° 12', date: 'Lundi, 20 Juin 2022', status: 'Printed' }
         ])
      }, 800)
   }, [])

   const showDetails = React.useCallback(() => {
      navigation.navigate('RequestDetailsScreen')
   }, [])

   const showNotifications = React.useCallback(() => {
      navigation.navigate('NotificationsScreen')
   }, [])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>Recent requests</Text>
            <Pressable
               onPress={showNotifications}
               android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}
               style={styles.notification}>
               <NotificationSVG />
               <View style={styles.notification_label}>
                  <Text style={styles.notification_text}>10</Text>
               </View>
            </Pressable>
         </View>
         {loading ? (
            <AppLoader />
         ) : (
            <FlatList
               data={content}
               keyExtractor={(item, index) => 'item' + item.id + index}
               renderItem={({ item, index }) => (
                  <RequestItem onPress={showDetails} item={item} index={index} />
               )} />
         )}
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   container: {
      padding: SIZES.MEDIUM_PADDING
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING
   },
   notification: {
      position: 'relative',
      padding: 2
   },
   notification_label: {
      position: 'absolute',
      top: -3,
      right: -5,
      borderRadius: 50,
      backgroundColor: COLORS.ERROR,
      paddingHorizontal: 3,
      paddingVertical: 1
   },
   notification_text: {
      color: COLORS.WHITE,
      fontSize: 12
   }
})

HomeScreen.navigationOptions = () => ({
   headerShown: false
})

export default HomeScreen