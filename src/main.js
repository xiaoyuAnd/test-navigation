const $siteList = $('.site_list');
const $lastLi = $('.addButton')
const x = localStorage.getItem('hashMap')
const xObject = JSON.parse(x)
console.log(xObject);
const hashMap = xObject || [
    { logo: 'C', url: 'https://caniuse.com' },
    { logo: 'B', url: 'https://bilibili.com' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $('.site_list').find('li:not(.addButton)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">
                ${node.logo[0].toUpperCase()}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class ='removeButton'>
                     <svg class="icon">
                        <use xlink:href="#icon-remove"></use>
                     </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $('li:not(.addButton)').on('click', () => {
            window.open(node.url)
        })
        $('.removeButton').on('click', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问您要输入的网址是啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    // console.log(url);
    hashMap.push({
        logo: url.replace('https://', '')
            .replace('http://', '')
            .replace('www.', ''),
        url: url
    })
    render()

})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('hashMap', string)
}