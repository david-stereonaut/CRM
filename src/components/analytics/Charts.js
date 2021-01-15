import { observer } from 'mobx-react'
import TopEmployeesChart from './TopEmployeesChart'
import SalesByCountryChart from './SalesByCountryChart';
import './Charts.scss'


const Charts = observer(() => {




  return (
    <div id="charts-container">
      <TopEmployeesChart />
      <SalesByCountryChart />
    </div>
  )
})

export default Charts