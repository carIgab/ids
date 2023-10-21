let data_search 

function push_list(page){
    let base = JSON.parse(localStorage.getItem(page+'_data'))

    if(page == 'report'){
        data_search = {
            orders: [],
            date: [],
            invest: [],
            total: [],
            id: []
        }
        let body = document.querySelector('.body_report')
        let txt = '<table class="list_table"><thead><tr><th>Order</th>'+
        '<th>Price</th><th>Date</th><th>Week</th><th>Qtde</th>'+
        '<th>Invest</th></tr></thead><tbody id="body_list_report">'

        if(base != null){
            for(let x=0; base.length > x; x++){
                txt += '<tr id= "'+base[x].orders+'_list_report" onclick="view_report('+base[x].orders+')">'
                for(let y =0; y < 6; y++){
                    if(y == 0){
                        txt += '<td>'+ base[x].orders+'</td>'
                    }
                    else if( y == 1){
                        txt += '<td>'+ sum_list(base[x].data,3) +'</td>'
                    }
                    else if( y == 2){
                        txt += '<td>'+ base[x].date+'</td>'
                    }
                    else if( y == 3){
                        txt += '<td>'+ base[x].week+'</td>'
                    }
    
                    else if( y == 4){
                        txt += '<td>'+ base[x].data.length+'</td>'
                    }
    
                    else if( y == 5){
                        txt += '<td>'+ sum_list(base[x].data,6)+'</td>'
                    }
    
                }
                data_search.orders.push(base[x].orders)
                data_search.date.push(base[x].date)
                data_search.total.push(sum_list(base[x].data,3))
                data_search.invest.push(sum_list(base[x].data,6))
                data_search.id.push('o'+base[x].orders+'-'+sum_list(base[x].data,3)+'-'+ base[x].date+'-'+base[x].week+'-'+
                    base[x].data.length+'-'+sum_list(base[x].data,6))
            }
    
        }
        body.innerHTML = txt
    }
    else if(page == 'wallet'){
        let last_report = sequence_report('last')
        let data = format_data(last_report.data)
        
        //for(let x=0; x < data.code.length; x++){}
    }
}

function push_value(page, tab, value){
    if(page == 'wallet'){
        if(tab == 'main'){
            document.getElementById('total_wallet').innerHTML = '$ ' + value[0].toFixed(2)
            document.getElementById('total_appreciation').innerHTML = '$ ' + value[1].toFixed(2)
            document.getElementById('total_earning').innerHTML = '$ ' + value[2].toFixed(2)

            perc_value('wallet_total',(value[0]+value[2]),value[3])
            perc_value('wallet_appreciation',value[0],value[3])
            document.getElementById('num_wallet_earning').innerHTML = ((value[2]/value[0])*100).toFixed(2) + "%"
        }
    }
}

function push_graphic(page, tab, data){
    let mounth = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun','jul','ago','set','out','nov','dez']
    if(page == 'wallet'){
        if(tab == 'main'){
            actives_total_wallet.data.labels = data[0].code
            actives_total_wallet.data.datasets[0].data = data[0].value
            actives_total_wallet.data.datasets[0].backgroundColor = generateColor(data[0].code.length)
            actives_total_wallet.update()

            wallet_evolution_wallet.data.datasets[0].data = data[1].earning
            wallet_evolution_wallet.data.datasets[1].data = data[1].total
            wallet_evolution_wallet.data.datasets[2].data = data[1].appreciation
            wallet_evolution_wallet.data.datasets[3].data = data[1].invest
            wallet_evolution_wallet.data.labels = mounth
            wallet_evolution_wallet.update()
        }
    }
}


function sum_value(data){
    let value = 0
    for(let i=0; i < data.length;i++){
        value += parseFloat(data[i])
    }
    return value
}

function perc_value(local, x, y){
    let num = ((parseFloat(x)/parseFloat(y))-1)*100

    if(num >= 0){
        document.getElementById('perc_'+local).setAttribute('style','color:green;')
        document.getElementById('icon_'+local).setAttribute('name','arrow-up-outline')
        document.getElementById('num_'+local).innerHTML = num.toFixed(2) + "%"
    }
    else{
        document.getElementById('perc_'+local).setAttribute('style','color:red;')
        document.getElementById('icon_'+local).setAttribute('name','arrow-down-outline')
        document.getElementById('num_'+local).innerHTML = num.toFixed(2) + "%"
    }
}

function push_select(array, local){
    let slt = document.getElementById('slct_'+local)
    let txt = '<option value=""></option>'
    for(let i=0;i<array.length;i++){
        txt +=  '<option value="'+array[i]+'">'+array[i]+'</option>'
    }   
    slt.innerHTML = txt
}
