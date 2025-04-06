import { Input } from 'antd'
import React from 'react'
import './SearchForm.css'

function SearchForm({ searchName, onChange }) {
  return (
    <div>
      <Input value={searchName} onChange={onChange} placeholder="Напиши название фильма!" />
    </div>
  )
}

export default SearchForm
