if ($) {
  $(function () {
    $('.form-input>input')
      .focus(function (e) {
        $(this).parent().parent().addClass('focus')
      }).blur(function (e) {
        $(this).parent().parent().removeClass('focus')
      })

    console.log('Have a great day! 🍭🍺')
  })
}
