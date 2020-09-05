import React from "react";
import { Pie, Radar } from "react-chartjs-2";

const Dashboard = ({ pieCharts, radarCharts }) => {
    const PieCharts = () => {
        return pieCharts.map((pc, i) => (
            <>
                <div className="col-md-5 col-lg-5 col-sm-3 col-xs-3" key={i}>
                    <div className="card mb-3">
                        <Pie
                            data={{
                                datasets: [
                                    {
                                        data: pc.map(p => p.count),
                                        backgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ],
                                        hoverBackgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ]
                                    }
                                ],

                                // These labels appear in the legend and in the tooltips when hovering different arcs
                                labels: pc.map(p => p.label)
                            }}
                            key={i}
                        />
                    </div>
                </div>
            </>
        ));
    };
    const RadarCharts = () => {
        console.log(radarCharts?.map((rc, i) => i));
        return radarCharts?.map((rc, i) => (
            <>
                <div className="col-md-5 col-lg-5 col-sm-3 col-xs-3" key={i}>
                    <div className="card mb-3">
                        <Radar
                            data={{
                                datasets: [
                                    {
                                        data: rc.map(p => p.label),
                                        backgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ],
                                        hoverBackgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ]
                                    }
                                ],

                                // These labels appear in the legend and in the tooltips when hovering different arcs
                                labels: [`Question 1${i + 1}`]
                            }}
                            key={i}
                        />
                    </div>
                </div>
            </>
        ));
    };
    return (
        <>
            <PieCharts />
            <RadarCharts />
        </>
    );
};

export default Dashboard;
