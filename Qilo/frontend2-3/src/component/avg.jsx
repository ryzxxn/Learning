import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTemperatureHigh } from "react-icons/fa";
import { IoRainy } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";

export default function Avg() {
  const [latestWeekData, setLatestWeekData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://raw.githubusercontent.com/ryzxxn/Learning/main/Qilo/frontend2-3/src/data/data.json')
        const weeklyData = result.data.weekly_data
        setLatestWeekData(weeklyData[weeklyData.length - 1]) // Get the latest week's data
      } catch (error) {
        console.error("Error fetching the data", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {latestWeekData ? (
        <div className='card_container'>
            <div className='card'>
                <p><FaTemperatureHigh /></p>
                <p>{latestWeekData.average_temperature}°C</p>
            </div>

            <div className='card'>
                <p><IoRainy /></p>
                <p>{latestWeekData.average_rainfall}mm</p>
            </div>

            <div className='card'>
                <p><WiHumidity /></p>
                <p>{latestWeekData.average_humidity}°C</p>
            </div>

            <div className='card'>
                <p><TbTemperatureCelsius /></p>
                <p>{latestWeekData.current_temperature}°C</p>
            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
