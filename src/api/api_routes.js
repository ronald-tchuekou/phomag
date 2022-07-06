/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

const API_ROUTES = {
   SOCKET_URI: 'https://phomag-api.herokuapp.com',
   SIGNUP: '/auth/signup',
   SIGNING: '/auth/sing-in',
   VERIFY_USER_EMAIL: '/auth/pass-forgot/:email',
   RESET_USER_PASSWORD: '/auth/reset-password',
   UPDATE_PASS: '/user/update-password',
   GET_FIlES: '/files',
   GET_USER: '/user',
   GET_REQUEST: '/request',
   GET_PRINTER_SERVICE: '/printer-service',
   UPDATE_USER_IMG: '/auth/updateimage',
   GET_PLANNING: '/planning',
   GET_PAID_TAUX: '/paid-taux',
   GET_PLAGES: '/availability',
}

export default API_ROUTES
