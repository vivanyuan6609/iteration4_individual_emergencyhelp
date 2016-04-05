var React = require('react');

var StatusForm = React.createClass({
    render: function() {
        return (
            <form id={this.props.name} method="post" action={this.props.method} className="ui large form">
                <h3 className="ui header">Once elect status, all users will see your status</h3>
                <select id="statusselect" className="ui dropdown" name="status">
                    <option value="3">I dont want to share my status</option>
                    <option value="0">I'm OK now.</option>
                    <option value="1">I need help but not urgent.</option>
                    <option value="2">I need urgent help!</option>
                </select>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="home icon" />
                        <input type="text" id="location" placeholder="location" name="location" />
                    </div>
                </div>
                <button  id="statusbutton" type="submit" className="ui fluid teal submit button">Submit</button>
                <script type="text/javascript" src="http://127.0.0.1:3000/js/emergency.js"></script>
                <a href="/main"><button className="ui red button">Cancel</button></a>
            </form>
    )}
});


module.exports = StatusForm;