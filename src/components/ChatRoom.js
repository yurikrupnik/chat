import React, {Component} from 'react';
import FormHelpers, {validationFunctions} from './Form/Classes';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {mapToProps as sessionMapToProps, dispatchActions as sessionActions} from '../store/config/session/selectors';

import socket from '../socket/client';

const CardExampleWithAvatar = (props) => (
    <Card>
        <CardHeader
            title={props.nickname}
            avatar={props.avatar}
        />
        <CardText className={props.className}>
            {props.message}
        </CardText>
    </Card>
);

CardExampleWithAvatar.propTypes = {
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    className: PropTypes.string
};

class ChatRoom extends Component {
    // TODO set propTypes and tests - break into smaller parts
    constructor(props) {
        super(props);
        this.socket = socket;
        this.state = {
            value: '',
            messages: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.resetValue = this.resetValue.bind(this);
    }

    componentDidMount() {
        const {session, history, actions} = this.props;
        if (!session.nickname) {
            history.push('/register');
        }

        this.socket.on('receiveMessage', (newMessage) => {
            console.log('actions', actions);
            this.setState(prevState => ({messages: prevState.messages.concat(newMessage)}), () => {
                global.window.scrollBy(0, global.document.getElementsByClassName('list')[0].offsetHeight)
            });
            // or with redux action - has bug - sends 2 messages to the connection of webpack dev server
            // actions.messages.setNewMessage(newMessage);
        });
    }

    handleChange(event) {
        const {target} = event;
        const {value} = target;
        this.setState((prevState, prevProps) => ({value}));
    }

    resetValue() {
        this.setState(prevState => ({value: ''}));
    }

    handleKeyDown(event) {
        if (event.which === 13) {
            const {value} = this.state;
            this.socket.emit('newMessage', value, this.resetValue);
        }
    }

    render() {
        let {messages, value} = this.state;
        let {session} = this.props;
        return <div style={{minHeight: '100%'}}>
            <h3 className={'header'}>Chat</h3>
            <div className={'list'}>
                {messages.map((message, i) => {
                    const className = session.nickname === message.nickname ? 'bg-own' : '';
                    return (
                        <CardExampleWithAvatar key={i} className={className}  {...message}/>
                    )
                })}
            </div>
            <div className={'footer'}>
                <TextField fullWidth={true}
                           id={'message'}
                           value={value}
                           floatingLabelText="Message"
                           onKeyDown={this.handleKeyDown}
                           onChange={this.handleChange}
                />
            </div>
        </div>
    }
}

const combinedMapTpProps = state => {
    return {
        session: sessionMapToProps(state),
    }
};

const combinedDispatchActions = dispatch => ({
    actions: {
        // session: sessionActions(dispatch),
    }
});

export default connect(combinedMapTpProps, combinedDispatchActions)(ChatRoom);
