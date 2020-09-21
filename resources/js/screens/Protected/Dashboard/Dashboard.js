import React from "react";
import { Pie, Radar } from "react-chartjs-2";

const Dashboard = ({ pieCharts, radarCharts }) => {
    const PieCharts = () => {
        return (
            <div className="row pieCharts">
                <div className="col-12">
                    {pieCharts.length > 0 && (
                        <p className="h1 text-white">Equipement</p>
                    )}
                </div>
                {pieCharts.map((pc, i) => (
                    <div
                        className="col-md-5 col-lg-5 col-sm-3 col-xs-3"
                        key={i}
                    >
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
                ))}
            </div>
        );
    };
    const RadarCharts = () => {
        return (
            <div className="row radarCharts">
                <div className="col-12">
                    {radarCharts.length > 0 && (
                        <p className="h1 text-white">Qualité</p>
                    )}
                </div>
                {radarCharts?.map((rc, index) => (
                    <div className="col-md-10 col-sm-12 col-xs-12" key={index}>
                        <div className="card mb-3">
                            <Radar
                                data={{
                                    datasets: [
                                        {
                                            data: rc.data.datasets.map(d => d),
                                            backgroundColor: [
                                                "#FF6384",
                                                "#36A2EB",
                                                "#FFCE56"
                                            ],
                                            hoverBackgroundColor: [
                                                "#FF6384",
                                                "#36A2EB",
                                                "#FFCE56"
                                            ],
                                            label: "Notes de qualités"
                                        }
                                    ],
                                    // These labels appear in the legend and in the tooltips when hovering different arcs
                                    labels: rc.data.labels.map(l => l)
                                }}
                                key={index}
                                options={{
                                    scale: {
                                        angleLines: {
                                            display: false
                                        },
                                        ticks: {
                                            max: 5,
                                            min: 0,
                                            stepSize: 1
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <>
            <PieCharts />
            <RadarCharts />
        </>
    );
};

export default Dashboard;
