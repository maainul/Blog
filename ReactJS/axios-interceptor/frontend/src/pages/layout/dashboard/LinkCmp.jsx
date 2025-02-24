import React from 'react'
import { Link } from 'react-router-dom'

const LinkCmp = ({url,name}) => {
    return (
        <Link to={url} className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white hover:text-blue-500 md:p-0">{name}</Link>
    )
}

export default LinkCmp
