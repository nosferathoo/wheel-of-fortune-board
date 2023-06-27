import './Team.css';

const Team = (props) => {
    return <div className={`Team Team${props.team} ${props.active?'active':''}`}>
        <input className="TeamName" onFocus={props.onFocus} onBlur={props.onBlur} spellCheck="false" />
        <div className="ScoreDisplay">{props.score}</div>
    </div>;
}

export default Team;