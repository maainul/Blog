import React from 'react'

const Label = ({ name }) => {
    return (
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">{name}</label>
    )
}

export default Label
