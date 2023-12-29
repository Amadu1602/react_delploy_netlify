import React from 'react'

const Header = ({ title }) => {
    // create header objects instead of placing them in the element
    const headerStyle = {
        backgroundColor: 'mediumblue',
        color: '#fff'
    };

    return (
        <header style={ headerStyle }>
            <h1>{ title }</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Default title"
}

export default Header