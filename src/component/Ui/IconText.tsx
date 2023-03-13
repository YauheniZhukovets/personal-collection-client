import React, { createElement } from 'react'

import { Space } from 'antd'

export const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)
