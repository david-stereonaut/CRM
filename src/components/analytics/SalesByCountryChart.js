import { observer, inject } from 'mobx-react'
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Label, Legend, XAxis, YAxis } from 'recharts';
import { Tooltip } from '@material-ui/core';


const SalesByCountryChart = inject('ClientStore')(observer((props) => {

  let {ClientStore} = props

  let [data, setData] = useState([])

  
  useEffect(() => {
    const fetchData = async () => {
      await ClientStore.fetchSalesByCountry()
      setData([...ClientStore.salesByCountry])
    }
    fetchData()
  }, [ClientStore])




  return data.length !== 0 ? (
      <BarChart width={750} height={250} data={data.map(e => { return { name: e.name.split(' ')[0], Sales: e.sales}})}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" >
          <Label value="Sales by Country" offset={-15} position="insideBottomLeft" />
        </XAxis>
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sales" fill="#695958" />
      </BarChart>
  ) : <p>Loading chart</p>
}))

export default SalesByCountryChart