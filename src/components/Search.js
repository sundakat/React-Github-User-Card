import React from 'react';

class Search extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.searchUser}>
                <input
                    placeholder='Search GitHub Users'
                    type='text'
                    value={this.props.searchResult}
                    onChange={this.props.handleChanges}
                    name='userSearch'
                />
                <button>Search</button>
            </form>
        )
    }
}

export default Search;