/*
	Author: Kaique da Silva <kaique.developer@gmail.com>
*/

var createQr = function createQr( settings ) {
	settings = settings || {};

	if ( settings ) {
		var width = settings.width,
			height = settings.height,
			value = settings.value;

		return 'https://chart.googleapis.com/chart?chs=' + width + 'x' + height + '&cht=qr&chl=' + value;
	} if ( !settings ) {
		return false;
	}
};

var getElementValue = function getElementValue( element ) {
	element = element || '';

	if ( element ) {
		if ( $(element).val() !== '' ) {
			return $(element).val();
		} else {
			return false;
		}
	} else {
		return false;
	}
};

var popAlert = function popAlert( message ) {
	message = message || '';

	if ( message ) {
		$('#wh').prepend(
			'<div class="alert">' +
            '<a class="close" data-dismiss="alert">×</a>' +
            '<strong>Warning:</strong> ' + message +
          	'</div>'
		);

		$('.alert .close').bind('click', function () {
			$(this).parent().hide();
		});

		return;
	}
};

$( function () {
    // Collapse
    // btn-group btn
    $('.btn-group .btn').on('click', function () {
        var sectionID = $(this).attr( 'data-target' );
        var forms = $('.qr-forms article div').map( function ( e ) {

            if ( $(this).attr('id') === 'qr-text' || $(this).attr('id') === 'qr-url' || $(this).attr('id') === 'qr-contact' ) {
                $('this').hide();
                
                if ( $(this).attr('id') === sectionID.replace('#', '') ) {
                    return $(this).show(); 
                }
            }
        } );

        //$('.sectionOut').hide();
        //$('.qr-forms article div').each( function ( element ) {
        //    console.log( $('.qr-froms article div').eq( element ).attr('id') )
        //});
        console.log( forms )
    });

	// Create a URL qr code
	$('#qr-url-action').bind('click', function () {
		var url = getElementValue('input[name=qr-content-url]');
		var width = getElementValue('#wh input[name=qr-width]').replace(/px$/, '');
		var height = getElementValue('#wh input[name=qr-height]').replace(/px$/, '');
		var previewContentImage;

		if ( url && width && parseInt(width) <= 5000 && height && parseInt(height) <= 5000 ) {
			var qrPreview = $('#qr-url').find('.qr-preview');
			
			if ( url.search('^(http|https)(\:\/\/)|(([w]{1,3})+([.])).([a-z0-9]{1,255}).(.)([a-z]{1,3})?([.])([a-z]{1,3})$') > -1 ) {
					// Remove class error
					$('form.qr-url .control-group').removeClass('error');
					$('form.dim .control-group').removeClass('error');

					// Clear preview
					qrPreview.html(' ').css({display: 'none'});
					
					qrPreview.html('<img src="' + createQr({width: width, height: height, value: url}) + '"></img>');

					// Show with fade the qr
					qrPreview.fadeTo('normal', 1);

			} else {
				popAlert('URL incorrect!');

				// Clear preview
				qrPreview.fadeTo('fast', 0).html(' ');

				// Error class
				$('form.qr-url .control-group').addClass('error');
				$('form.dim .control-group').addClass('error');
			}
		} else {
			// Message to maximum size!
			if ( parseInt(width) > 5000 && parseInt(height) > 5000 ) {
				popAlert('Exceeded the maximum size!');
			}

			// Clear preview
			$(this).parent().parent().find('.qr-preview').html(' ');

			// Error class
			$('form.qr-url .control-group').addClass('error');
			$('form.dim .control-group').addClass('error');
		}
	});

	// Create a text qr
	$('#qr-text-action').bind('click', function () {
		var text = getElementValue('textarea[name=qr-content-text]');
		var width = getElementValue('#wh input[name=qr-width]').replace(/px$/, '');
		var height = getElementValue('#wh input[name=qr-height]').replace(/px$/, '');
		var previewContentImage;

		if ( text && width && parseInt(width) <= 5000 && height && parseInt(height) <= 5000 ) {
			var qrPreview = $('#qr-text').find('.qr-preview');

			// Remove class error
			$('form.qr-text .control-group').removeClass('error');
			$('form.dim .control-group').removeClass('error');

			// Clear preview
			qrPreview.html(' ').css({display: 'none'});

			qrPreview.html('<img src="' + createQr({width: width, height: height, value: text}) + '"></img>');

			// Show with fade the qr
			qrPreview.fadeTo('normal', 1);

		} else {
			// Message to maximum size!
			if ( parseInt(width) > 5000 && parseInt(height) > 5000 ) {
				popAlert('Exceeded the maximum size!');
			}

			// Clear preview
			$(this).parent().parent().find('.qr-preview').html(' ');

			// Error class
			$('form.qr-text .control-group').addClass('error');
			$('form.dim .control-group').addClass('error');
		}
	});

	// Create a contact qr
	$('#qr-contact-action').bind('click', function () {
		var contact = {
			name: getElementValue('#qr-contact-name'),
			lastName: getElementValue('#qr-contact-lastName'),
			phone: getElementValue('#qr-contact-phone'),
			email: getElementValue('#qr-contact-email'),
			addrs: getElementValue('#qr-contact-addrs'),
		};

		var width = getElementValue('#wh input[name=qr-width]').replace(/px$/, '');
		var height = getElementValue('#wh input[name=qr-height]').replace(/px$/, '');
		var previewContentImage;
		var me;

		if ( contact && parseInt(width) <= 5000 && height && parseInt(height) <= 5000 ) {
			var qrPreview = $('#qr-contact').find('.qr-preview');

			// Remove class error
			$('form.qr-text .control-group').removeClass('error');
			$('form.dim .control-group').removeClass('error');

			// Clear preview
			qrPreview.html(' ').css({display: 'none'});
			
			// Create a Qr Code
			me = 'MECARD:N:' + contact.name + ', ' + contact.lastName + ';ADR:' + contact.addrs + ';TEL:' + contact.phone + ';EMAIL:' + contact.email + ';;';

			qrPreview.html('<img src="' + createQr({width: width, height: height, value: me}) + '"></img>');

			// Show with fade the qr
			qrPreview.fadeTo('normal', 1);

		} else {
			// Message to maximum size!
			if ( parseInt(width) > 5000 && parseInt(height) > 5000 ) {
				popAlert('Exceeded the maximum size!');
			}

			// Clear preview
			$(this).parent().parent().find('.qr-preview').html(' ');

			// Error class
			$('form.qr-contact .control-group').addClass('error');
			$('form.dim .control-group').addClass('error');
		}
	});

});
