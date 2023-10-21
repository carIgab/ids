let acess_edit = false
let acess_search = true
let idx = search_invest();

let tips_output = ['Usual','Education','Personal','Objects','Leisure','Debt']
let area_output = [
    ['Supermarket','Food','Home','Transport','Bill','Health','Others'],
    ['College','Courses','Books','Others'],
    ['Beauty','Clothes','Goods','Others'],
    ['Tools','Materials','Gift','Gadgets','immobilized','Others'],
    ['Books','Subscriptions','Travel','Hobbies','Others'],
    ['Rates','Fees','Safe','Others']
]
let event_output = ['Urgent','Necessary', 'Not']


let tips_input = ['Work','Bonus','Extra']
let area_input = [
    ['Salary','Overtime','Commission','Others'],
    ['Holiday','Thirteenth','FGTS','PIS','Others'],
    ['Earning','Extra','Sale','Gift','Others'],
   
]
let event_input = ['Usual','Eventual', 'Rare']

function change_action(tab, action){
    document.querySelector('.mark_create_'+tab).classList.remove('mark_create_'+tab)
    document.querySelector('.'+tab+'_'+action).classList.add('mark_create_'+tab)
    
    if(action == 'data'){
        let ipt = document.getElementById('0_'+tab)
        open_form(tab)
        disable_btn(tab, 'front')
        reset_form(tab)
        ipt.setAttribute('style','border-bottom: 1px solid var(--color-text)')
        ipt.readOnly = true
        if(tab == 'base'){
            ipt.readOnly = false
        }
        document.querySelector('.'+tab+'_action').setAttribute("onclick", "action_create('"+tab+"','register')")

        if(tab == 'report'){
            mask_form(false, idx.code.length)
        }
        else if(tab == 'base'){
            document.getElementById('0_base').setAttribute('onchange','authenticating_code("base")')
        }
    }
    else if(action == 'search'){
        if(tab == 'base'){
            document.getElementById('0_base').setAttribute('onchange','')
        }

        reset_form(tab)
        if(acess_search == true){
            document.querySelector('.'+tab+'_action').setAttribute("onclick", "action_create('"+tab+"','search')")
            lock_form(tab)
            document.getElementById('0_'+tab).readOnly = false
        }
    }
    else if(action == 'delete' && acess_edit == true ){
        document.querySelector('.'+tab+'_action').setAttribute("onclick", "action_create('"+tab+"','delete')")
    }
    else if(action == 'modify' && acess_edit == true ){
        document.querySelector('.'+tab+'_action').setAttribute("onclick", "action_create('"+tab+"','modify')")
        open_form(tab)
        document.getElementById('0_'+tab).readOnly = true
    }
}

