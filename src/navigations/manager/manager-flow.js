import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import BookingsFlow from './bookings-flow'
import HomeFlow from './home-flow'
import PrinterServicesFlow from './printer-services-flow'
import ProfileFlow from './profile-flow'

export const styles = StyleSheet.create({
   bottom_tab_container: {
      borderTopWidth: 1,
      borderTopColor: COLORS.DARK_100,
      backgroundColor: COLORS.WHITE,
      paddingHorizontal: 5,
      paddingVertical: 2,
      height: 55,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   bottom_tab_item: {
      display: 'flex',
      width: 60,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
   }
})

const tabBarComponent = (props) => {
   const { navigation } = props
   const index = navigation.state.index
   const icon_size = SIZES.ICON_SIZE

   function goTo(path) {
      navigation.navigate(path)
   }

   return (
      <View style={styles.bottom_tab_container}>
         <TabBarItem
            title={'Home'}
            onPress={() => goTo('HomeFlow')}
            icon={() => (
               <Svg
                  width={icon_size}
                  height={icon_size}
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  {index === 0 ? (
                     <Path
                        d='M13.1288 3.53458C13.5508 3.18889 14.0795 3 14.625 3C15.1705 3 15.6992 3.18889 16.1213 3.53458L24.3556 10.2483C24.6358 10.478 24.8614 10.7672 25.0161 11.0948C25.1708 11.4225 25.2507 11.7804 25.25 12.1427V24.3208C25.25 25.6627 24.18 26.7502 22.8594 26.7502H19.6719C18.3513 26.7502 17.2813 25.6627 17.2813 24.3208V18.469C17.2813 18.0221 16.925 17.6596 16.4844 17.6596H12.7656C12.3256 17.6596 11.9688 18.0221 11.9688 18.469V24.3214C11.9688 25.6633 10.8988 26.7508 9.57813 26.7508H6.39063C5.07063 26.7502 4 25.6627 4 24.3208V12.1427C3.99933 11.7804 4.07922 11.4225 4.23391 11.0948C4.38859 10.7672 4.61419 10.478 4.89438 10.2483L13.1288 3.53458Z'
                        fill={COLORS.PRIMARY} />
                  ) : (
                     <Path
                        d='M13.4084 3.4989C13.7372 3.17851 14.1725 3 14.625 3C15.0775 3 15.5128 3.17851 15.8416 3.4989L24.4195 11.8564C24.9507 12.373 25.25 13.0939 25.25 13.8459V24.0122C25.25 24.7383 24.9701 25.4347 24.472 25.9481C23.9739 26.4616 23.2982 26.75 22.5938 26.75H19.0521C18.7031 26.75 18.3576 26.6791 18.0352 26.5414C17.7128 26.4037 17.4199 26.2019 17.1732 25.9475C16.9265 25.6931 16.7309 25.391 16.5975 25.0587C16.4641 24.7263 16.3956 24.3701 16.3958 24.0104V19.4474C16.3958 19.2054 16.3025 18.9733 16.1365 18.8021C15.9705 18.631 15.7452 18.5348 15.5104 18.5348H13.7396C13.5048 18.5348 13.2795 18.631 13.1135 18.8021C12.9475 18.9733 12.8542 19.2054 12.8542 19.4474V24.0104C12.8542 24.7365 12.5743 25.4329 12.0762 25.9463C11.578 26.4597 10.9024 26.7482 10.1979 26.7482H6.65625C5.95177 26.7482 5.27614 26.4597 4.778 25.9463C4.27985 25.4329 4 24.7365 4 24.0104V13.8441C4 13.0921 4.30104 12.3712 4.83229 11.8546L13.4084 3.49525V3.4989ZM14.625 4.82399L6.04708 13.1834C5.96 13.2685 5.89061 13.3709 5.84312 13.4845C5.79563 13.5981 5.77104 13.7204 5.77083 13.8441V24.0104C5.77083 24.2524 5.86412 24.4845 6.03017 24.6557C6.19621 24.8268 6.42142 24.923 6.65625 24.923H10.1979C10.4327 24.923 10.658 24.8268 10.824 24.6557C10.99 24.4845 11.0833 24.2524 11.0833 24.0104V19.4474C11.0833 18.7213 11.3632 18.0249 11.8613 17.5115C12.3595 16.9981 13.0351 16.7096 13.7396 16.7096H15.5104C16.2149 16.7096 16.8905 16.9981 17.3887 17.5115C17.8868 18.0249 18.1667 18.7213 18.1667 19.4474V24.0104C18.1667 24.2524 18.26 24.4845 18.426 24.6557C18.592 24.8268 18.8173 24.923 19.0521 24.923H22.5938C22.8286 24.923 23.0538 24.8268 23.2198 24.6557C23.3859 24.4845 23.4792 24.2524 23.4792 24.0104V13.8441C23.4792 13.7201 23.4547 13.5974 23.4072 13.4835C23.3597 13.3696 23.2902 13.2668 23.2029 13.1815L14.625 4.82399Z'
                        fill={COLORS.DARK_200} />
                  )}
               </Svg>
            )}
            selected={index === 0}
         />
         <TabBarItem
            title={'Bookings'}
            onPress={() => goTo('BookingsFlow')}
            icon={() => (
               <Svg
                  width={icon_size}
                  height={icon_size}
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  {index === 1 ? (
                     <Path
                        d='M6 6C6 5.20435 6.31607 4.44129 6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3H21C21.7956 3 22.5587 3.31607 23.1213 3.87868C23.6839 4.44129 24 5.20435 24 6V22.5C24 22.8978 23.842 23.2794 23.5607 23.5607C23.2794 23.842 22.8978 24 22.5 24H7.5C7.5 24.3978 7.65804 24.7794 7.93934 25.0607C8.22064 25.342 8.60218 25.5 9 25.5H23.25C23.4489 25.5 23.6397 25.579 23.7803 25.7197C23.921 25.8603 24 26.0511 24 26.25C24 26.4489 23.921 26.6397 23.7803 26.7803C23.6397 26.921 23.4489 27 23.25 27H9C8.20435 27 7.44129 26.6839 6.87868 26.1213C6.31607 25.5587 6 24.7956 6 24V6ZM15 7.5C13.8675 7.5 12.792 7.7445 11.9715 8.22C11.151 8.697 10.5 9.4695 10.5 10.5C10.5 11.5305 11.151 12.303 11.9715 12.78C12.792 13.2555 13.8675 13.5 15 13.5C16.1325 13.5 17.208 13.2555 18.0285 12.78C18.849 12.303 19.5 11.5305 19.5 10.5C19.5 9.4695 18.849 8.697 18.0285 8.22C17.208 7.7445 16.1325 7.5 15 7.5ZM10.5465 13.548C10.5158 13.6543 10.5001 13.7644 10.5 13.875C10.5 14.325 10.773 14.7 10.995 14.94C11.247 15.213 11.5845 15.4725 11.9745 15.6975C12.8972 16.2208 13.9393 16.4972 15 16.5C16.182 16.5 17.247 16.146 18.0255 15.6975C18.4155 15.4725 18.753 15.213 19.0065 14.9415C19.227 14.7015 19.5 14.3265 19.5 13.875C19.4999 13.7644 19.4842 13.6543 19.4535 13.548C19.2366 13.7121 19.0097 13.8624 18.774 13.998C17.6236 14.6523 16.3234 14.9975 15 15C13.6764 14.9971 12.3762 14.6514 11.226 13.9965C10.9902 13.8616 10.7633 13.7118 10.5465 13.548ZM10.5465 16.548C10.5158 16.6543 10.5001 16.7644 10.5 16.875C10.5 17.325 10.773 17.7 10.995 17.94C11.2823 18.2395 11.6124 18.4948 11.9745 18.6975C12.8972 19.2208 13.9393 19.4972 15 19.5C16.182 19.5 17.247 19.146 18.0255 18.6975C18.4155 18.4725 18.753 18.213 19.0065 17.9415C19.227 17.7015 19.5 17.3265 19.5 16.875C19.4999 16.7644 19.4842 16.6543 19.4535 16.548C19.2367 16.7122 19.0098 16.8625 18.774 16.998C17.6236 17.6523 16.3234 17.9975 15 18C13.6765 17.997 12.3762 17.6513 11.226 16.9965C10.9902 16.8615 10.7633 16.7117 10.5465 16.548Z'
                        fill={COLORS.PRIMARY} />
                  ) : (
                     <Path
                        d='M6 24V6C6 5.20435 6.31607 4.44129 6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3H21C21.7956 3 22.5587 3.31607 23.1213 3.87868C23.6839 4.44129 24 5.20435 24 6V22.5C24 22.8978 23.842 23.2794 23.5607 23.5607C23.2794 23.842 22.8978 24 22.5 24H7.5C7.5 24.3978 7.65804 24.7794 7.93934 25.0607C8.22064 25.342 8.60218 25.5 9 25.5H23.25C23.4489 25.5 23.6397 25.579 23.7803 25.7197C23.921 25.8603 24 26.0511 24 26.25C24 26.4489 23.921 26.6397 23.7803 26.7803C23.6397 26.921 23.4489 27 23.25 27H9C8.20435 27 7.44129 26.6839 6.87868 26.1213C6.31607 25.5587 6 24.7956 6 24ZM22.5 6C22.5 5.60218 22.342 5.22064 22.0607 4.93934C21.7794 4.65804 21.3978 4.5 21 4.5H9C8.60218 4.5 8.22064 4.65804 7.93934 4.93934C7.65804 5.22064 7.5 5.60218 7.5 6V22.5H22.5V6ZM10.5 16.875C10.5007 16.7644 10.5164 16.6544 10.5465 16.548C10.764 16.713 10.992 16.863 11.226 16.998C12.3764 17.6523 13.6766 17.9975 15 18C16.473 18 17.7945 17.5605 18.774 16.9965C19.008 16.8615 19.236 16.7115 19.4535 16.548C19.4835 16.653 19.5 16.761 19.5 16.875C19.5 17.325 19.227 17.7 19.005 17.94C18.7177 18.2395 18.3877 18.4948 18.0255 18.6975C17.1028 19.2208 16.0607 19.4972 15 19.5C13.9392 19.4973 12.8971 19.2209 11.9745 18.6975C11.6119 18.4954 11.2813 18.2406 10.9935 17.9415C10.773 17.7 10.5 17.325 10.5 16.875ZM10.5465 13.548C10.5158 13.6543 10.5001 13.7644 10.5 13.875C10.5 14.325 10.773 14.7015 10.995 14.94C11.2823 15.2395 11.6124 15.4948 11.9745 15.6975C12.8972 16.2208 13.9393 16.4972 15 16.5C16.182 16.5 17.247 16.146 18.0255 15.6975C18.4155 15.4725 18.753 15.2145 19.0065 14.9415C19.227 14.7015 19.5 14.3265 19.5 13.8765C19.5 13.7654 19.4844 13.6548 19.4535 13.548C19.2366 13.7121 19.0097 13.8624 18.774 13.998C17.6236 14.6523 16.3234 14.9975 15 15C13.6764 14.9971 12.3762 14.6514 11.226 13.9965C10.9902 13.8616 10.7633 13.7117 10.5465 13.548ZM12 10.5C12 10.1805 12.189 9.828 12.7245 9.5175C13.2615 9.2055 14.061 9 15 9C15.939 9 16.7385 9.2055 17.2755 9.5175C17.811 9.828 18 10.1805 18 10.5C18 10.8195 17.811 11.172 17.2755 11.4825C16.7385 11.7945 15.939 12 15 12C14.061 12 13.2615 11.7945 12.7245 11.4825C12.189 11.172 12 10.8195 12 10.5ZM15 7.5C13.8675 7.5 12.792 7.7445 11.9715 8.22C11.151 8.697 10.5 9.4695 10.5 10.5C10.5 11.5305 11.151 12.303 11.9715 12.78C12.792 13.2555 13.8675 13.5 15 13.5C16.1325 13.5 17.208 13.2555 18.0285 12.78C18.849 12.303 19.5 11.5305 19.5 10.5C19.5 9.4695 18.849 8.697 18.0285 8.22C17.208 7.7445 16.1325 7.5 15 7.5Z'
                        fill={COLORS.DARK_200} />
                  )}
               </Svg>
            )}
            selected={index === 1}
         />
         <TabBarItem
            title={'Printers'}
            onPress={() => goTo('PrinterServicesFlow')}
            icon={() => (
               <Svg
                  width={icon_size}
                  height={icon_size}
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <Path
                     d='M22.179 18.3349C21.4013 17.2907 20.2908 16.5427 19.0308 16.2145L18.9916 16.206L18.0839 17.7382C18.0832 17.9422 18.0019 18.1377 17.8577 18.2819C17.7134 18.4262 17.5179 18.5075 17.3139 18.5081C16.8905 18.5081 16.544 18.1616 16.1398 17.1423V17.1176C16.1398 16.8624 16.0384 16.6176 15.858 16.4371C15.6775 16.2566 15.4327 16.1552 15.1774 16.1552C14.9222 16.1552 14.6774 16.2566 14.4969 16.4371C14.3164 16.6176 14.2151 16.8624 14.2151 17.1176V17.143V17.1415C13.7839 18.1616 13.4344 18.5073 13.0117 18.5073C12.8077 18.5067 12.6122 18.4254 12.4679 18.2811C12.3237 18.1369 12.2424 17.9414 12.2418 17.7374L11.3625 16.2022C10.0939 16.5249 8.97331 17.2707 8.18589 18.3164L8.17511 18.331C7.86299 18.8415 7.68919 19.4244 7.67082 20.0225V20.0279C7.67467 20.1434 7.67082 20.2781 7.67082 20.4128V21.9527C7.67082 22.361 7.83305 22.7527 8.12182 23.0415C8.41059 23.3303 8.80225 23.4925 9.21064 23.4925H21.1442C21.5526 23.4925 21.9443 23.3303 22.2331 23.0415C22.5218 22.7527 22.6841 22.361 22.6841 21.9527V20.4128C22.6841 20.2789 22.6802 20.1434 22.6841 20.0279C22.6647 19.423 22.4879 18.8337 22.1713 18.3179L22.1798 18.3333L22.179 18.3349ZM11.1346 9.09207C11.1346 11.3402 12.5359 14.6431 15.1767 14.6431C17.7713 14.6431 19.2187 11.3402 19.2187 9.09207V9.04203C19.2187 8.51122 19.1141 7.98561 18.911 7.49521C18.7079 7.00481 18.4102 6.55922 18.0348 6.18388C17.6595 5.80855 17.2139 5.51081 16.7235 5.30768C16.2331 5.10455 15.7075 5 15.1767 5C14.6459 5 14.1203 5.10455 13.6299 5.30768C13.1395 5.51081 12.6939 5.80855 12.3185 6.18388C11.9432 6.55922 11.6455 7.00481 11.4423 7.49521C11.2392 7.98561 11.1346 8.51122 11.1346 9.04203V9.09439V9.09207ZM19.7838 10.4163C19.7838 11.8807 20.6969 14.0334 22.4169 14.0334C24.1069 14.0334 25.05 11.8815 25.05 10.4163V10.3763C25.05 9.67774 24.7725 9.00781 24.2786 8.51386C23.7846 8.01992 23.1147 7.74242 22.4161 7.74242C21.7176 7.74242 21.0477 8.01992 20.5537 8.51386C20.0598 9.00781 19.7823 9.67774 19.7823 10.3763V10.4186V10.4163H19.7838ZM5.00154 11.6482C5.00154 13.1125 5.91465 15.2652 7.63463 15.2652C9.32458 15.2652 10.2677 13.1133 10.2677 11.6482V11.6081C10.2677 10.9096 9.99023 10.2397 9.49628 9.74572C9.00234 9.25177 8.33241 8.97428 7.63386 8.97428C6.93532 8.97428 6.26539 9.25177 5.77144 9.74572C5.2775 10.2397 5 10.9096 5 11.6081V11.6505V11.6482H5.00154Z'
                     fill={index === 2 ? COLORS.PRIMARY : COLORS.DARK_200} />
               </Svg>
            )}
            selected={index === 2}
         />
         <TabBarItem
            title={'Profile'}
            onPress={() => goTo('ProfileFlow')}
            icon={() => (
               <Svg
                  width={icon_size}
                  height={icon_size}
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  {index === 3 ? (
                     <Path
                        d='M5.625 26.25C5.625 26.25 3.75 26.25 3.75 24.375C3.75 22.5 5.625 16.875 15 16.875C24.375 16.875 26.25 22.5 26.25 24.375C26.25 26.25 24.375 26.25 24.375 26.25H5.625ZM15 15C16.4918 15 17.9226 14.4074 18.9775 13.3525C20.0324 12.2976 20.625 10.8668 20.625 9.375C20.625 7.88316 20.0324 6.45242 18.9775 5.39752C17.9226 4.34263 16.4918 3.75 15 3.75C13.5082 3.75 12.0774 4.34263 11.0225 5.39752C9.96763 6.45242 9.375 7.88316 9.375 9.375C9.375 10.8668 9.96763 12.2976 11.0225 13.3525C12.0774 14.4074 13.5082 15 15 15Z'
                        fill={COLORS.PRIMARY} />
                  ) : (
                     <Path
                        d='M15 15C16.4918 15 17.9226 14.4074 18.9775 13.3525C20.0324 12.2976 20.625 10.8668 20.625 9.375C20.625 7.88316 20.0324 6.45242 18.9775 5.39752C17.9226 4.34263 16.4918 3.75 15 3.75C13.5082 3.75 12.0774 4.34263 11.0225 5.39752C9.96763 6.45242 9.375 7.88316 9.375 9.375C9.375 10.8668 9.96763 12.2976 11.0225 13.3525C12.0774 14.4074 13.5082 15 15 15ZM18.75 9.375C18.75 10.3696 18.3549 11.3234 17.6516 12.0267C16.9484 12.7299 15.9946 13.125 15 13.125C14.0054 13.125 13.0516 12.7299 12.3483 12.0267C11.6451 11.3234 11.25 10.3696 11.25 9.375C11.25 8.38044 11.6451 7.42661 12.3483 6.72335C13.0516 6.02009 14.0054 5.625 15 5.625C15.9946 5.625 16.9484 6.02009 17.6516 6.72335C18.3549 7.42661 18.75 8.38044 18.75 9.375ZM26.25 24.375C26.25 26.25 24.375 26.25 24.375 26.25H5.625C5.625 26.25 3.75 26.25 3.75 24.375C3.75 22.5 5.625 16.875 15 16.875C24.375 16.875 26.25 22.5 26.25 24.375ZM24.375 24.3675C24.3731 23.9062 24.0863 22.5187 22.815 21.2475C21.5925 20.025 19.2919 18.75 15 18.75C10.7063 18.75 8.4075 20.025 7.185 21.2475C5.91375 22.5187 5.62875 23.9062 5.625 24.3675H24.375Z'
                        fill={COLORS.DARK_200} />
                  )}
               </Svg>
            )}
            selected={index === 3}
         />
      </View>
   )
}

export const TabBarItem = ({ title, icon, selected, onPress }) => {
   const item_styles = StyleSheet.create({
      text: {
         color: selected ? COLORS.PRIMARY : COLORS.DARK_200,
         textAlign: 'center',
         fontSize: 10
      }
   })
   return (
      <Pressable android_ripple={{
         color: COLORS.PRIMARY_25,
         borderless: true
      }} onPress={onPress}>
         <View style={styles.bottom_tab_item}>
            {icon()}
            <Text style={item_styles.text}>{title}</Text>
         </View>
      </Pressable>
   )
}

const ManagerFlow = createBottomTabNavigator({
   HomeFlow,
   BookingsFlow,
   PrinterServicesFlow,
   ProfileFlow
}, {
   tabBarComponent
})

export default ManagerFlow