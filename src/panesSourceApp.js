const baseUrl = process.env.PUBLIC_URL;

/* https://upload.wikimedia.org/wikipedia/commons/2/2b/CERN_UA5_-_ppbar_interaction_at_540GeV.jpg */
const cloudchamber = 'static/images/cloudchamber_small.jpg';
/* https://pixabay.com/en/science-fiction-beijing-building-1989816/ */
const building = 'static/images/building_small.jpg';
/* https://upload.wikimedia.org/wikipedia/commons/9/9f/Hubble%E2%80%99s_modern_art.jpg */
const hubble = 'static/images/hubble_small.jpg';
/* https://c2.staticflickr.com/8/7319/8730255464_529c6aea39_z.jpg */
const maze = 'static/images/maze.jpg';
/* https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png/665px-PSM_V87_D113_Arrangement_of_atoms_in_a_rock_salt_crystal.png */
const atoms = 'static/images/atoms.png';
/* https://c1.staticflickr.com/2/1291/4709904302_6a27e8a579_b.jpg */
const pneumonitis = 'static/images/pneumonitis_small.jpg';
/* https://upload.wikimedia.org/wikipedia/commons/5/56/2006-08-15_-_Road_Trip_-_Day_23_-_United_States_-_California_-_San_Francisco_-_Trolley_Wires_-_Black_4889418922.jpg */
const wires = 'static/images/wires_small.jpg';
/* https://pixabay.com/en/motherboard-circuit-diagram-circuit-152501/ */
const motherboard = 'static/images/motherboard.svg';

const panes = {
    home: {
        title: 'Home',
        visible: true,
        background: cloudchamber,
        backgroundStyle: {
            opacity: 0.1,
            filter: 'saturate(0%)',
            backgroundImage: 'url(' + cloudchamber + ')',
        },
    },

    search: {
        title: 'Search',
        visible: true,
        backgroundStyle: {
            opacity: 0.15,
            filter: 'saturate(0%)',
            backgroundImage: 'url(' + hubble + ')',
        },
    },

    forum: {
        title: 'Forum',
        visible: true,
        backgroundStyle: {
            opacity: 0.1,
            filter: 'saturate(20%)',
            backgroundImage: 'url(' + building + ')',
        },
    },

    about: {
        title: 'About',
        visible: true,
        backgroundStyle: {
            opacity: 0.05,
            backgroundImage: 'url(' + atoms + ')',
        },
    },

    login: {
        title: 'Login',
        visible: true,
        backgroundStyle: {
            opacity: 0.05,
            backgroundImage: 'url(' + wires + ')',
        },
    },

    profile: {
        title: 'Profile',
        visible: false,
        backgroundStyle: {
            opacity: 0.125,
            filter: 'saturate(15%)',
            backgroundImage: 'url(' + motherboard + ')',
        },
    },
};

export default panes;