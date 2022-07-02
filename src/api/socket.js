/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { io } from 'socket.io-client'
import API_ROUTES from './api_routes'

export const socket = io(API_ROUTES.SOCKET_URI)
