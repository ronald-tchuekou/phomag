import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, ChartProgress, RequestItem } from '../../components'
import { AddRequestSVG, NotificationSVG } from '../../svg'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { Context as RequestContext } from '../../contexts/requestContext'
import { Context as AuthContext } from '../../contexts/authContext'

const HomeScreen = ({ navigation }) => {
   const [loading, setLoading] = React.useState(false)
   const [content, setContent] = React.useState([])
   const [value, setValue] = React.useState(0)

   const {
      state: { currentUserToken },
   } = React.useContext(AuthContext)

   const { getAuthorRequests } = React.useContext(RequestContext)

   React.useEffect(() => {
      setLoading(true)
      setValue(0)
      getAuthorRequests(currentUserToken, null, (error, res) => {
         setLoading(false)
         if (error) {
            console.log(error)
            return
         }
         setContent(res)
      })
   }, [])

   const showDetails = React.useCallback(() => {
      navigation.navigate('RequestDetailsScreen')
   }, [])

   const handleAddAction = React.useCallback(() => {
      navigation.navigate('AddRequestScreen')
   }, [])

   const showNotifications = React.useCallback(() => {
      navigation.navigate('NotificationsScreen')
   }, [])

   return (
      <AppStatusBar>
         <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
               <View
                  style={{
                     width: 200,
                     height: 200,
                  }}
               >
                  <ChartProgress value={value} />
               </View>
               <View style={styles.progress_container}>
                  <Text style={styles.progress_indicator}>{value}%</Text>
                  <Text style={styles.progress_description}>used</Text>
               </View>
               <View style={styles.notification_container}>
                  <Pressable
                     onPress={showNotifications}
                     android_ripple={{
                        color: COLORS.DARK_200,
                        borderless: true,
                     }}
                     style={styles.notification}
                  >
                     <NotificationSVG />
                     <View style={styles.notification_label}>
                        <Text style={styles.notification_text}>10</Text>
                     </View>
                  </Pressable>
               </View>
            </View>
            <Text style={styles.subTitle}>Recent requests</Text>
            <View style={{ flex: 1 }}>
               {loading ? (
                  <AppLoader />
               ) : (
                  <>
                     {content.map((item, index) => {
                        return (
                           <RequestItem
                              key={'item' + item.request_id + index}
                              onPress={showDetails}
                              item={item}
                              index={index}
                           />
                        )
                     })}
                  </>
               )}
            </View>
         </ScrollView>
         <View style={styles.fab_container}>
            <Pressable onPress={handleAddAction} android_ripple={{ color: COLORS.DARK_100 }} style={styles.fab}>
               <AddRequestSVG h={35} w={35} />
            </Pressable>
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   header: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 250,
      position: 'relative',
   },
   progress_indicator: {
      fontSize: 50,
      fontWeight: 'bold',
      color: COLORS.PRIMARY,
   },
   progress_description: {
      color: COLORS.PRIMARY,
      fontSize: 20,
   },
   progress_container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
   },
   subTitle: {
      color: COLORS.DARK_800,
      fontWeight: 'bold',
      fontSize: SIZES.H6,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingBottom: 4,
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING,
   },
   fab_container: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderRadius: 500,
      overflow: 'hidden',
      elevation: 10,
   },
   fab: {
      height: 60,
      width: 60,
      borderRadius: 500,
      elevation: 10,
      backgroundColor: COLORS.PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
   },
   notification_container: {
      position: 'absolute',
      top: 30,
      right: 30,
   },
   notification: {
      position: 'relative',
      padding: 2,
   },
   notification_label: {
      position: 'absolute',
      top: -3,
      right: -5,
      borderRadius: 50,
      backgroundColor: COLORS.ERROR,
      paddingHorizontal: 3,
      paddingVertical: 1,
   },
   notification_text: {
      color: COLORS.WHITE,
      fontSize: 12,
   },
})

HomeScreen.navigationOptions = () => ({
   headerShown: false,
})

export default HomeScreen
