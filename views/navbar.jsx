var React = require('react');

var Navbar = React.createClass({
    render: function(){
        return (
            <div className="ui inverted menu">
                <a className="active red item" id="usernow">{this.props.usernow}</a>
                <a className="item" href="/main">Main</a>
                <a className="item" href="/announcement">Announcement</a>
                <a className="item" href="/users/status">Share Status</a>
                <a className="item" href="/chats">Public Chatroom</a>
                <a className="item" href="/search">Search</a>
                <a className="item" href="/users/logout">Logout</a>
                <a className="active red item" href="/emergency">emergency</a>
                <div id="noti_Container">
                    <div id="note"></div>
                </div>
                <a className="active yellow item" href="/help">HELP</a>
                <div id="noti_Container2">
                    <div id="note1"></div>
                </div>
            </div>
        )
    }
});

module.exports = Navbar;