import './ProfileNavBar.css'

const ProfileNavBar = () => {
    return (
        <>
            <ul className="nav-options">
                <li className="buttons"><button className="active">Stories Created</button></li>
                <li className="buttons"><button>Votes</button></li>
            </ul>
        </>
    )
}

export default ProfileNavBar