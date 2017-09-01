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
  })

  $('.form-data.upload').change(function (e) {
    var uploadTarget = e.target
    var uploadElement = $(this)
    var formName = uploadElement.attr('name')

    var cardElement = $('.action-item.upload[name="' + formName + '"]')
    if (uploadTarget.files.length) {
      var uploadFile = uploadTarget.files[0]

      var filename = uploadFile.name
      var fileSize = uploadFile.size

      cardElement.attr('title', filename)
      $('.status', cardElement).text(filename)
      $('.size', cardElement).text(fileSize)
      $('.action-box', cardElement).addClass('selected')
    }
    $('.action-box', cardElement).removeClass('error')
  })

  $('.geo-ip-form').submit(function (e) {
    $('.tip-box').text('your file transform is starting')
  })

  $('.form-data.trigger')
    .keydown(function (e) {
      if (e.keyCode === 13) {
        if ($('.form-data.upload[name="core"]').val() === '') {
          $('.action-item.upload[name="core"] .action-box').addClass('error')
        }

        if ($('.form-data.upload[name="geo"]').val() === '') {
          $('.action-item.upload[name="geo"] .action-box').addClass('error')
        }
      }
    })
    .keyup(function (e) {
      if (e.keyCode === 13) {
        $('.action-item.upload .action-box').removeClass('error')
        if ($('.form-data.upload[name="core"]').val() === '') {
          return
        }

        if ($('.form-data.upload[name="geo"]').val() === '') {
          return
        }

        $('.geo-ip-form').submit()
        return false
      } else if (e.keyCode === 27) {
        $(this).val('')
        $('.form-data.upload').val('')
        $('.action-item.upload .status').text('点击上传')

        $('.action-item.upload .size').text('0')
        $('.action-item.upload .action-box').removeClass('selected').removeClass('error')

        $('.tip-box').text('choose your files and input filename, then type enter.')
      }
    })

  console.log('Have a great day! 🍭🍺')
})
