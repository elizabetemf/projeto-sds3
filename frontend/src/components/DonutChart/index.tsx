import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[]
}

const DonutChart = () => {

    //FORMA ERRADA, declarar a variavel desse jeito: let chartData, no proximo passo vai usar react-roots
    //let chartData : ChartData = { labels: [], series: []};

    //forma correta de inicializar usando o useState, o setChartDate é uma função que atualiza o valor da variavel a esquerda que é o chartData 
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    //FORMA ERRADA ainda
    //    axios.get(`${BASE_URL}/sales/amount-by-seller`)
    //    .then( (response) => {
    //        console.log(response.data);
    //    })

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then((response) => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySum = data.map(x => x.sum);

                // chartData = { labels: myLabels, series: mySum};
                setChartData({ labels: myLabels, series: mySum }); // agora ao inves de ter a lista, a funcao setChartData vai receber os objetos que foi montado com os dados que foi recebido do back

                //console.log(response.data);
               // console.log(chartData);
            });
    }, []);

    //   const mockData = {
    //        series: [477138, 499928, 444867, 220426, 473088],
    //        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //    }

    const options = {
        legend: {
            show: true
        }
    }
    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;