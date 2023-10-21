let page = document.body.getAttribute('page')
let tab = document.querySelector('.box_page').getAttribute('page')

function start(page, tab){
    mode_color()
    if(page == 'home'){

    }

    else if(page == 'create'){
        reset_form(tab)
        change_action(tab, 'data')
        if(tab != 'base'){
            document.getElementById('0_'+tab).value = think_orders()
            if(tab == 'flow'){
                flow_action('tips_flow')
            }
            else if(tab == 'record'){
                let record_data = JSON.parse(localStorage.getItem('record_data') || '[]')
                let request =  document.getElementById('1_record')
                if(record_data == ""){
                    request.value = 1
                }
                else{
                    request.value = parseInt(record_data[record_data.length-1].request)+1
                }
            }
        }
    }

    else if(page == 'report'){
        let data = search_invest()
        push_list(page)
        if(data.code != null){
            document.querySelector('.launch_header').classList.remove('off')
            let num = Math.ceil((data.code.length/10))
            if(tab == 'launch'){
                push_report(num)
                document.getElementById('0_report').value = think_orders()
            }
        }
        else{
            document.querySelector('.launch_header').setAttribute('onclick','')
        }
    }

    else if(page == 'wallet'){
        if(tab == 'analysis'){
            push_list(page)
            value_page(page,tab)
            
        }
        else if(tab =='main'){
            if(acess_graphic == true){
                make_graphic(page,tab)
                value_page(page, tab)
            }
           
        }
    }
}
start(page, tab)
function think_orders(){
    let order;
    let order_data = JSON.parse(localStorage.getItem('order_data') || '[]')
    
    if(order_data != ''){
        order = parseInt(order_data[order_data.length-1].orders)+1
       
    }
    else {
        order = 1
    }

    return order;
}

function mode_color(){
    let logo_img = document.querySelector('.logo_img')
    let mode = JSON.parse(localStorage.getItem('mode_color') || '[]')
    if(mode != ""){
        document.body.classList.add('light')
        logo_img.setAttribute('src','../../images/menu/light.png')
    }
}


function change_colors(){
    let mode = JSON.parse(localStorage.getItem('mode_color') || '[]')
    let logo_img = document.querySelector('.logo_img')
    if(mode == ""){
        document.body.classList.add('light')
        logo_img.setAttribute('src','../../images/menu/light.png')
        mode.push('light')
        localStorage.setItem('mode_color',JSON.stringify(mode))

    }else{
        document.body.classList.remove('light')
        logo_img.setAttribute('src','../../images/menu/black.png')
        localStorage.removeItem('mode_color')
    }
}

