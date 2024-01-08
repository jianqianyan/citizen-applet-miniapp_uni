import * as baseApis from "./api/baseApi"
import * as gftApis from "./api/gftApi"

import { isGFT } from "../common/config.js"
const api = isGFT ? gftApis : baseApis

export default api