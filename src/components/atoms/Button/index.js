import MuiButton from '@mui/material/Button'
import PropTypes from 'prop-types'

export const buttonVariant = {
    DEFAULT: "contained",
    OUTLINED: "outlined",
};

function Button(props) {
    if (props.blank && props.link) {
        return (
            <MuiButton type={props.type}  sx={{textTransform:'none', fontSize:14, fontWeight:600, width:'100%'}} variant={props.variant} color="primary" onClick={props.onClick} size={props.size} disabled={props.disabled}>
                {props.children}
            </MuiButton>
        )
    } else {
        return (
                <MuiButton type={props.type} sx={{textTransform:'none', fontSize:14, fontWeight:600, width:'100%'}} variant={props.variant} color="primary" onClick={props.onClick} size={props.size}disabled={props.disabled}>
                    {props.children}
                </MuiButton>
        )
    }
}

Button.defaultProps = {
    variant: buttonVariant.DEFAULT,
    size: 'small',
    type : '',
    disabled:false
};

Button.propTypes = {
    variant: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;
