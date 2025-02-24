import React from 'react'

const Input = ({type,name,id,placeholder,onChange}) => {
  return (
        <input
            type={type}
            name={name}
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder={placeholder}
            onChange={onChange}
             required
        />
  )
}

export default Input
