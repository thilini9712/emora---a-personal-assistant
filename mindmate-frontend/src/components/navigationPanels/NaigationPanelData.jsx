import React from "react";
import {
    Albums,
    AlbumsOutline,
    Calendar,
    CalendarOutline,
    Fitness,
    FitnessOutline,
    Home,
    HomeOutline,
    Settings,
    SettingsOutline
} from "react-ionicons";

export const NavigationPanelData = [
    {
        title: 'Home',
        path: '/',
        iconVisibility: true,
        icon: <HomeOutline
            color={'#c0c0c0'}
            title={"Home"}
            height="40px"
            width="40px"
        />,
        iconActive:
            <Home
                color={'#ffffff'}
                title={"Home"}
                height="40px"
                width="40px"
            />,
        subItems: []
    },
    {
        title: 'EmotionTracker',
        path: '/emotion-tracker',
        iconVisibility: true,
        icon: <FitnessOutline
            color={'#c0c0c0'}
            title={"EmotionTracker"}
            height="40px"
            width="40px"
        />,
        iconActive:
            <Fitness
                color={'#ffffff'}
                title={"Emotion Tracker"}
                height="40px"
                width="40px"
            />,
        subItems: []
    },
    {
        title: 'Scheduler',
        path: '/scheduler',
        iconVisibility: true,
        icon: <CalendarOutline
            color={'#c0c0c0'}
            title={"Scheduler"}
            height="40px"
            width="40px"
        />,
        iconActive:
            <Calendar
                color={'#ffffff'}
                title={"Scheduler"}
                height="40px"
                width="40px"
            />,
        subItems: []
    },
    {
        title: 'Settings',
        path: '/settings',
        iconVisibility: true,
        icon: <SettingsOutline
            color={'#c0c0c0'}
            title={"Settings"}
            height="40px"
            width="40px"
        />,
        iconActive:
            <Settings
                color={'#ffffff'}
                title={"Settings"}
                height="40px"
                width="40px"
            />,
        subItems: []
    },
    {
        title: 'Dataset',
        path: '/data-Set',
        iconVisibility: false,
        icon: <AlbumsOutline
            color={'#c0c0c0'}
            title={"Dataset"}
            height="40px"
            width="40px"
        />,
        iconActive:
            <Albums
                color={'#ffffff'}
                title={"Dataset"}
                height="40px"
                width="40px"
            />,
        subItems: []
    }

]
export const MNavigationPanelData = [
    {
        title: 'Home',
        path: '/',
        iconVisibility: true,
        color: '#c0c0c0',
        icon: <HomeOutline
            color={'#c0c0c0'}
            title={"Home"}
            height="25px"
            width="25px"
        />,
        // colorActive: '#ffffff',
        iconActive:
            <Home
                color={'#ffffff'}
                title={"Home"}
                height="25px"
                width="25px"
            />,
        subItems: []
    },
    {
        title: 'EmotionTracker',
        path: '/emotion-tracker',
        iconVisibility: true,
        icon: <FitnessOutline
            color={'#c0c0c0'}
            title={"EmotionTracker"}
            height="25px"
            width="25px"
        />,
        iconActive:
            <Fitness
                color={'#ffffff'}
                title={"Emotion Tracker"}
                height="25px"
                width="25px"
            />,
        subItems: []
    },
    {
        title: 'Scheduler',
        path: '/scheduler',
        iconVisibility: true,
        icon: <CalendarOutline
            color={'#c0c0c0'}
            title={"Scheduler"}
            height="25px"
            width="25px"
        />,
        iconActive:
            <Calendar
                color={'#ffffff'}
                title={"Scheduler"}
                height="25px"
                width="25px"
            />,
        subItems: []
    },
    {
        title: 'Settings',
        path: '/settings',
        iconVisibility: true,
        icon: <SettingsOutline
            color={'#c0c0c0'}
            title={"Settings"}
            height="25px"
            width="25px"
        />,
        iconActive:
            <Settings
                color={'#ffffff'}
                title={"Settings"}
                height="25px"
                width="25px"
            />,
        subItems: []
    }
]