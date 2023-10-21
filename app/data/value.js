function generateColor(n) {
    let list_color = []
    for(let x=0; x <n;x++){
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        list_color.push(color)
    }
    return list_color;
}

function value_page(page, tab){
    if(page == 'wallet'){
        let report = sequence_report('last')
        if(report != null){
            if(tab == 'main'){
                let year = new Date().getFullYear()
            
                let data_actives = format_data(report.data)
                let value_evolution = {
                    total: [],
                    invest: [],
                    appreciation: [],
                    earning: value_earning('have',year)
                }
    
                let data_year_mounth = sequence_report('complex',year)
                for(let i=0; i < data_year_mounth.length;i++){
                    if(data_year_mounth[i] == ''){
                        value_evolution.total.push(0)
                        value_evolution.invest.push(0)
                        value_evolution.appreciation.push(0)
                    }
                    else{
                        let x = format_data(data_year_mounth[i].data)
                        value_evolution.total.push(sum_value(x.value))
                        value_evolution.invest.push(sum_value(x.invest))
                        value_evolution.appreciation.push(sum_value(x.value)-sum_value(x.invest))
                    }
    
                }
    
                let total = sum_value(data_actives.value)
                let appreciation = total - sum_value(data_actives.invest)
                let earning = sum_value(value_earning('have',year))
                let invest = sum_value(data_actives.invest)
    
                let value_main= [total, appreciation, earning,invest]
                push_graphic(page, tab, [data_actives,value_evolution])
                push_value(page, tab, value_main)
            
            }
            else if(tab == 'analysis'){
                search_info('wallet_analysis','tips')
            }   
        }
    }
}

function format_data(data){
    let data_graphic = {
        code: [],
        invest: [],
        value: []
    }
    for(let i=0; i < data.length;i++){
        data_graphic.code.push(data[i][0])
        data_graphic.invest.push(data[i][6])
        data_graphic.value.push(data[i][3])
    }
    return data_graphic
} 

function value_earning(type, filter){
    let earning_data = JSON.parse(localStorage.getItem('earning_data') || '[]')
    let value = [0,0,0,0,0,0,0,0,0,0,0,0]
    
    if(earning_data != ''){
        for(let i=0; i < earning_data.length;i++){
            if(type == 'none'){
                value[(earning_data[i].date.substr(5, 2))-1] += parseFloat(earning_data[i].value)
            }
            else if(type == 'have'){
                if(earning_data[i].date.substr(0, 4) == filter){
                    value[(earning_data[i].date.substr(5, 2))-1] += parseFloat(earning_data[i].value)
                }
            }
            else if(type == 'code '){
                if(earning_data[i].code == filter){
                    value[(earning_data[i].date.substr(5, 2))-1] += parseFloat(earning_data[i].value)
                }
            }
        }
    }

    return value
}

