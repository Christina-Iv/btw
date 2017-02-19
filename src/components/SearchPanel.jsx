import React, { Component, PropTypes } from 'react';

const SearchPanel = (props) => {
    const { onChange, filter } = props;
    return (
        <input
            className="search-input"
            type="text"
            placeholder="Поиск контакта"
            onChange={onChange}
            value={filter} />
    );
};

SearchPanel.propTypes = {
    onChange: PropTypes.func,
    filter: PropTypes.string,
};

export default SearchPanel;
