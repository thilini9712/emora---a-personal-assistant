import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./MainLayOut";
import '../App.css'
import SignIn from "../view/signIn/SignIn";
import Welcome from "../view/welcomePage/Welcome"
import Home from "../view/home/Home";
import EmotionTracker from "../view/emotionTracker/EmotionTracker";
import Settings from "../view/settings/Settings";
import DataSet from "../view/dataSet/DataSet";
import Scheduler from "../view/scheduler/Scheduler";
import ReminderCalender from "../components/reminderCalender/ReminderCalender"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <Home/>
                    },
                    {
                        path: 'emotion-tracker',
                        element: <EmotionTracker />
                    },
                    {
                        path: "scheduler",
                        element: <Scheduler/>
                    },
                    {
                        path: "settings",
                        element: <Settings />
                    },
                    {
                        path: "data-Set",
                        element: <DataSet />
                    },
                    {
                        path: "reminderCalender",
                        element: <ReminderCalender />
                    },

                ]
            }
        ],
    },
    {
        path: "signIn",
        element: <SignIn />
    },
    {
        path: "welcome",
        element: <Welcome />
    },
])
const AppRouter = (props) => {
    return (
            <RouterProvider router={router}/>
    );
}

export default AppRouter;