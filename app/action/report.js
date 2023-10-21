let idx_report = 0;
let lim;
let push_table = true
let acess_report;

let date_filter_1 = document.getElementById('ipt_filter_date_1')
let date_filter_2 = document.getElementById('ipt_filter_date_2')
let value_filter_1 = document.getElementById('ipt_filter_value_1')
let value_filter_2 = document.getElementById('ipt_filter_value_2')


function change_tab_report(type){
    let ipt = document.getElementById('index_report')

    if(type == 'front'){
        if(idx_report < lim){
            idx_report++
            document.querySelector('.show_report').classList.remove('show_report')
            document.querySelector('.tab_report_'+idx_report).classList.add('show_report')
        }
    }
    else if(type == 'back'){
        if(idx_report > 0){
            idx_report--
            document.querySelector('.show_report').classList.remove('show_report')
            document.querySelector('.tab_report_'+idx_report).classList.add('show_report')
        }
    }

    ipt.innerHTML = 'Page '+ (idx_report+1)
}

function push_report(n){
    lim = n ;
    let body_form =  document.querySelector('.report_form')
    let text = body_form.innerHTML;
    let data = search_invest()
    let y =0 

    if(push_table == true){
        for(let itab = 1; itab<=n;itab++){
            text +=  '<section class="tab_report table_report tab_report_'+itab+' elts">'
            text += '<table><thead ><tr><th>Code</th>'+
            '<th>Price</th><th>Qtde</th><th>Total</th><th>Max</th>'+
            '<th>Min</th><th>Invest</th></tr></thead><tbody>'
    
            for(let irow = 1;irow<=10;irow++){
                text += '<tr>'
                for(let icol = 1;icol<=7;icol++){
                    if(icol == 1){
                        if(data.code[((irow +y)-1)] != null){
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'" value="'+data.code[((irow +y)-1)]+'"></td>'
                        }
                        else{
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                        }
                    }
                    else if(icol == 2){
                        if(data.qtds[((irow +y)-1)] != null){
                            text += `<td><input type="text" id="inpt`+(irow + y)+`:`+icol+`" onchange="sum('inpt`+(irow + y)+`')"></td>`
                        }
                        else{
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                        }
                    }
                    else if(icol == 3){
                        if(data.qtds[((irow +y)-1)] != null){
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'" value="'+data.qtds[((irow +y)-1)]+'"></td>'
                        }
                        else{
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                        }
                    }
                    else if(icol == 4){
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                    else if(icol == 7){
                        if(data.qtds[((irow +y)-1)] != null){
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'" value="'+data.invest[((irow +y)-1)].toFixed(2)+'"></td>'
                        }
                        else{
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                        }
                    }
                    else{
                        if(data.qtds[((irow +y)-1)] != null){
                            text += '<td><input type="text" id="inpt'+(irow + y)+':'+icol+'"></td>'
                        }
                        else{
                            text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                        }
                    }
                }
                text += '</tr>'
            }
            text += '</tbody></table></section>'
            y = y +10
        }
        body_form.innerHTML = text
        text = ''
        push_table = false
    }
}

function sum(local){
    let price = document.getElementById(local+':2').value.toString().replace(",", ".")
    document.getElementById(local+':2').value = price
    let value = price * document.getElementById(local+':3').value
    document.getElementById(local+':4').value = value.toFixed(2)
}

function sum_list(list, col){
    let value = 0
    for(let i=0; list.length > i; i++){
        value += parseFloat(list[i][col])
    }

    return value.toFixed(2)
}

function search_report(type){
    if(document.querySelector('#body_list_report').innerHTML != ""){
        if(type == 'search'){
            let ipt_search = document.getElementById('ipt_search_report').value.toLowerCase()
            let x = data_search.id;
      
            for (i = 0; i < x.length; i++) { 

                let tr = document.getElementById(data_search.orders[i]+'_list_report')

                if (!x[i].includes(ipt_search)) {
                    tr.setAttribute('style','display:none;')
                }
                else {
                    tr.setAttribute('style','display: table-row;')               
                }
            }

            if(ipt_search == ""){
                clear_filter()
            }
        }

        else if(type == 'filter'){
            if(value_filter_1.value != "" && value_filter_2.value != "" && date_filter_1.value != "" && 
            date_filter_2.value != "" ){

                if(parseFloat(value_filter_2.value) >= parseFloat(value_filter_1.value) && date_filter_2.value >= date_filter_1.value){
                    for(let i=0; i < data_search.orders.length;i++){
                        let tr = document.getElementById(data_search.orders[i]+'_list_report')
                
                        if(data_search.total[i] >= parseFloat(value_filter_1.value) && data_search.total[i] <= parseFloat(value_filter_2.value) && 
                        data_search.date[i] >= date_filter_1.value && data_search.date[i] <= date_filter_2.value ||
                        data_search.invest[i] >= parseFloat(value_filter_1.value) && data_search.invest[i] <= parseFloat(value_filter_2.value)  && 
                        data_search.date[i] >= date_filter_1.value && data_search.date[i] <= date_filter_2.value){
                            tr.setAttribute('style','display:table-row;')
                        }
                        else{
                            tr.setAttribute('style','display:none;')
                        }    
                    } 
                }
                else{
                    document.querySelector('.filter_list').reset()
                }
            }

            else if(value_filter_1.value != "" && value_filter_2.value != "" ){
                if(parseFloat(value_filter_2.value) >= parseFloat(value_filter_1.value)){
                    for(let i=0; i < data_search.orders.length;i++){
                        let tr = document.getElementById(data_search.orders[i]+'_list_report')
    
                        if(data_search.total[i] >= parseFloat(value_filter_1.value) && data_search.total[i] <= parseFloat(value_filter_2.value) ||
                        data_search.invest[i] >= parseFloat(value_filter_1.value) && data_search.invest[i] <= parseFloat(value_filter_2.value)){
                            tr.setAttribute('style','display:table-row;')
                        }
                        else{
                            tr.setAttribute('style','display:none;')
                        }   
                    } 
                }
                else{
                    value_filter_1.value = ""
                    value_filter_2.value = ""
                }
                
            }
           
            else if(date_filter_1.value != "" && date_filter_2.value != ""){
                if(date_filter_2.value >= date_filter_1.value){
                    for(let i=0; i< data_search.date.length;i++){
                        let tr = document.getElementById(data_search.orders[i]+'_list_'+page)
                        let dt = data_search.date[i]
    
                        if( dt >= date_filter_1.value && dt <= date_filter_2.value){
                            tr.setAttribute('style','display:table-row;')  
                        }
                        else{
                            tr.setAttribute('style','display:none;')
                        }
                    }
                }
                else{
                    date_filter_1.value = ""
                    date_filter_2.value = ""
                }
            }
            else {
                clear_filter()
            }
        }
    }
}

function visible_list(n){
    for(let i=0;i < n;i++){
        let tr = document.getElementById(data_search.orders[i]+'_list_report')
        tr.setAttribute('style','display:table-row;')    
    }
}

function clear_filter(){
    document.querySelector('.filter_list').reset()
    visible_list(data_search.orders.length)
}  

