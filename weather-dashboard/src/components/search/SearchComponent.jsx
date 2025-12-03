
import { useCallback } from 'react';
import './SearchComponent.css';

const SearchComponent = (props) => {

    const { onSearchChange, placeholder, value } = props;

    const handleSearchTextChange = (e) => {
        onSearchChange?.(e.target.value);
    };

    return (
        <input
            id="filled-search"
            className={'search'}
            type="search"
            value={value}
            placeholder={placeholder}
            onChange={handleSearchTextChange}

        />
    )
}

export default SearchComponent