function action_create(tab, action){
    if(action == 'register' && authenticating_form(tab) == true){
        let data = take_form(tab)
        if(tab == 'base'){
            let base_data = JSON.parse(localStorage.getItem('base_data') || '[]')
            base_data.push({
                code: data[0].toUpperCase(),
                tips: data[1], 
                company: data[2],
                cnpj: data[3],
                review: data[4],
                ri: data[5],
                objective: data[6],
                sector: data[7],
                segment: data[8]
            })
            localStorage.setItem('base_data',JSON.stringify(base_data))
        }

        else if(tab != 'base'){
            if(tab == 'flow'){
                let flow_data = JSON.parse(localStorage.getItem('flow_data') || '[]')
                flow_data.push({
                    orders: data[0],
                    date: data[1], 
                    tips: data[2],
                    area: data[3],
                    subarea: data[4],
                    source: data[5],
                    name: data[6],
                    event: data[7],
                    value: data[8]
                })
                localStorage.setItem('flow_data',JSON.stringify(flow_data))
            }

            else  if(tab == 'record'){
                let record_data = JSON.parse(localStorage.getItem('record_data') || '[]')
                record_data.push({
                    orders: data[0],
                    request: data[1], 
                    date: data[2],
                    code: data[3].toUpperCase(),
                    tips: data[4],
                    total: data[5],
                    qtds: data[6],
                    value: data[7],
                    subtotal: data[8]
                })
                localStorage.setItem('record_data',JSON.stringify(record_data))
            }

            else  if(tab == 'earning'){
                let earning_data = JSON.parse(localStorage.getItem('earning_data') || '[]')
                earning_data.push({
                    orders: data[0],
                    date: data[1], 
                    tips: data[2],
                    code: data[3].toUpperCase(),
                    tips_active: data[4],
                    total_invest: data[5],
                    qtds: data[6],
                    value: data[7],
                    total: data[8]
                })
                localStorage.setItem('earning_data',JSON.stringify(earning_data))
            }

            else  if(tab == 'report'){
                let report_data = JSON.parse(localStorage.getItem('report_data') || '[]')
                report_data.push({
                    orders: data.orders,
                    date: data.date, 
                    week: data.week,
                    statics: data.statics,
                    data: data.data,
                })
                localStorage.setItem('report_data',JSON.stringify(report_data))
            }

            let order_data = JSON.parse(localStorage.getItem('order_data') || '[]')
            if(tab == 'report'){
                order_data.push({
                    orders: data.orders,
                    tips: tab
                })
            }
            else{
                order_data.push({
                    orders: data[0],
                    tips: tab
                })
            }
            
            localStorage.setItem('order_data',JSON.stringify(order_data))
        }
        reset_form(tab)
        start('create', tab)
    }
    
    else if(action  == 'search'){
        let text = document.getElementById('0_'+tab)
        if(text.value != ""){
            text.setAttribute('style','border-bottom: 1px solid var(--color-text)')
            let data;
            if(tab == 'base'){
                data = search_base(text.value, 'total')
            }
            else{
                data = search_orders(text.value)

            }

            if(data != null){
                disable_btn(tab, 'back')
                push_form(tab, data)
                lock_form(tab)
            }
            else{
                text.setAttribute('style','border-bottom: 1px solid red')
                text.value = ""
            }
        }
        else{
            text.setAttribute('style','border-bottom: 1px solid red')
        }
    }
    else if(action == 'modify'){
        let acess =  authenticating_form(tab)
        let content = take_form(tab) 
        let data = JSON.parse(localStorage.getItem(tab+'_data'))


        if(acess == true){
            if(tab == 'base' && acess == true){
                data[i_search].code = content[0].toUpperCase()
                data[i_search].tips= content[1]
                data[i_search].company= content[2]
                data[i_search].cnpj= content[3]
                data[i_search].review = content[4]
                data[i_search].ri = content[5]
                data[i_search].objective = content[6]
                data[i_search].sector= content[7]
                data[i_search].segment= content[8]
            }
            else if(tab == 'flow' && acess == true){
                data[i_search].orders = content[0]
                data[i_search].date= content[1]
                data[i_search].tips= content[2]
                data[i_search].area= content[3]
                data[i_search].subarea = content[4]
                data[i_search].source = content[5]
                data[i_search].name = content[6]
                data[i_search].event= content[7]
                data[i_search].value= content[8]
            }
            else if(tab == 'earning' && acess == true){
                data[i_search].orders = content[0]
                data[i_search].date= content[1]
                data[i_search].tips= content[2]
                data[i_search].code= content[3].toUpperCase()
                data[i_search].tips_active = content[4]
                data[i_search].total_invest = content[5]
                data[i_search].value = content[6]
                data[i_search].qtds= content[7]
                data[i_search].total= content[8]
            }
            else if(tab == 'record' && acess == true){
                data[i_search].orders = content[0]
                data[i_search].request= content[1]
                data[i_search].date= content[2]
                data[i_search].code= content[3].toUpperCase()
                data[i_search].tips = content[4]
                data[i_search].total = content[5]
                data[i_search].value = content[6]
                data[i_search].qtds= content[7]
                data[i_search].subtotal= content[8]
            }
            else if(tab == 'report' && acess == true){
                data[i_search].orders = content.orders
                data[i_search].date= content.date
                data[i_search].week= content.week
                data[i_search].statics = content.statics
                data[i_search].data = content.data
            
            }
            
            localStorage.setItem(tab+'_data',JSON.stringify(data))
            reset_form(tab)
            disable_btn(tab, 'front')
            change_action(tab, 'data')

            start('create', tab)
        }
        
    
    }
    else if(action == 'delete'){
        let data = JSON.parse(localStorage.getItem(tab+'_data'))
        data.splice(i_search,1)
        localStorage.setItem(tab+'_data',JSON.stringify(data))

        if(tab != 'base'){
            let order_data = JSON.parse(localStorage.getItem('order_data'))
            order_data.splice(i_order,1)
            localStorage.setItem('order_data',JSON.stringify(order_data))
        }
        change_action(tab, 'data')
        start('create', tab)
    }
}

function reset_form(tab){
    if(acess_edit == false){
        document.querySelector('.'+tab+'_form').reset()
    }
    if(tab != 'base'){
        document.getElementById('0_'+tab).value = think_orders()
    }

}

