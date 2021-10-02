$(function () {

    //刷新页面模块
    function refreshPage(select_refreshPage = [], flag = false) {
        (function () {
            let data = JSON.parse(localStorage.getItem('donor'))
            let $table_title = $('#mytbody').children()
            let table = `<tr>${$table_title.html()}</tr>`
            if (flag) {
                data = select_refreshPage
            }

            if (data !== null) {
                data.forEach(function (item, index) {
                    table += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item['donor_name']}</td>
                        <td>${item['donor_department']}</td>
                        <td>${item['donor_money']}</td>
                        <td>${item['donor_date']}</td>
    
                        <td>
                            <a href="#" id="del_btn" data-id="${index}">删</a>
                            <a href="#" id="up_btn" data-id="${index}">改</a>
                        </td>
                    </tr>
                    `
                })
            }
            $('#mytbody').html('')
            $('#mytbody').append(table)
        })()
    };
    refreshPage();
    //查询按钮
    (function () {
        $('#btn_select').on('click', function () {
            let data = JSON.parse(localStorage.getItem('donor'))
            let arr = []
            data.forEach(function (item, index) {
                if ($('#select_key').val() === item['donor_department']) {
                    arr[arr.length] = item
                }
            })
            refreshPage(arr, true)
        })
    })();

    //显示全部数据按钮
    (function () {
        $('#btn_select_all').on('click', function () {
            refreshPage()
        })
    })();

    //新增模块
    (function () {
        $('#add_btn').on('click', function () {
            let $donor_name = $('#donor_name')
            let $donor_department = $('#donor_department')
            let $donor_money = $('#donor_money')
            let $donor_date = $('#donor_date')
            let data = JSON.parse(localStorage.getItem('donor'))
            let add_data = { 'donor_name': $donor_name.val(), 'donor_department': $donor_department.val(), 'donor_money': $donor_money.val(), 'donor_date': $donor_date.val() }
            if (data === null) {
                localStorage.setItem('donor', JSON.stringify([add_data]))
                refreshPage()
            } else {
                data[data.length] = add_data
                localStorage.setItem('donor', JSON.stringify(data))
                refreshPage()
            }
        })
    })();

    //table内删改模块
    (function () {
        let id
        let $donor_name = $('#new_data_name')
        let $donor_department = $('#new_data_department')
        let $donor_money = $('#new_data_money')
        let $donor_date = $('#new_data_date')
        $('#mytbody').on('click', '#del_btn', function () {
            $('#del_Modal').modal('show')
            id = $(this).data().id
        })
        $('#del_modal_btn').on('click', function () {
            let data = JSON.parse(localStorage.getItem('donor'))
            data.splice(id, 1)
            localStorage.setItem('donor', JSON.stringify(data))
            refreshPage()
            $('#del_Modal').modal('hide')
            // alert('删除成功!')
        })
        $('#mytbody').on('click', '#up_btn', function () {
            $('#up_Modal').modal('show')
            id = $(this).data().id
            let data = JSON.parse(localStorage.getItem('donor'))
            $donor_name.val(data[id]['donor_name'])
            $donor_department.val(data[id]['donor_department'])
            $donor_money.val(data[id]['donor_money'])
            $donor_date.val(data[id]['donor_date'])

        })
        $('#new_data_up').on('click', function () {
            let data = JSON.parse(localStorage.getItem('donor'))
            let add_data = { 'donor_name': $donor_name.val(), 'donor_department': $donor_department.val(), 'donor_money': $donor_money.val(), 'donor_date': $donor_date.val() }
            data.splice(id, 1, add_data)
            localStorage.setItem('donor', JSON.stringify(data))
            refreshPage()
            $('#up_Modal').modal('hide')
        })
    })();


})
