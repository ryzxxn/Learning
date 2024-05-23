import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

export default function Barchart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://raw.githubusercontent.com/ryzxxn/Learning/main/Qilo/frontend2-3/src/data/data.json',
      )

      setData(result.data.weekly_data)
      // console.log(result.data.weekly_data);
    }

    fetchData()
  }, [])

  return (
    <div style={{color: 'white', fontSize: '1.5rem'}}>
      <p style={{padding: '0rem 1rem'}}>Average Temprature Previous weeks</p>
      <VictoryChart
        domainPadding={{ x: 30, y: 30 }}
        padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <VictoryAxis
          tickValues={data.map(d => "week "+d.week)}
          style={{
            ticks: { stroke: "none", size: 0 },
            tickLabels: { fontSize: 14, fill: "white", padding: 10 }
          }}
        />

        <VictoryBar
          animate={{
            onEnter: {
              duration: 100,
              before: () => ({
                fill: "orange",
              })}}}

          data={data}
          x="week"
          y="average_temperature"
          labels={({ datum }) => `${datum.average_temperature.toFixed(1)}`}
          style={{
            data: { fill: '#F45C43' },
            labels: { fontSize: 16, fill: '#F45C43' },
          }}
        />
      </VictoryChart>
    </div>
  )
}
