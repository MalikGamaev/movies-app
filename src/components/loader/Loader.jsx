import { Spin } from 'antd'
import React from 'react'

import './Loader.css'

function Loader() {
  return (
    <div className="loader">
      <Spin />
    </div>
  )
}

export default Loader
