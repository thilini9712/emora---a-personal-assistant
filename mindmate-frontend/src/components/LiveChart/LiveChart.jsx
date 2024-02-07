import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import "./LiveChart.css"
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import axios from "axios";
import HomeMood from "../homeMood/HomeMood";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)
const LiveChartNew = ({width, setClassname, displaying, displays}) => {
    const [chartData, setChartData] = useState({})
    const [loopId, setLoopId] = useState();
    const accessToken: string | null = localStorage.getItem("loggedUserToken");
    // eslint-disable-next-line
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("http://18.143.151.234:8080/api/user/emotion", {headers}) //18.143.151.234
            setChartData({
                labels: data.body.reverse().map((item) => item.time),
                datasets: [
                    {
                        label: "Emotion",
                        data: data.body.reverse().map((item) => item.emotionId),
                        // fill: true,
                        borderColor: "rgb(99,177,255)",
                        backgroundColor: "rgba(79,81,185,0)"
                    }
                ]
            })
            // console.log()
            setLoopId(data.body.reverse()[0].emotionId)
        }

        fetchData();
    }, [headers]);


    // console.log(chartData)
    return (
        <>
            <div style={{display: displays}}>
                <div style={{width: width, marginLeft: "10px", marginTop: "20px"}}>
                    <div className={setClassname}>
                        <div className="">
                            {chartData && chartData.datasets && (
                                <Line
                                    data={chartData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: displaying}}>
                <HomeMood moodId={loopId}/>
            </div>

        </>

    );
};

export default LiveChartNew;