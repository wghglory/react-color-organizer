/**
 * 3 messages, display 1 message at a single time, the others mark 'x'. Every second message switches.
 * componentWillReceiveProps: when parent props change, child component componentWillReceiveProps will invoke
 * it's the only place that can setState for updating life events. 
 * Other updating events like shouldComponentUpdate, componentWillUpdate, componentDidUpdate cannot setState
 */
import React from 'React';
import PropTypes from 'prop-types';

class HiddenMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: (props.hide) ? props.hide : true
        };

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }

    hide() {
        const hidden = true;
        this.setState({ hidden });
    }

    show() {
        const hidden = false;
        this.setState({ hidden });
    }

    // parent HiddenMessages state showing is changing every second, so the prop hide={(i !== showing)} changes,
    // child HiddenMessage doesn't know this and won't update state unless using `componentWillReceiveProps`
    componentWillReceiveProps(nextProps) {
        this.setState({ hidden: nextProps.hide });
    }

    render() {
        const { children } = this.props;
        const { hidden } = this.state;
        return (
            <p onMouseEnter={this.show}
                onMouseLeave={this.hide}>
                {(hidden) ?
                    children.replace(/[a-zA-Z0-9]/g, "x") :
                    children
                }
            </p>
        );
    }

}
HiddenMessage.propTypes = {
    hide: PropTypes.bool,
    children: PropTypes.string.isRequired
};

export default class HiddenMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                "The crow crows after midnight",
                "Bring a watch and dark clothes to the spot",
                "Jericho Jericho Go"
            ],
            showing: -1
        };
    }

    // componentDidMount ok as well
    componentWillMount() {
        this.interval = setInterval(() => {
            let { showing, messages } = this.state;
            showing = (++showing >= messages.length) ?
                -1 :
                showing;
            this.setState({ showing });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { messages, showing } = this.state;
        return (
            <div className="hidden-messages">
                {messages.map((message, i) =>
                    <HiddenMessage key={i}
                        hide={(i !== showing)}>
                        {message}
                    </HiddenMessage>
                )}
            </div>
        );
    }
}