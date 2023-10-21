let i_search;
let i_order;


function search_base(code, type){
    let content = null;
    let base_data = JSON.parse(localStorage.getItem('base_data') || '[]')

    if(base_data != ''){
        for(let i=0;base_data.length > i; i++){
            if(base_data[i].code == code.toUpperCase()){
                i_search = i
                if(type == 'total'){
                    content = [
                        base_data[i].code,
                        base_data[i].tips,
                        base_data[i].company,
                        base_data[i].cnpj,
                        base_data[i].review,
                        base_data[i].ri,
                        base_data[i].objective,
                        base_data[i].sector,
                        base_data[i].segment
                ]
                }
                else if(type == 'tips'){
                    content = base_data[i].tips
                }
                else if(type == 'name'){
                    content = base_data[i].name
                }
                else if(type == 'cnpj'){
                    content = base_data[i].cnpj
                }
                else if(type == 'review'){
                    content = base_data[i].review
                }
                else if(type == 'ri'){
                    content = base_data[i].ri
                }
                else if(type == 'objective'){
                    content = base_data[i].objective
                }
                else if(type == 'sector'){
                    content = base_data[i].sector
                }
                else if(type == 'segment'){
                    content = base_data[i].segment
                }
            }
        }
        
    }
    return content
}

function search_orders(order){
    let order_data = JSON.parse(localStorage.getItem('order_data') || '[]')
    let tips_data;
    let content =  null;
    let pg = document.body.getAttribute('page')
    let page_html;

    if(order_data != ""){
        for(let i=0;order_data.length > i; i++){
            if(order_data[i].orders == order){
                i_order = i
                tips_data = order_data[i].tips
                break
            }
        }
        
        if(pg == 'report'){
            page_html = document.querySelector('.report_launch').getAttribute('page')
        }
        else{
            page_html = document.querySelector('.box_page').getAttribute('page')
        }


        if(tips_data == page_html){
            let data = JSON.parse(localStorage.getItem(tips_data+'_data') || '[]')
            for(let i=0;data.length > i; i++){
                if(data[i].orders == order){
                    i_search = i
                    
                    if(tips_data == 'flow'){
                        content = [
                            data[i].orders,
                            data[i].date,
                            data[i].tips,
                            data[i].area,
                            data[i].subarea,
                            data[i].source,
                            data[i].name,
                            data[i].event,
                            data[i].value
                        ]
                    }
                    else if(tips_data == 'record'){
                        content = [
                            data[i].orders,
                            data[i].request,
                            data[i].date,
                            data[i].code.toUpperCase(),
                            data[i].tips,
                            data[i].total,
                            data[i].value,
                            data[i].qtds,
                            data[i].subtotal
                        ]
                    }
                    else if(tips_data == 'earning'){
                        content = [
                            data[i].orders,
                            data[i].date,
                            data[i].tips,
                            data[i].code.toUpperCase(),
                            data[i].tips_active,
                            data[i].total_invest,
                            data[i].value,
                            data[i].qtds,
                            data[i].total
                        ]
                    }
                    else if(tips_data == 'report'){
                        content = {
                            info:[
                                data[i].orders,
                                data[i].date,
                                data[i].week,
                            ],
                            data: data[i].data
                        }
                        for(let x=0; x<12;x++){
                            content.info.push(data[i].statics[x])
                        }
                    }
                    break
                }
            }
        }
            
        return content
    }


}

function search_invest(){
    let record_data = JSON.parse(localStorage.getItem('record_data') || '[]')
    let list = []
    let list_invest = []
    let list_qtds = []
  
    if(record_data != ''){
        for(let i=0; record_data.length > i; i++){
            list.push(record_data[i].code)
        }
        list = list.filter((este, ia) => list.indexOf(este) === ia);
        list.sort()
        
        for(var i=0; list.length > i; i++){
            for(var x=0; record_data.length > x; x++){
                if(list[i] == record_data[x].code){
                    if(list_invest[i] == null || list_qtds[i] == null){
                        list_invest[i] = 0
                        list_qtds[i] = 0
                    }
                    if(record_data[x].tips == 'Purchase'){
                        list_invest[i] += parseFloat(record_data[x].total)
                        list_qtds[i] += parseInt(record_data[x].qtds)
                    }
                    else if(record_data[x].tips == 'Sale'){
                        list_invest[i] -= parseFloat(record_data[x].total)
                        list_qtds[i] -= parseInt(record_data[x].qtds)
                    }
                }
            }
        }
        return {
            code: list, 
            invest: list_invest,
            qtds: list_qtds
        }    
    }
    else {
        return {
            code: null, 
            invest: null,
            qtds: null

        }
    }
   

   
}

