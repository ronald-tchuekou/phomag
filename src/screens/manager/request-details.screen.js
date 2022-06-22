import React from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { AppStatusBar, RequestConfirmationModal, Space, Status } from '../../components'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'

const { width } = Dimensions.get('window')

const RequestDetailsScreen = ({ navigation }) => {
   const confirm_ref = React.useRef(null)

   const documents = [
      { id: 'doc1', name: 'Introduction to AI', page_num: 120 },
      { id: 'doc2', name: 'Introduction to data programming', page_num: 12 },
      { id: 'doc3', name: 'Introduction to data manning', page_num: 52 }
   ]

   const back = React.useCallback(() => navigation.pop(), [])

   const showDoc = React.useCallback(() => {
      // TODO
   }, [])

   const onConfirm = React.useCallback((status) => {
      // TODO
      console.log(status)
   }, [])

   const cancel = React.useCallback(() => {
      confirm_ref.current.show('Are you sure you want to cancel this request?')
   }, [])

   const validate = React.useCallback(() => {
      confirm_ref.current.show('Are you sure you want to validate this request?')
   }, [])

   return (
      <AppStatusBar>
         <View style={styles.line_between}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Pressable onPress={back} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <Svg
                     width='40'
                     height='40'
                     viewBox='0 0 30 30'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                     <Path
                        d='M17.2875 23.75C17.1008 23.7506 16.9162 23.7094 16.7475 23.6294C16.5788 23.5493 16.4301 23.4325 16.3125 23.2875L10.275 15.7875C10.0911 15.5638 9.99064 15.2833 9.99064 14.9937C9.99064 14.7042 10.0911 14.4236 10.275 14.2L16.525 6.69998C16.7372 6.44471 17.0421 6.28418 17.3726 6.2537C17.7031 6.22323 18.0322 6.32531 18.2875 6.53748C18.5428 6.74965 18.7033 7.05454 18.7338 7.38507C18.7642 7.71561 18.6622 8.04471 18.45 8.29998L12.8625 15L18.2625 21.7C18.4154 21.8835 18.5124 22.1069 18.5423 22.3438C18.5721 22.5808 18.5335 22.8213 18.4309 23.0369C18.3284 23.2526 18.1662 23.4344 17.9635 23.5607C17.7609 23.6871 17.5263 23.7528 17.2875 23.75Z'
                        fill={COLORS.DARK_500} />
                  </Svg>
               </Pressable>
               <Text style={[styles.title, { paddingHorizontal: 10, width: width - 170 }]} numberOfLines={1}>Request
                  details</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Pressable onPress={cancel} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <Svg
                     width='35'
                     height='35'
                     viewBox='0 0 30 30'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                     <Path
                        d='M11.25 6.25H8.75C8.08696 6.25 7.45107 6.51339 6.98223 6.98223C6.51339 7.45107 6.25 8.08696 6.25 8.75V23.75C6.25 24.413 6.51339 25.0489 6.98223 25.5178C7.45107 25.9866 8.08696 26.25 8.75 26.25H21.25C21.913 26.25 22.5489 25.9866 23.0178 25.5178C23.4866 25.0489 23.75 24.413 23.75 23.75V8.75C23.75 8.08696 23.4866 7.45107 23.0178 6.98223C22.5489 6.51339 21.913 6.25 21.25 6.25H18.75'
                        stroke={COLORS.DARK_500}
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round' />
                     <Path
                        d='M16.25 3.75H13.75C12.3693 3.75 11.25 4.86929 11.25 6.25C11.25 7.63071 12.3693 8.75 13.75 8.75H16.25C17.6307 8.75 18.75 7.63071 18.75 6.25C18.75 4.86929 17.6307 3.75 16.25 3.75Z'
                        stroke={COLORS.DARK_500}
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round' />
                     <Path
                        d='M12.5 15L17.5 20M17.5 15L12.5 20'
                        stroke={COLORS.DARK_500}
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round' />
                  </Svg>
               </Pressable>
               <Pressable onPress={validate} android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true
               }}>
                  <Svg
                     width='35'
                     height='35'
                     viewBox='0 0 30 30'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                     <Path
                        d='M11.25 6.25H8.75C8.08696 6.25 7.45107 6.51339 6.98223 6.98223C6.51339 7.45107 6.25 8.08696 6.25 8.75V23.75C6.25 24.413 6.51339 25.0489 6.98223 25.5178C7.45107 25.9866 8.08696 26.25 8.75 26.25H21.25C21.913 26.25 22.5489 25.9866 23.0178 25.5178C23.4866 25.0489 23.75 24.413 23.75 23.75V8.75C23.75 8.08696 23.4866 7.45107 23.0178 6.98223C22.5489 6.51339 21.913 6.25 21.25 6.25H18.75M11.25 6.25C11.25 6.91304 11.5134 7.54893 11.9822 8.01777C12.4511 8.48661 13.087 8.75 13.75 8.75H16.25C16.913 8.75 17.5489 8.48661 18.0178 8.01777C18.4866 7.54893 18.75 6.91304 18.75 6.25M11.25 6.25C11.25 5.58696 11.5134 4.95107 11.9822 4.48223C12.4511 4.01339 13.087 3.75 13.75 3.75H16.25C16.913 3.75 17.5489 4.01339 18.0178 4.48223C18.4866 4.95107 18.75 5.58696 18.75 6.25M11.25 17.5L13.75 20L18.75 15'
                        stroke={COLORS.DARK_500}
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round' />
                  </Svg>
               </Pressable>
            </View>
         </View>
         <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { marginTop: 5 }]}>
               <View style={[styles.line, { paddingBottom: 5 }]}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>Emit by : </Text>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500, fontWeight: '700' }}>John Doe</Text>
               </View>
               <View style={styles.line}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>Class : </Text>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500, fontWeight: '700' }}>ICH 254</Text>
               </View>
            </View>
            <Space />
            <View style={styles.container}>
               <View style={[styles.line, { paddingBottom: 5 }]}>
                  <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_500 }}>TD sheet N° 12</Text>
                  <Status status={'Pending'} />
               </View>
               <Text style={{ fontSize: SIZES.H7, color: COLORS.DARK_300 }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at dicta eius eveniet inventore
                  ipsam iste iure nemo nisi numquam pariatur placeat porro unde ut vel velit, voluptates voluptatibus
                  voluptatum!
               </Text>
               <View style={[styles.line, { paddingTop: 5 }]}>
                  <Text style={{ fontSize: SIZES.H8, color: COLORS.PRIMARY }}>12 copies to print</Text>
                  <Text style={{ fontSize: SIZES.H8, color: COLORS.DARK_200 }}>Lundi, 20 Juin 2022</Text>
               </View>
            </View>
            <Space />
            <Text style={styles.subTitle}>Document list</Text>
            <View style={[styles.container]}>
               {documents.map(item => (
                  <Pressable
                     onPress={showDoc}
                     android_ripple={{
                        color: COLORS.DARK_100
                     }}
                     key={item.id}
                     style={styles.doc_container}>
                     <Svg
                        width='50'
                        height='50'
                        viewBox='0 0 30 30'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <Path
                           d='M10.3556 23.295C10.6181 23.1413 10.905 22.9913 11.2162 22.8488C10.9533 23.2408 10.6717 23.62 10.3725 23.985C9.8475 24.6169 9.43875 24.9525 9.18187 25.0575C9.16055 25.0665 9.13862 25.074 9.11625 25.08C9.09754 25.054 9.08122 25.0264 9.0675 24.9975C8.9625 24.7913 8.96625 24.5925 9.1425 24.3225C9.34125 24.0131 9.74062 23.6588 10.3556 23.295ZM14.9587 20.2069C14.7356 20.2538 14.5144 20.3006 14.2912 20.3531C14.6217 19.7056 14.9344 19.0491 15.2287 18.3844C15.5251 18.9336 15.8442 19.4703 16.185 19.9931C15.7781 20.0531 15.3675 20.1244 14.9587 20.2069ZM19.6931 21.9675C19.4019 21.7326 19.1292 21.4756 18.8775 21.1988C19.305 21.2081 19.6912 21.24 20.025 21.3C20.6194 21.4069 20.8987 21.5756 20.9962 21.6919C21.027 21.7244 21.0444 21.7672 21.045 21.8119C21.0384 21.9442 20.9998 22.0728 20.9325 22.1869C20.8947 22.2782 20.834 22.3583 20.7562 22.4194C20.7175 22.4431 20.6719 22.453 20.6269 22.4475C20.4581 22.4419 20.1431 22.3238 19.6931 21.9675ZM15.5212 13.0688C15.4462 13.5263 15.3187 14.0513 15.1462 14.6231C15.0827 14.409 15.027 14.1926 14.9794 13.9744C14.8369 13.3125 14.8162 12.7931 14.8931 12.4331C14.9644 12.1013 15.0994 11.9681 15.2606 11.9025C15.3471 11.8644 15.4387 11.8391 15.5325 11.8275C15.5569 11.8838 15.585 12 15.5925 12.1988C15.6019 12.4275 15.5794 12.7181 15.5212 13.0706V13.0688Z'
                           fill='#FF2727' />
                        <Path
                           fillRule='evenodd'
                           clipRule='evenodd'
                           d='M7.5 0H17.4244C17.9216 0.000106195 18.3985 0.19772 18.75 0.549375L25.7006 7.5C26.0523 7.85155 26.2499 8.32838 26.25 8.82562V26.25C26.25 27.2446 25.8549 28.1984 25.1516 28.9016C24.4484 29.6049 23.4946 30 22.5 30H7.5C6.50544 30 5.55161 29.6049 4.84835 28.9016C4.14509 28.1984 3.75 27.2446 3.75 26.25V3.75C3.75 2.75544 4.14509 1.80161 4.84835 1.09835C5.55161 0.395088 6.50544 0 7.5 0V0ZM17.8125 2.8125V6.5625C17.8125 7.05978 18.01 7.53669 18.3617 7.88832C18.7133 8.23996 19.1902 8.4375 19.6875 8.4375H23.4375L17.8125 2.8125ZM7.80937 25.6275C7.97813 25.965 8.24063 26.2706 8.63063 26.4131C9.01875 26.5537 9.40313 26.4881 9.71813 26.3569C10.3144 26.1131 10.9088 25.5394 11.4544 24.8831C12.0788 24.1313 12.735 23.145 13.3688 22.0519C14.5922 21.6892 15.8452 21.4345 17.1131 21.2906C17.6756 22.0087 18.2569 22.6275 18.8194 23.0719C19.3444 23.4844 19.95 23.8275 20.5706 23.8538C20.9087 23.8705 21.2434 23.7799 21.5269 23.595C21.8175 23.4056 22.0331 23.1319 22.1906 22.815C22.3594 22.4756 22.4625 22.1212 22.4494 21.7594C22.4375 21.4026 22.3053 21.0603 22.0744 20.7881C21.6506 20.2819 20.9569 20.0381 20.2744 19.9163C19.4465 19.788 18.6064 19.7566 17.7712 19.8225C17.066 18.8255 16.451 17.7675 15.9338 16.6612C16.4025 15.4237 16.7531 14.2537 16.9087 13.2975C16.9762 12.8888 17.0119 12.4988 16.9987 12.1463C16.9964 11.7964 16.915 11.4515 16.7606 11.1375C16.6717 10.9642 16.5453 10.8129 16.3906 10.6945C16.2359 10.5761 16.0568 10.4937 15.8663 10.4531C15.4875 10.3725 15.0975 10.4531 14.7394 10.5975C14.0325 10.8787 13.6594 11.4788 13.5188 12.1406C13.3819 12.7781 13.4438 13.5206 13.605 14.2706C13.77 15.0319 14.0512 15.8606 14.4113 16.6987C13.8354 18.1309 13.1704 19.5255 12.42 20.8744C11.4537 21.1784 10.5223 21.5838 9.64125 22.0837C8.9475 22.4963 8.33062 22.9837 7.95937 23.5594C7.56562 24.1706 7.44375 24.8981 7.80937 25.6275Z'
                           fill='#FF2727' />
                     </Svg>
                     <View style={{ padding: 5 }}>
                        <Text style={styles.doc_name}>{item.name}</Text>
                        <Text style={styles.doc_sub_name}>{item.page_num} pages</Text>
                     </View>
                  </Pressable>
               ))}
            </View>
            <RequestConfirmationModal onConfirm={onConfirm} ref={confirm_ref}/>
         </ScrollView>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_800,
      fontWeight: 'bold'
   },
   subTitle: {
      color: COLORS.DARK_800,
      fontWeight: 'bold',
      fontSize: SIZES.H6,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingBottom: 4
   },
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      overflow: 'hidden',
      padding: SIZES.SMALL_PADDING
   },
   line_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: SIZES.MEDIUM_PADDING,
      paddingHorizontal: SIZES.MEDIUM_PADDING,
      paddingBottom: SIZES.SMALL_PADDING
   },
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   doc_container: {
      flexDirection: 'row',
      paddingVertical: 5
   },
   doc_name: {
      fontSize: SIZES.H7,
      fontWeight: 'bold',
      color: COLORS.DARK_800
   },
   doc_sub_name: {
      fontSize: SIZES.H8,
      color: COLORS.DARK_300
   }
})

RequestDetailsScreen.navigationOptions = () => ({
   headerShown: false
})

export default RequestDetailsScreen