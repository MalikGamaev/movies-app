import { Alert } from 'antd'
import React from 'react'

import './Error.css'

function Error() {
  return (
    <div className="error">
      <Alert type="error" description="Не удалось получить киношки!" />
    </div>
  )
}

export default Error
