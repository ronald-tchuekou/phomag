/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import axios from 'axios'
import { ENV } from './env'

export default axios.create({
   baseURL: ENV.base.url,
})
