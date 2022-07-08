import React from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, RequestItem, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import { Context as RequestContext } from '../../contexts/requestContext'
import { Context as AuthContext } from '../../contexts/authContext'
import { Image } from 'react-native'
import { empty_requrest } from '../../themes/images'

const BookingsScreen = ({ navigation }) => {
   const [current, setCurrent] = React.useState('PENDING')
   const [loading, setLoading] = React.useState(false)

   const {
      state: { currentUserToken, currentUser },
   } = React.useContext(AuthContext)

   const {
      state: { pendingRequestsList, validateRequestsList, cancelRequestsList, printedRequestsList },
      getAuthorRequests,
      getValidatorRequests,
      setCurrentRequest,
   } = React.useContext(RequestContext)

   React.useEffect(() => {
      setLoading(true)
      if (currentUser.role === 'Chief')
         getValidatorRequests(currentUserToken, current, (error, res) => {
            setLoading(false)
            if (error) console.log(error)
         })
      else
         getAuthorRequests(currentUserToken, current, (error, res) => {
            setLoading(false)
            if (error) console.log(error)
         })
   }, [current])

   const showDetails = React.useCallback(
      (item) => {
         setCurrentRequest(item, () => {
            navigation.navigate('RequestDetailsScreen', { status: current })
         })
      },
      [current]
   )

   const content = React.useMemo(() => {
      switch (current) {
         case 'PENDING':
            return pendingRequestsList

         case 'VALIDATE':
            return validateRequestsList

         case 'PRINTED':
            return printedRequestsList

         case 'CANCELED':
            return cancelRequestsList

         default:
            return []
      }
   }, [current, pendingRequestsList, validateRequestsList, cancelRequestsList, printedRequestsList])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>All requests with status</Text>
         </View>
         <ScrollView
            style={{
               flexGrow: 0,
               flexShrink: 0,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
         >
            <View style={styles.header_nav}>
               <ButtonNav onPress={() => setCurrent('PENDING')} title={'Pending'} selected={current === 'PENDING'} />
               <ButtonNav onPress={() => setCurrent('VALIDATE')} title={'Validate'} selected={current === 'VALIDATE'} />
               <ButtonNav onPress={() => setCurrent('PRINTED')} title={'Printed'} selected={current === 'PRINTED'} />
               <ButtonNav onPress={() => setCurrent('CANCELED')} title={'Cancel'} selected={current === 'CANCELED'} />
            </View>
         </ScrollView>
         {loading ? (
            <AppLoader />
         ) : content.length === 0 ? (
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
               <Text
                  style={{
                     fontSize: SIZES.H7,
                     color: COLORS.DARK_200,
                     paddingHorizontal: SIZES.DEFAULT_PADDING,
                     textAlign: 'center',
                  }}
               >
                  Click on Floating Action Button at home screen to add new request.
               </Text>
            </View>
         ) : (
            <FlatList
               data={content}
               keyExtractor={(item, index) => 'item' + item.id + index}
               renderItem={({ item, index }) => (
                  <RequestItem onPress={() => showDetails(item)} item={item} index={index} />
               )}
            />
         )}
      </AppStatusBar>
   )
}

export const ButtonNav = ({ title, selected, onPress }) => {
   const btn_style = StyleSheet.create({
      container: {
         textAlign: 'center',
         paddingVertical: 4,
         borderRadius: 5,
         paddingHorizontal: SIZES.SMALL_PADDING,
         marginHorizontal: SIZES.SMALL_MARGIN,
         marginVertical: 5,
         backgroundColor: selected ? COLORS.WARNING : COLORS.DARK_200,
         fontSize: SIZES.H9,
      },
      text: {
         color: COLORS.WHITE,
      },
   })
   return (
      <Pressable
         android_ripple={{
            color: COLORS.DARK_100,
         }}
         style={btn_style.container}
         onPress={onPress}
      >
         <Text style={btn_style.text}>{title}</Text>
      </Pressable>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold',
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING,
   },
   header_nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingTop: 5,
      paddingBottom: SIZES.SMALL_PADDING,
   },
})

BookingsScreen.navigationOptions = () => ({
   headerShown: false,
})

export default BookingsScreen
