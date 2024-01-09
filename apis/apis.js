import * as baseApis from "./api/baseApi"
import * as gftApis from "./api/gftApi"
import * as h5Apis from "./api/h5Api.js"

import { isGFT, isH5 } from "../common/config.js"
let api = baseApis
if (isH5)
  api = h5Apis
if (isGFT)
  api = gftApis

export default api