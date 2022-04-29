$(function () {
index=[]

//create a style tag on demand, to hide/show selected elements
css_view = (hide,show,sdur=.3,hdur=.5) =>
`<style>
${hide}{opacity:0; animation-name: fadeOutOpacity;
    animation-iteration-count: 1; animation-timing-function:ease-out;
    animation-duration:${hdur}s; display:none;}
${show}{display:block; opacity:1; animation-name:fadeInOpacity; 
    animation-iteration-count:1; animation-timing-function:ease-in;
    animation-duration:${sdur}s}
</style>`
//dynamically insert style elemnt (above) into dom
view_controller = (style) => c_upd_dom('patio',style)

//-------UDFs: Begin Custom f(x)
//converts array to literal string, and removes undefined vars
c_literal = str => str.join('')
//maps JSON (as array var) to an ES6 template literal
c_template = (json,template_literal) => c_literal(json.map(template_literal))
//replaces undefined value with empty str
c_noUndefined = str => (str ? str.replace('') : '')
//drops HTML into element with specified id
c_upd_dom = (id,html) => document.getElementById(id).innerHTML=html
//returns alpha-numeric text only (strips unicode) or make empty if undef
c_alphaNum = str => (str ? str.replace('') : '')
//return an element by id
$id = (id) => document.getElementById(id)

//<-------Begin: 'Index Page Template'
//<head> tag: dynamically populate
pg_headTag =
    `<title>Tabshare Index</title><base target=_blank>
    <meta name=viewport content='width=600,initial-scale=1'>`

//<body> tag: core HTML
tabIndex_HTML = data =>
`<div id=iMeta>
    <input autofocus=true class=search id=search placeholder="paste your wallet address here to check if you are qualified to this weekly claim" 
    oninput=c_show_results(c_search(this.value));><dl class=list id=results>
    ${c_template(data,record_elems)}</dl></div>`

    //Content: list of links (anchor tags)
      record_elems = data =>
        `<dt class="row">
        <a class="col card record" href="${data.url}" target="_self">
        <span class="col title">${data.handle}</span>
        <span class="col keys"><span class="keywords">${data.amount} tokens on gumdrop ↗</span></span></a></dt>`

//<-------INIT page

//<HEAD> Tag HTML Insertion: define & execute function
update_head = html => document.head.innerHTML+=html; update_head(pg_headTag)

//<BODY> Tag: Insert HTML (requires JSON loaded)
c_upd_dom( 'list_index',tabIndex_HTML(index) )
//------->Page Loaded

//<-------Search Utility Functions
//maps a returned array to html & populates the DOM
c_show_results = content => c_upd_dom('results', c_literal(content.map(record_elems)) )
//Search Function: returns sub array with querystring matching search
c_search = query => m_index.filter(data => data.querystr.includes(query))
//------->Search Utility Functions

//<-------Build Search (from 'index' variable in HTML body)
//Define: Query String Builder -- combines searchable fields into one
compile_search_keys=(records=index) => {records.forEach( rec => 
    rec.querystr = c_noUndefined(rec.title) 
    + c_noUndefined(rec.handle)
)}
//Compile & Store to master DB variable
compile_search_keys(index); m_index = [...index]
//ready search box for input
$id('search').focus();
//------->Search Ready
});