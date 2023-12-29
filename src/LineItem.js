import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className='item'>
        <input 
            type="checkbox"
            onChange={() => handleCheck(item.id)}
            checked={ item.checked }
            id='checkBox'
        />
        <label 
            htmlFor="checkBox"
            onDoubleClick={() => handleCheck(item.id)}
            style={(item.checked) ? {color: 'blue', fontWeight: 'bold'} : null}
        
        >{item.item}</label>

        {/* Adding a font awesome icon to serve as delete button instead of traditional button */}
        <FaTrashAlt 
            role="button" 
            tabIndex="0"
            onClick={() => handleDelete(item.id)}
            aria-label={`Delete ${item.item}`}
        /> 
    </li>
  )
}

export default LineItem