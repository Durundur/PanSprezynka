import React from "react";
import searchIcon from './icons8-search.svg'
import './TopBar.css'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { searchInputVal: '' }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
        this.handelEnter = this.handelEnter.bind(this)
    }
    handleInputChange(event) {
        this.setState({ searchInputVal: event.target.value })
    }
    submitSearch() {
        this.props.onSearchSubmit(this.state.searchInputVal)
        this.setState({ searchInputVal: '' })
    }
    handelEnter(e) {
        if (e.key === 'Enter') this.submitSearch()
    }
    // handleSortChange(event) {
    //     this.setState({ sortOrder: event.target.value })
    // }
    render() {
        return (
            <div className="top-bar">
                <span className='top-bar__input'>
                    <input className='search-input' onKeyDown={this.handelEnter} type={'text'} list={'streamers'} placeholder='Wyszukaj' value={this.state.searchInputVal} onChange={this.handleInputChange}></input>
                    <datalist id="streamers">
                        <option>bonkol</option>
                        <option>kalach444</option>
                        <option>kasix</option>
                        <option>ewroon</option>
                        <option>inet_saju</option>
                        <option>spiralusgtm</option>
                        <option>lewus</option>
                        <option>summit1g</option>
                        <option>rockalone</option>
                        <option>urqueeen</option>
                        <option>adamcy_</option>
                        <option>h2p_gucio</option>
                        <option>maailinh</option>
                        <option>stazjaa</option>
                        <option>izakooo</option>
                        <option>losiugra</option>
                    </datalist>
                    <img className='search-icon' alt='wyszukaj' onClick={this.submitSearch} src={searchIcon}></img>
                </span>
                <span className='top-bar__sort'>
                    {/* <select onChange={this.handleSortChange} value={this.state.sortOrder}>
                  <option value={'oldToNew'}>od najstarszych</option>
                  <option value={'newToOld'}>od najnowszych</option>
                </select> */}
                </span>
            </div>
        )
    }
}

export default TopBar