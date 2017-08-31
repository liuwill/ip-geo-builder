$(function () {
  $('.form-input>input')
    .focus(function (e) {
      $(this).parent().parent().addClass('focus')
    }).blur(function (e) {
      $(this).parent().parent().removeClass('focus')
    })

  $('.action-item.upload').click(function (e) {
    var formName = $(this).attr('name')
    $('.form-data.upload[name="' + formName + '"]').click()
    console.log('.form-data.upload[name="' + formName + '"]')
  })

  $('.form-data.upload').change(function (e) {
    console.log(e)
  })

  console.log('Have a great day! 🍭🍺')
})