function push_form(tab, content){
    if(tab == 'report'){
      
        for(let i=0; i < 15; i++){
            document.getElementById(i+'_report').value = content.info[i]
        }

        for(let x=1; x <= content.data.length ; x++){
            for(let y=1 ; y < 8 ;y++){
                document.getElementById('inpt'+x+':'+y).value = content.data[x-1][y-1]
            }
        }

        mask_form(true, idx.code.length)
        mask_form(false, content.data.length)
    }
    else{
        for(let i=0; i<9;i++){
            document.getElementById(i+"_"+tab).value =  content[i]
            if(tab == 'flow'){
                if(i == 2){
                    flow_action('tips_flow')
                }
                else if(i == 3){
                    flow_action('area_flow')
                }
            }
        }
    }
   
}

function take_form(tab){
    let content;

    if(tab == 'report'){
        content = {
            orders: '',
            date: '',
            week :'',
            statics: [],
            data: []
        }

        for(let i=0; i < 15; i++){
            let ipt = document.getElementById(i+'_report')
    
            if(i == 0){
                content.orders = ipt.value
            }
            else if(i == 1){
                content.date = ipt.value
            }
            else if(i == 2){
                content.week = ipt.value
            }
            else{
                content.statics.push(ipt.value)
            }    
           
            
        }
    
        let list = []
        if(acess_edit == true && tab == 'report'){
            let index = search_orders(document.getElementById('0_report').value)
            for(let x=1; x <= index.data.length ; x++){
                list = []
                for(let y=1 ; y < 8 ;y++){
                    let ipt = document.getElementById('inpt'+x+':'+y)
                    if(ipt.value != ""){
                        ipt.setAttribute('style','color: var(--color-primary);')
                        list.push(ipt.value)
                    }
                    else{
                        ipt.setAttribute('style','color: var(--color-text);')
                        acess_report = false
                    }
                }
                content.data.push(list)
            }
        } 
        else{
            for(let x=1; x <= idx.code.length ; x++){
                list = []
                for(let y=1 ; y < 8 ;y++){
                    let ipt = document.getElementById('inpt'+x+':'+y)
                    if(ipt.value != ""){
                        ipt.setAttribute('style','color: var(--color-primary);')
                        list.push(ipt.value)
                    }
                    else{
                        ipt.setAttribute('style','color: var(--color-text);')
                        acess_report = false
                    }
                }
                content.data.push(list)
            }
        }

        
        
    }

    else{
        content = []
        for(let i=0; i<9;i++){
            content.push(document.getElementById(i+"_"+tab).value)
       }
    }
    
    return content
}

function authenticating_form(tab){
    let acess = true

    if(tab == 'report'){
        for(let i=0; i < 15; i++){
            let ipt = document.getElementById(i+'_report')
            if(ipt.value == ""){
                acess = false 
                ipt.setAttribute('style','border-bottom: 1px solid red;')
            }else{
                ipt.setAttribute('style','border-bottom: 1px solid var(--color-text);')
            }
        }

        if(acess_edit == true && tab == 'report'){
            let index = search_orders(document.getElementById('0_report').value)
            for(let x=1; x <= index.data.length ; x++){
                for(let y=1 ; y < 8 ;y++){
                    let ipt = document.getElementById('inpt'+x+':'+y)
                    if(ipt.value == ""){
                        acess = false 
                    }else{
                        ipt.setAttribute('style','color: var(--color-primary);')
                    }
                }
            }
        } 
        else{
            for(let x=1; x <= idx.code.length ; x++){
                for(let y=1 ; y < 8 ;y++){
                    let ipt = document.getElementById('inpt'+x+':'+y)
                    if(ipt.value == ""){
                        acess = false 
                    }else{
                        ipt.setAttribute('style','color: var(--color-primary);')
                    }
                }
            }
        }
    }

    else{
        for(let i=0; i<9;i++){
            let ipt = document.getElementById(i+"_"+tab)
            if(ipt.value == ""){
                acess = false 
                ipt.setAttribute('style','border-bottom: 1px solid red;')
            }else{
                ipt.setAttribute('style','border-bottom: 1px solid var(--color-text);')
            }
    
        }
    }
    

    return acess
}

function lock_form(tab){
    if(tab == 'report'){
        for(let i=0; i < 15; i++){
            document.getElementById(i+'_report').readOnly = true
        }
        for(let x=1; x <= idx.code.length ; x++){
            for(let y=1 ; y < 8 ;y++){
                document.getElementById('inpt'+x+':'+y).readOnly = true
            }
        }
    }
    else{
        for(let i=0; i<9;i++){
            document.getElementById(i+"_"+tab).readOnly = true
        }
    }
}

function open_form(tab){
    if(tab == 'report'){
        for(let i=0; i < 15; i++){
            document.getElementById(i+'_report').readOnly = false
        }
        for(let x=1; x <= idx.code.length ; x++){
            for(let y=1 ; y < 8 ;y++){
                document.getElementById('inpt'+x+':'+y).readOnly = false
            }
        }
    }
    else{
        for(let i=0; i<9;i++){
            document.getElementById(i+"_"+tab).readOnly = false
        }
    }
    
}

