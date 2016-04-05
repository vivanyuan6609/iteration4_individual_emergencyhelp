var React = require('react');

var UserList = React.createClass({
    render : function(){
        var userNode = this.props.data.map(function(user){
            return (
                <div className="item">
                      {(() => {
                        switch (user.status) {
                          case 0:  return (<img className="ui avatar image" src="/images/ok.png"/>);
                          case 1:  return (<img className="ui avatar image" src="/images/help.png"/>);
                          case 2:  return (<img className="ui avatar image" src="/images/danger.png"/>);
                          default: return (<img className="ui avatar image" src="/images/unset.png"/>);
                        }
                      })()}
                    <div className="content">
                        <a href={"/chats/to/" + user.id} className="header">{user.username}</a>
                        <div className="description">@{user.location}</div>
                    </div>
                </div>
            );
        });
        return (
            <div className="ui list" id="users">
                {userNode}
            </div>
        );
    }
});

module.exports = UserList;