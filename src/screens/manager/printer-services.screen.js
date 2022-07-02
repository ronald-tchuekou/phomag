import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppLoader, AppStatusBar, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import { Context as PrinterContext } from '../../contexts/printerServiceContext'
import { AddPersonSVG, EmptyPrinterSVG } from '../../svg'
import COLORS from '../../themes/colors'
import { default_profile } from '../../themes/images'
import SIZES from '../../themes/sizes'

const { width } = Dimensions.get('window')

const PrinterServices = ({ navigation }) => {

   const {
      state: { currentUserToken }
   } = React.useContext(AuthContext)

   const {
      state: {printersList },
      getPrinters,
      setCurrentPrinter
   } = React.useContext(PrinterContext)

   const [loading, setLoading] = React.useState(false)

   React.useEffect(() => {
      setLoading(true)
      getPrinters(currentUserToken, (error, res) => {
         setLoading(false)
         console.log(res)
      })
   }, [])

   const showDetails = React.useCallback((item) => {
      setCurrentPrinter(item, () => {
         navigation.navigate('PrinterServicesDetailsScreen')
      })
   }, [])

   const handleAddAction = React.useCallback(() => {
      navigation.navigate('PrinterServicesAddScreen')
   }, [])

   const reload = React.useCallback(() => {
      setLoading(true)
      getPrinters(currentUserToken, (error, res) => {
         setLoading(false)
         console.log(res)
      })
   }, [])

   return (
      <AppStatusBar>
         <Space />
         <View style={styles.line_between}>
            <Text style={styles.title}>Printer services manager</Text>
            <Pressable onPress={reload} android_ripple={{
               color: COLORS.DARK_200,
               borderless: true
            }}>
               <Ionicons name={'reload'} size={30} color={COLORS.DARK_300} />
            </Pressable>
         </View>
         {loading ? (
            <AppLoader />
         ) : printersList.length === 0 ? (
            <View style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center'
            }}>
               <Space />
               <EmptyPrinterSVG />
               <Space />
               <Space />
               <Text style={{
                  fontSize: SIZES.H5,
                  color: COLORS.SECOND,
                  fontWeight: 'bold',
                  paddingHorizontal: SIZES.DEFAULT_PADDING
               }}>No Printer Service Register !</Text>
               <Space />
               <Text style={{
                  fontSize: SIZES.H8,
                  color: COLORS.DARK_300,
                  textAlign: 'center',
                  paddingHorizontal: SIZES.DEFAULT_PADDING
               }}>To add new printer service, click to the Floating Action Button.</Text>
               <Space />
               <Space />
            </View>
         ) : (
            <FlatList
               data={printersList}
               keyExtractor={(item) => 'printer_' + item.printer_service_id}
               renderItem={({ item, index }) => (
                  <PrinterServiceItem onPress={showDetails} item={item} index={index} />
               )}
               style={{ flex: 1 }}
            />
         )}
         <View style={styles.fab_container}>
            <Pressable
               onPress={handleAddAction}
               android_ripple={{ color: COLORS.DARK_100 }}
               style={styles.fab}>
               <AddPersonSVG />
            </Pressable>
         </View>
      </AppStatusBar>
   )
}

export const PrinterServiceItem = ({ onPress, item, index }) => {
   const handlePress = React.useCallback(() => onPress(item), [item])
   const itemStyles = StyleSheet.create({
      container: {
         backgroundColor: COLORS.WHITE,
         borderRadius: 15,
         borderWidth: 1,
         borderColor: COLORS.DARK_100,
         marginHorizontal: SIZES.MEDIUM_MARGIN,
         marginTop: index === 0 ? SIZES.SMALL_MARGIN : 0,
         marginBottom: SIZES.SMALL_MARGIN,
         overflow: 'hidden'
      },
      content: {
         width: '100%',
         paddingHorizontal: SIZES.SMALL_PADDING,
         paddingVertical: SIZES.SMALL_PADDING,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center'
      },
      title: {
         width: width - 150,
         fontSize: SIZES.H7,
         color: COLORS.DARK_500,
         fontWeight: '700'
      },
      label: {
         fontSize: SIZES.H8,
         color: COLORS.DARK_300
      },
      profile: {
         height: 50,
         width: 50,
         borderRadius: 50,
         backgroundColor: COLORS.DARK_100,
         overflow: 'hidden'
      },
      profile_img: {
         width: '100%',
         height: '100%',
         borderRadius: 50
      }
   })
   return (
      <View style={itemStyles.container}>
         <Pressable
            onPress={handlePress}
            android_ripple={{ color: COLORS.DARK_200 }}
            style={itemStyles.content}>
            <View style={itemStyles.profile}>
               <Image source={default_profile} resizeMode={'contain'} style={itemStyles.profile_img} />
            </View>
            <View style={{ paddingLeft: SIZES.SMALL_PADDING }}>
               <Text style={itemStyles.title} numberOfLines={1}>
                  {item.service_name}
               </Text>
               <Text style={itemStyles.label}>{item.service_email}</Text>
            </View>
         </Pressable>
      </View>
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

PrinterServices.navigationOptions = () => ({
   headerShown: false
})

export default PrinterServices
