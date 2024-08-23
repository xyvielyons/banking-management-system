'use client'
import React from 'react'
import 'chart.js/auto';
import { Doughnut} from 'react-chartjs-2';
const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const accountNames = accounts.map((a)=>a.name)
    const balances = accounts.map((a)=>a.currentBalance)
    const data = {
        datasets:[
            {
                label:'Banks',
                data:balances,
                backgroundColor:['#0747b6','#2265d8','#2f91fa']
            }
        ],
        labels:accountNames
    }
  return <Doughnut data={data} 
  options={{
    cutout:'60%',
    plugins:{
        legend:{
            display:false
        }
    }
  }}
  
  />
}

export default DoughnutChart