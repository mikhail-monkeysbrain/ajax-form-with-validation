$(function(){

    $('.phoneMask').mask('+7 000 000 00-00')

    $('.birthMask').mask('00.00.0000')

    $('.reqiured--name').on('keyup blur', function () {
        var $this = $(this)
        var $thisVal = $this.val()
        var $error = $this.closest('.input--parent').find('input--error')
        if ($thisVal === '') {
            $this.removeClass('valid').addClass('no-valid')
        } else {
            $this.removeClass('no-valid').addClass('valid')
        }
    })

    $('.reqiured--email').on('keyup blur', function () {
        var $this = $(this)
        var $thisVal = $this.val()
        var $mail = /.+@.+\..+/i
        if ($mail.test($thisVal) === false) {
            $this.removeClass('valid').addClass('no-valid')
        } else {
            $this.removeClass('no-valid').addClass('valid')
        }
    })

    $('.reqiured--phone').on('keyup blur', function () {
        var $this = $(this)
        var $thisVal = $this.val()
        var $mail = /^[+]{1}[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{2}[-]{1}[0-9]{2}$/
        if ($mail.test($thisVal) === false) {
            $this.removeClass('valid').addClass('no-valid')
        } else {
            $this.removeClass('no-valid').addClass('valid')
        }
    })

    $('.reqiured--birth').on('keyup blur', function () {
        var $this = $(this)
        var $thisVal = $this.val()
        // если успею - реализую более точную валидацию
        var $mail = /^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/
        if ($mail.test($thisVal) === false) {
            $this.removeClass('valid').addClass('no-valid')
        } else {
            $this.removeClass('no-valid').addClass('valid')
        }
    })

    $('.reqiured--checkbox').change(function () {
        var $this = $(this)
        var isChecked = false
        if ($(this).prop('checked')) {
            isChecked = true
        }
        if (!isChecked) {
            $this.removeClass('valid').addClass('no-valid')
        } else {
            $this.removeClass('no-valid').addClass('valid')
        }
    })

    $('.reqiured--password').on('keyup blur', function () {
        var $this = $(this)
        var $thisVal = $this.val()
        var $parent = $this.closest('.password--parent')
        var $doublePassword = $parent.find('.reqiured--password__retype')
        var $error = $parent.find('.error__password')
        var $errorDouble = $parent.find('.error__password-retype')
        var $nextPassword = $parent.find('.reqiured--password__retype')
        var $number = /[0-9]+/
        var $lowercase = /[a-z]/
        var $uppercase = /[A-Z]/
        var $symbol = /[-!"#$%&'()* ,./:;<=>\\?@[\]_`{|}~]+/
        var errors = ['от 5 символов', 'одну цифру', 'одну строчную латинскую букву', 'одну заглавную латинскую букву', 'один знак препинания']
        var errorString = errors
        function remove (array, element) {
            return array.filter(e => e !== element)
        }
        if ($thisVal.length >= 5) {
            errorString = remove(errorString, 'от 5 символов')
        }
        if ($number.test($thisVal)) {
            errorString = remove(errorString, 'одну цифру')
        }
        if ($lowercase.test($thisVal)) {
            errorString = remove(errorString, 'одну строчную латинскую букву')
        }
        if ($uppercase.test($thisVal)) {
            errorString = remove(errorString, 'одну заглавную латинскую букву')
        }
        if ($symbol.test($thisVal)) {
            errorString = remove(errorString, 'один знак препинания')
        }
        if (errorString.length !== 0) {
            $error.show(0)
            $error.html('Пароль должен содержать ' + errorString)
            $this.removeClass('valid').addClass('no-valid')
            return false
        } else {
            $this.addClass('valid').removeClass('no-valid')
            $doublePassword.removeAttr('disabled')
            $nextPassword.trigger('focus')
        }
    })

    $('.reqiured--password__retype').on('keyup blur', function () {
        var $this = $(this)
        var $parent = $this.closest('.password--parent')
        var $thisVal = $this.val()
        var $mainVal = $parent.find('.reqiured--password').val()
        var $error = $parent.find('.error__password-retype')
        if ($thisVal !== $mainVal) {
            $this.removeClass('valid').addClass('no-valid')
            $error.html('Пароли не совпадают')
        } else {
            $this.removeClass('no-valid').addClass('valid')
            $parent.removeClass('no-valid no-valid__password')
        }
    })

    $('.input, input').on('keyup blur change', function () {
        var $this = $(this).closest('form')
        var $submit = $this.find('.btn')
        var $requiredInput = $this.find('.reqiured')
        var $validInput = $this.find('.valid')
        var countR = $requiredInput.length
        var countV = $validInput.length
        if (countR === countV) {
            $submit.removeAttr('disabled')
        } else {
            $submit.attr('disabled', true)
        }	
    })


    $('.form').submit(function(e){

        e.preventDefault()

        var m_method=$(this).attr('method')
        var m_action=$(this).attr('action')
        var m_data=$(this).serializeArray()
        
        $.ajax({
            type: m_method,
            url: m_action,
            data: m_data,

            success: function(result){

                for (i in m_data) {
                    console.log(m_data[i].name, m_data[i].value)
                }

                $('.form').hide()
                $('.form__authorize').addClass('js-show')
                $('#exampleModalLongTitle').html('Авторизовация')
            }
        })
    })

    $('.form__authorize').submit(function(e){

        e.preventDefault();

        var m_method=$(this).attr('method')
        var m_action=$(this).attr('action')
        var m_data=$(this).serializeArray()
        
        $.ajax({
            type: m_method,
            url: m_action,
            data: m_data,

            success: function(result){
                
                for (i in m_data) {
                    console.log(m_data[i].name, m_data[i].value)
                }

                $('.form__authorize').removeClass('js-show')
                $('.success').html('<h3>Вы усешно авторизовались.</h3><h2>Добро пожаловать на портал!</h2>')
                $('.js-close--modal').trigger('click')
                $('.js-open--modal').hide(0)
            }
        })
    })

})