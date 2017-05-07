// react
import React from 'react';

// components
import ProfileInfoPane
from './panes/profile/panes/ProfileInfoPane/ProfileInfoPane';

import ProfilePackagesPane
from './panes/profile/panes/ProfilePackagesPane/ProfilePackagesPane';

import ProfileTransfersPane
from './panes/profile/panes/ProfileTransfersPane/ProfileTransfersPane';

import ProfileAccountPane
from './panes/profile/panes/ProfileAccountPane/ProfileAccountPane';

const panes = {
    info: {
        title: 'Info',
        visible: true,
        content: <ProfileInfoPane />,
    },

    packages: {
        title: 'Packages',
        visible: true,
        content: <ProfilePackagesPane />,
    },

    transfers: {
        title: 'Transfers',
        visible: true,
        content: <ProfileTransfersPane />,
    },

    account: {
        title: 'Account',
        visible: true,
        content: <ProfileAccountPane />,
    },
};

export default panes;