import { MdCookie } from 'react-icons/md';
import { GiPlagueDoctorProfile } from 'react-icons/gi';
import { BiTrendingUp } from 'react-icons/bi';
import { IoIosCreate } from 'react-icons/io';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const items = [
    { name: 'BiteSized', icon: MdCookie, link: '/home' },
    {
        name: user ? user.name : 'Profile',
        icon: GiPlagueDoctorProfile,
        link: '/profile',
    },
    { name: 'Trending', icon: BiTrendingUp, link: '/trending' },
    { name: 'Create', icon: IoIosCreate, link: '/create' },
    { name: 'Logout', icon: RiLogoutBoxRLine, onClick: handleLogout },
];

export default items;