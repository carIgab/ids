function active_menu(){
    document.querySelector('.menu').classList.toggle('active')
}

function change_tab(page,tab){
    document.querySelector('.show').classList.remove('show')
    document.querySelector('.'+page+'_'+tab).classList.add('show')

    document.querySelector('.mark').classList.remove('mark')
    document.querySelector('.'+tab+'_header').classList.add('mark')

    document.querySelector('.box_page').setAttribute('page',tab)
    start(page,tab)
    
    
}

function change_page(page){
    location.href = '../'+page+'/index.html'
}