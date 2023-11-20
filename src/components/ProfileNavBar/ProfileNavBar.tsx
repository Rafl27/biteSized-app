import './ProfileNavBar.css'

const ProfileNavBar = ({ setActiveOption }) => {
    return (
        <>
            <ul className="nav-options">
                <li className="buttons"><button onClick={() => setActiveOption('stories')}>Stories Created</button></li>
                <li className="buttons"><button onClick={() => setActiveOption('votes')}>Votes</button></li>
            </ul>
        </>
    )
}

export default ProfileNavBar