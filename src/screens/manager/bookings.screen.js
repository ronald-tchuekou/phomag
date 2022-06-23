import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, RequestItem, Space } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const BookingsScreen = ({ navigation }) => {

   const [current, setCurrent] = React.useState('Pending')
   const [loading, setLoading] = React.useState(false)
   const [content, setContent] = React.useState([])

   React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         setContent([
            { id: 'id1', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id2', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id3', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id4', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id5', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id6', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id7', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id8', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id9', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current },
            { id: 'id10', title: 'TD sheet N° 12 (Mr John Doe)', date: 'Lundi, 20 Juin 2022', status: current }
         ])
      }, 5000)
   }, [current])

   const showDetails = React.useCallback(() => {
      navigation.navigate('RequestDetailsScreen')
   }, [])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>All requests with status</Text>
         </View>
         <View style={styles.header_nav}>
            <ButtonNav
               onPress={() => setCurrent('Pending')}
               title={'Pending'}
               selected={current === 'Pending'}
            />
            <ButtonNav
               onPress={() => setCurrent('Validate')}
               title={'Validate'}
               selected={current === 'Validate'}
            />
            <ButtonNav
               onPress={() => setCurrent('Printed')}
               title={'Printed'}
               selected={current === 'Printed'}
            />
            <ButtonNav
               onPress={() => setCurrent('Cancel')}
               title={'Cancel'}
               selected={current === 'Cancel'}
            />
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

const ButtonNav = ({ title, selected, onPress }) => {
   const btn_style = StyleSheet.create({
      container: {
         textAlign: 'center',
         paddingVertical: 4,
         borderRadius: 5,
         paddingHorizontal: SIZES.SMALL_PADDING,
         marginHorizontal: SIZES.SMALL_MARGIN,
         marginVertical: 5,
         backgroundColor: selected ? COLORS.WARNING : COLORS.DARK_200,
         fontSize: SIZES.H9
      },
      text: {
         color: COLORS.WHITE
      }
   })
   return (
      <Pressable
         android_ripple={{
            color: COLORS.DARK_100
         }}
         style={btn_style.container}
         onPress={onPress}>
         <Text style={btn_style.text}>{title}</Text>
      </Pressable>
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
   header_nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingTop: 5,
      paddingBottom: SIZES.SMALL_PADDING
   }
})

BookingsScreen.navigationOptions = () => ({
   headerShown: false
})

export default BookingsScreen