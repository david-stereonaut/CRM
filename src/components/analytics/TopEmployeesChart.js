import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { Tooltip } from '@material-ui/core';


const TopEmployeesChart = inject('ClientStore')(observer((props) => {

  let {ClientStore} = props

  useEffect(() => {
    ClientStore.fetchTopEmployees()
  }, [ClientStore])




  return (
      <BarChart layout='vertical' width={500} height={250} data={ClientStore.topEmployees.map(e => { return { name: e.name.split(' ')[0], Sales: e.sales}})}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number"/>
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Tooltip />
        <Bar dataKey="Sales" fill="#695958" barSize={30} />
      </BarChart>
  )
}))

export default TopEmployeesChart