function disable_btn(tab, type){
    if(type == 'back'){
        
        acess_edit = true
        acess_search = false
        document.querySelector('.'+tab+'_modify').classList.remove('off')
        document.querySelector('.'+tab+'_delete').classList.remove('off')
        document.querySelector('.'+tab+'_search').classList.add('off')
    }
    else if(type == 'front'){
        acess_edit = false
        acess_search = true
        document.querySelector('.'+tab+'_modify').classList.add('off')
        document.querySelector('.'+tab+'_delete').classList.add('off')
        document.querySelector('.'+tab+'_search').classList.remove('off')
    }
}

function flow_action(type){
    let tips_flow = document.getElementById('2_flow').value
    let area_flow = document.getElementById('3_flow')
    let subarea_flow = document.getElementById('4_flow')
    let event_flow = document.getElementById('7_flow')

    if(type == 'tips_flow'){
        if(tips_flow == 'Input'){
            area_flow.innerHTML = push_select(tips_input)
            event_flow.innerHTML = push_select(event_input)
        }
        else if(tips_flow == 'Output'){
            area_flow.innerHTML = push_select(tips_output)
            event_flow.innerHTML = push_select(event_output)
        }

        flow_action('area_flow')
    }

    else if(type == 'area_flow'){
        if(tips_flow == 'Input'){
            for(let i=0; i < tips_input.length ;i++){
                if(tips_input[i] == area_flow.value){
                    subarea_flow.innerHTML = push_select(area_input[i])
                }          
            }
        }

        else{
            for(let i=0; i < tips_output.length ;i++){
                if(tips_output[i] == area_flow.value){
                    subarea_flow.innerHTML = push_select(area_output[i])
                }          
            }
        }
    }
}

function push_select(content){
    let text = ''
    for(let i=0; i < content.length ;i++){
        text += '<option value="'+content[i]+'">'+content[i]+'</option>'
    }
    return text
}

function sum_form(tab){
    let total = document.getElementById('8_'+tab)
    let qtde = document.getElementById('6_'+tab)
    let value = document.getElementById('7_'+tab)
    let mod_value = value.value.toString().replace(",", ".")
    value.value = mod_value

    if(value.value == ""){
        value.value = 0
    }

    total.value = parseFloat(parseInt(qtde.value) * parseFloat(value.value)).toFixed(2)
    if(tab == 'record'){
        document.getElementById('5_record').value = total.value
    }
}

function authenticating_code(tab){
    if(tab == 'base'){
        let code = document.getElementById('0_'+tab)
        if(search_base(code.value, 'tips') == null){
            code.setAttribute('style','border-bottom: 1px solid var(--color-text);')
        }
        else{
            code.setAttribute('style','border-bottom: 1px solid red;')
            code.value = ""
            code.focus()
        }
    }
    else{
        let code = document.getElementById('3_'+tab)
        if(search_base(code.value, 'tips') != null){
            code.setAttribute('style','border-bottom: 1px solid var(--color-text);')

            if(tab == 'earning'){
                push_invest(code.value)
                document.getElementById('4_earning').value = search_base(code.value, 'tips')
            }
        }
        else{
            code.setAttribute('style','border-bottom: 1px solid red;')
            code.value = ""
            code.focus()
        }
    }
}

function push_invest(code){
    let data =  search_invest()
    
    for(let i=0; data.code.length > i; i++){
        if(data.code[i] == code.toUpperCase()){
            document.getElementById('5_earning').value = data.invest[i]
            document.getElementById('6_earning').value = data.qtds[i]
        }
    }
}

function mask_form(live, row){
    for(let x=1; x <= row; x++){
        for(let y=1 ; y < 8 ;y++){
            if(live == true){
                document.getElementById('inpt'+x+':'+y).setAttribute('style','color: var(--color-elements);')
            }
            else{
                document.getElementById('inpt'+x+':'+y).setAttribute('style','color: var(--color-text);')
            }
            
        }
    }
    lim =  Math.ceil((row/10))
}

function authenticating_week(){
    let ipt = document.getElementById('2_report')
    let report_data = JSON.parse(localStorage.getItem('report_data') || '[]')

    if(report_data != ''){
        for(let i=0; report_data.length > i; i++){
            if(report_data[i].week == ipt.value){
                ipt.setAttribute('style','border-bottom: 1px solid red;')
                ipt.value = ""
                ipt.focus()
            }
            else{
                ipt.setAttribute('style','border-bottom: 1px solid var(--color-text);')
            }
        }
    }
}