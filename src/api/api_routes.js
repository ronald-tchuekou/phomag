/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

const API_ROUTES = {
   SOCKET_URI: 'https://detect-presence.herokuapp.com',
   SIGNUP: '/auth/signup',
   SIGNING: '/auth/login',
   VERIFY_USER_EMAIL: '/auth/pass-forgot',
   RESET_USER_PASSWORD: 'auth/reset-password',
   UPDATE_PASS: 'auth/update-password',
   GET_FIlES: '/files',
   GET_PERSONNEL: '/personnel',
   UPDATE_USER_IMG: '/auth/updateimage',
   GET_PLANNING: '/planning',
   GET_PAID_TAUX: '/paid-taux'
}

export default API_ROUTES
