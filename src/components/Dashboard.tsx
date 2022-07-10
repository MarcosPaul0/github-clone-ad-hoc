import dynamic from "next/dynamic";
import { useContext } from "react";
import { ImSpinner2 } from "react-icons/im";
import { RepositoriesContext } from "../contexts/RepositoriesContext";
import { Card } from "./Card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Dashboard() {
  const { attributes, data, isLoading } = useContext(RepositoriesContext);

  return (
    <div
      className={`
        w-full flex items-center justify-around
        p-10
      `}
    >
      {isLoading ? (
        <ImSpinner2 size={50} className={`animate-spin absolute top-96`} />
      ) : (
        <>
          <div
            className={`
              p-4 flex flex-col items-center justify-start
              gap-12 w-full h-full
            `}
          >
            <div
              className={`
                w-full flex gap-4
              `}
            >
              <Card
                label="Total de Repositórios"
                value={`${data.stats.totalRepositories}`}
              />
              <Card
                label="Média de Tamanho"
                value={`${(
                  data.stats.totalSize / data.stats.totalRepositories
                ).toFixed(2)}`.replace(".", ",")}
              />
              <Card
                label="Média de Forks"
                value={`${(
                  data.stats.totalForks / data.stats.totalRepositories
                ).toFixed(2)}`.replace(".", ",")}
              />
              <Card
                label="Média de Questões"
                value={`${data.stats.totalIssues / data.stats.totalIssues}`}
              />
              {data.stats.totalCollaborators && (
                <Card
                  label="Média de Colaboradores"
                  value={`${(
                    data.stats.totalCollaborators / data.stats.totalRepositories
                  ).toFixed(2)}`.replace(".", ",")}
                />
              )}
            </div>
            <div
              className={`
                w-full flex gap-8 items-end justify-center
              `}
            >
              {attributes.licenses && (
                <div
                  className={`
                  w-full h-full p-8 pb-0 flex items-end justify-center
                  bg-gray-900 rounded-xl shadow-xl
                `}
                >
                  <Chart
                    options={{
                      chart: {
                        type: "bar",
                        animations: {
                          enabled: false,
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      xaxis: {
                        labels: {
                          style: {
                            colors: "#f9fafb",
                          },
                        },
                      },
                      yaxis: {
                        labels: {
                          style: {
                            colors: "#f9fafb",
                          },
                        },
                      },
                      tooltip: {
                        theme: "dark",
                      },
                      
                    }}
                    series={[
                      {
                        name: "Licensas",
                        data: Object.keys(data.stats.licenses).map(
                          (license) => {
                            return {
                              x: license,
                              y: data.stats.licenses[license],
                            };
                          }
                        ),
                      },
                    ]}
                    type="bar"
                    width={650}
                  />
                </div>
              )}
              <div
                className={`
                  w-full h-full p-8 flex items-center justify-center
                  bg-gray-900 rounded-xl shadow-xl
                `}
              >
                <Chart
                  options={{
                    series: Object.values(data.stats.languages),
                    labels: Object.keys(data.stats.languages),
                    chart: {
                      animations: {
                        enabled: false,
                      },
                    },
                    plotOptions: {
                      pie: {
                        donut: {
                          labels: {
                            show: true,
                            value: {
                              color: "#f9fafb",
                            }
                          },
                        },
                      },
                    },
                    stroke: {
                      show: false,
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    colors: [
                      "#eab308",
                      "#3b82f6",
                      "#ef4444",
                      "#a855f7",
                      "#f97316",
                      "#14b8a6",
                      "#d946ef",
                      "#22c55e",
                      "#8b5cf6",
                      "#f59e0b",
                      "#10b981",
                      "#84cc16",
                      "#ec4899",
                      "#6366f1",
                      "#06b6d4",
                      "#f43f5e",
                      "#0ea5e9",
                    ],
                    legend: {
                      labels: {
                        colors: "#f9fafb",
                      },
                    },
                  }}
                  series={Object.values(data.stats.languages)}
                  type="donut"
                  width={650}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
