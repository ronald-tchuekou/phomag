/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { io } from 'socket.io-client'

export const socket = io('https://detect-presence.herokuapp.com')
