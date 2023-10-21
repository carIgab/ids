/*const chart_1 = document.getElementById('myChart_1');
let c = new Chart(chart_1, {
        type: 'doughnut',
        data: {
        labels: ['Input', 'Output'],
        datasets: [{
            label: 'R$',
            data: [12,20],
            backgroundColor: [
                '#36a2eb',
                '#ff6384'
                
            ],
            borderWidth: 1,
            
        }]
        },
        options: {
            scales: {
                x: {
                    display:false,
                    grid: {
                        display: false,
                        
                    },
                },
                y: {
                display:false,
                    beginAtZero: true ,
                    grid: {
                        display: false,
                        
                    },
                },
            
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels:{
                        padding: 15,
                        color: '#868686'
                    }
                    
                }
            }
        }
    }); 
    */
let actives_total_wallet
let wallet_evolution_wallet
let acess_graphic = true

function make_graphic(page,tab){
    if(page == 'wallet'){
        acess_graphic = null
        if(tab == 'main'){
           const gphc_actives_wallet = document.getElementById('myChart_actives') 
            actives_total_wallet = new Chart(gphc_actives_wallet, {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'R$',
                        data: [],
                        backgroundColor: [],
                        borderWidth: 1,
                        
                    }]
                },
                options: {
                    scales: {
                        x: {
                            display:false,
                            grid: {
                                display: false,
                                
                            },
                        },
                        y: {
                        display:false,
                            beginAtZero: true ,
                            grid: {
                                display: false,
                                
                            },
                        },
                    
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                        },
                    }
                }
            });


            const gphc_wallet_evolution = document.getElementById('myChart_evolution') 
            wallet_evolution_wallet =  new Chart(gphc_wallet_evolution,{
                data: {
                    labels: [],
                    datasets: [{
                        type: 'line',
                        label: 'earning',
                        backgroundColor: '#ffce56',
                        borderColor:'#ffce56',
                        data: [],
                    }
                    ,{
                        type: 'line',
                        label: 'total',
                        backgroundColor: '#9BD0F5',
                        borderColor:'#9BD0F5',
                        data: [],
                    },
                    {
                        type: 'bar',
                        label: 'appreciation ',
                        backgroundColor: '#ff6384',
                        borderColor:'#ff6384',
                        data: [],
                    },{
                        type: 'bar',
                        label: 'invest',
                        backgroundColor: '#36a2eb',
                        borderColor:'#36a2eb',
                        data: [],
                    }]
                },
                options: {
                    responsive: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                color: "#2196f3"
                            },
                            grid: {
                                display: false,
                            },
                        },
                    y: {
                        stacked: true,
                        display:false,
                        drawBorder: false,
                            beginAtZero: true ,
                            grid: {
                                display: false,
                            },
                        },
                        
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                    }
                }
            });
        }
    }
}