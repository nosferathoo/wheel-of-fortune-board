import './Letter.css';

function Letter(props)
{
    return <div className={`Letter ${props.shown?"shown":"hidden"}`}>{props.letter}</div>;
}

export default Letter;