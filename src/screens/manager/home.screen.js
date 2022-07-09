import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, NotificationButton, RequestItem, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { Context as RequestContext } from '../../contexts/requestContext'
import { Context as AuthContext } from '../../contexts/authContext'
import { empty_requrest } from '../../themes/images'

const HomeScreen = ({ navigation }) => {
   const [loading, setLoading] = React.useState(false)

   const {
      state: { currentUserToken },
   } = React.useContext(AuthContext)

   const {
      state: { requestsList },
      getValidatorRequests,
      setCurrentRequest,
   } = React.useContext(RequestContext)

   React.useEffect(() => {
      setLoading(true)
      getValidatorRequests(currentUserToken, null, (error, res) => {
         setLoading(false)
         if (error) {
            console.log(error)
            return
         }
      })
   }, [])

   const showDetails = React.useCallback((item) => {
      setCurrentRequest(item, (error, res) => {
         if (error) {
            console.log(error)
            return
         }
         navigation.navigate('RequestDetailsScreen')
      })
   }, [])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>Recent requests</Text>
            <NotificationButton />
         </View>
         {loading ? (
            <AppLoader />
         ) : requestsList.length === 0 ? (
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 250,
               }}
            >
               <Image source={empty_requrest} resizeMode="contain" style={{ width: 200, height: 200 }} />
               <Text
                  style={{
                     fontSize: SIZES.H6,
                     color: COLORS.DARK_300,
                     paddingHorizontal: SIZES.DEFAULT_PADDING,
                     textAlign: 'center',
                  }}
               >
                  No request to show here!.
               </Text>
            </View>
         ) : (
            <FlatList
               data={requestsList}
               keyExtractor={(item, index) => 'item' + item.id + index}
               renderItem={({ item, index }) => (
                  <RequestItem onPress={() => showDetails(item)} item={item} index={index} />
               )}
            />
         )}
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
   },
   container: {
      padding: SIZES.MEDIUM_PADDING,
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING,
   },
})

HomeScreen.navigationOptions = () => ({
   headerShown: false,
})

export default HomeScreen