function sequence_report(type, filter){
    let report_data = JSON.parse(localStorage.getItem('report_data')|| '[]')
    let week = []
    let year = [[],[],[],[],[],[],[],[],[],[],[],[]]
    let mounth = ['','','','','','','','','','','','']
    let list_content = ['','','','','','','','','','','','']

    let content = null

    if(report_data != ""){
        if(type == 'last'){
            for(let i=0;report_data.length > i; i++){
                week.push(report_data[i].week)
            }
            week.sort()
            for(let i=0;report_data.length > i; i++){
                if(week[(week.length)-1] == report_data[i].week){
                    content = report_data[i]
                }
            }
        }

        else if(type == 'complex'){
            for(let i=0;report_data.length > i; i++){
                if(report_data[i].date.substr(0, 4) == filter){
                    year[(report_data[i].date.substr(5, 2))-1].push(report_data[i].week)
                }
            }

            for(let i=0; i<year.length;i++){
                if(year[i].length > 0){
                    year[i].sort()
                    mounth[i] = year[i][year[i].length - 1]
                }
            }

            for(let i=0;report_data.length > i; i++){
                for(let x=0; x<mounth.length;x++){
                    if(mounth[x] == report_data[i].week){
                        list_content[x] = report_data[i]
                    }
                }
            }
            content = list_content
        }
        
        else if(type == 'extreme'){
            content = []
            for(let i=0;report_data.length > i; i++){
                week.push(report_data[i].week)
            }
            week.sort()
            for(let i=0;report_data.length > i; i++){
                if(week[0] == report_data[i].week){
                    content.push(report_data[i])
                }
            }

            for(let i=0;report_data.length > i; i++){
                if(week[(week.length)-1] == report_data[i].week){
                    content.push(report_data[i])
                }
            }
        }
    }

    return content
}

function search_info(local,type){
    let content = null;
    let data = sequence_report('last').data
    let data_actives = search_actives(format_data(data).code)

    if(data_actives != null){
        content = []
        if(type == 'tips'){
            for(let i=0; i <data_actives.length;i++){
                content.push(data_actives[i].tips)
            }
            content = content.filter((este, ia) =>content.indexOf(este) === ia);
            content.sort()

            push_select(content, type+'_'+local)
            search_info(local, 'sector')
            search_info(local, 'objtive')
        }
        else if(type == 'sector'){
            let tips = document.getElementById('slct_tips_'+local).value
            for(let i=0; i <data_actives.length;i++){
                if(data_actives[i].tips == tips){
                    content.push(data_actives[i].sector)
                }
            }
            content = content.filter((este, ia) =>content.indexOf(este) === ia);
            content.sort()

            push_select(content, type+'_'+local)
            if(local != 'wallet_analysis'){
                search_info(local, 'segment')
            }
            
        }
        else if(type == 'segment'){
            let tips = document.getElementById('slct_tips_'+local).value
            let sector = document.getElementById('slct_sector_'+local).value

            for(let i=0; i <data_actives.length;i++){
                if(data_actives[i].tips == tips && data_actives[i].sector == sector){
                    content.push(data_actives[i].segment)
                }
            }
            content = content.filter((este, ia) =>content.indexOf(este) === ia);
            content.sort()

            push_select(content, type+'_'+local)
        }   
        else if(type == 'objtive'){
            let tips = document.getElementById('slct_tips_'+local).value

            for(let i=0; i <data_actives.length;i++){
                if(data_actives[i].tips == tips){
                    content.push(data_actives[i].objective)
                }
            }
            content = content.filter((este, ia) =>content.indexOf(este) === ia);
            content.sort()

            push_select(content, type+'_'+local)
        } 
      
    }
   
     
    return content
}
 
function search_actives(array){
    let content = null;
   
    if(array != null){
        content = []
        for(let i=0; i < array.length; i++){
            content.push({
                code: array[i].toUpperCase() ,
                tips: search_base(array[i], 'tips'),
                sector: search_base(array[i], 'sector'),
                segment: search_base(array[i], 'segment'),
                objective: search_base(array[i], 'objective')
            })
        }
    }
    
    return content
}

