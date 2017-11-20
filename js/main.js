// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    /*---------------------------
                                  Focus on search form on page load
    ---------------------------*/
    $('.search input').focus();


    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.toggle-menu'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });

    /*---------------------------
                                  Open phones
    ---------------------------*/

    $('.js-show-phones').on('click', function(event) {
        event.preventDefault();
        $(this).siblings('.phones-container').toggleClass('active');
    });


    /*---------------------------
                                  File input logic
    ---------------------------*/
    $('input[type=file]').each(function(index, el) {
        $(this).on('change', function(event) {
            event.preventDefault();
            var placeholder = $(this).siblings('.placeholder');
        
            if ( this.files.length > 0 ) {
                if ( this.files[0].size < 5000000 ) {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                    if ( filename == '' ) {
                        filename = placeholder.attr('data-label');
                    }
                    placeholder.text(filename);
                } else {
                    alert('Maximum file size is 5Mb');
                }    
            } else {
                placeholder.text( placeholder.attr('data-label') );
            }
            
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.page-menu a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.js-toggle-menu').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $('.mobile-menu').toggleClass('open');
        $('body').toggleClass('menu-open');

        /*if ( $(this).hasClass('is-active') ) {
            $('body').css('margin-right', getScrollBarWidth()+'px');   
        } else {
            $('body').css('margin-right', '0');   
        }*/
        
    });

    $('.js-close-mobile-menu').on('click', function(event) {
        event.preventDefault();
        $('.mobile-menu').removeClass('open');
        $('body').removeClass('menu-open');
        $('body').css('margin-right', '0');
    });

    function getScrollBarWidth () {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild (inner);

        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild (outer);

        return (w1 - w2);
    };

    $(document).click(function(e) {
        e.stopPropagation();
        var container = $(".mobile-menu");
        if ( !container.is(e.target) && container.has(e.target).length === 0 ) {
            $('.mobile-menu').removeClass('open');
            $('body').removeClass('menu-open');
            $('body').css('margin-right', '0');
        }
    });

    if ( window.params.isIOS ) {
        $(document).on('touchstart', function (e) {
            var container = $(".mobile-menu");
            if ( !container.is(e.target) && container.has(e.target).length === 0 ) {
                $('.mobile-menu').removeClass('open');
                $('body').removeClass('menu-open');
                $('body').css('margin-right', '0');
            }
        });    
    }
    




    /*---------------------------
                                  Mobile menu
    ---------------------------*/
    $('.mobile-menu .vertical-menu a').on('click', function(event) {
        var submenu = $(this).siblings('.sub-menu');

        if ( submenu.length > 0 ) {
            event.preventDefault();
            submenu.slideToggle();
        }
        
    });



    
    /*---------------------------
                                  Sliders
    ---------------------------*/
    $('.offer-slider').on('init', function(event, slick){
        $('.offer').addClass('loaded');
    });

    $('.offer-slider').slick({
        fade: true,
        arrows: false,
        dots: true
    })


    // custom slider on product card
    $('.slider-control').on('click mouseover', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        var index = $(this).attr('data-index');
        var slider = $(this).parents('.slider');

        $(this).siblings('.slider-control').removeClass('active');
        $(this).addClass('active');

        slider.find('.slide').removeClass('active');
        slider.find('.slide-' + index).addClass('active');
    });


    /*---------------------------
                                  Tabs
    ---------------------------*/
    $('.products-tabs').tabs({
        activate: function( event, ui ) {
            console.log(ui)
            ui.newPanel.find('.scrollbar').mCustomScrollbar("update");
        }
    });


    /*---------------------------
                                  Scrollbar
    ---------------------------*/
    if ( !window.params.isMobile ) {
        $('.scrollbar').mCustomScrollbar({
            axis:"x",
            scrollButtons: {
                enable: true,
                scrollAmount: 40
            }
        });    
    }
    




    /*---------------------------
                                  Address form
    ---------------------------*/
    $('.js-activate-form').on('click', function(event) {
        event.preventDefault();
        $(this).parent('form').removeClass('not-active').addClass('active');
    });

    $('.js-submit-form').on('click', function(event) {
        event.preventDefault();
        // here place ajax function to update address
        $(this).parent('form').removeClass('active').addClass('not-active');
        $(this).siblings('address').text( $(this).siblings('textarea').val() )
    });




    /*---------------------------
                                  carusel
    ---------------------------*/
    $('.js-minus').on('click', function(event) {
        event.preventDefault();
        var i = $(this).siblings('input').val();
        if ( i > 1 ) {
            i--;
        } 
        $(this).siblings('input').val(i);
        $(this).siblings('input').trigger('changed')
    });

    $('.js-plus').on('click', function(event) {
        event.preventDefault();
        var i = $(this).siblings('input').val();
        i++;
        $(this).siblings('input').val(i);
        $(this).siblings('input').trigger('changed')
    });



    /*---------------------------
                                  Range slider
    ---------------------------*/

    $('.slider-range').each(function(index, el) {
        var slider = $(this);
        var min_input = slider.siblings('.slider-range-inputs').find('.min');
        var max_input = slider.siblings('.slider-range-inputs').find('.max');
        slider.slider({
            range: true,
            min: slider.attr('data-min')*1,
            max: slider.attr('data-max')*1,
            step: 10,
            values: [ slider.attr('data-min-val')*1, slider.attr('data-max-val')*1 ],
            change: function( event, ui ) {
                min_input.val(ui.values[0]);
                max_input.val(ui.values[1]);
            },
            slide: function( event, ui ) {
                min_input.val(ui.values[0]);
                max_input.val(ui.values[1]);
            }
        });
        min_input.val( slider.slider( "values", 0 ) );
        max_input.val( slider.slider( "values", 1 ) );
    });


    /*---------------------------
                                  Toggle filters
    ---------------------------*/
    $('.js-toggle-filters').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('form').slideToggle();
    });



    /*---------------------------
                                  List - Grid view
    ---------------------------*/
    $('.view-option').on('click', function(event) {
        event.preventDefault();
        $('.view-option').removeClass('active');
        $('.main').removeClass('list-view');
        
        $(this).addClass('active');
        if ( $(this).hasClass('list-view') ) {
            $('.main').addClass('list-view');
        }
    });


    /*---------------------------
                                  Checkout total card fixed on scroll
    ---------------------------*/
    if ( $(window).width() >= 1200 ) {
        $('.total-card').scrollToFixed( {
            marginTop: 40,
            limit: function() {
                var limit = $('.footer').offset().top - $('.total-card').outerHeight(true) - 70;
                return limit;
            },
            postFixed: function() {
                $(this).addClass('not-fixed');
            },
            preFixed: function() {
                $(this).removeClass('not-fixed');
                $(this).removeClass('bottom')
            },
            preAbsolute: function() {
                $(this).addClass('bottom')
            }
        });    
    }
    


    /*---------------------------
                                  Check email
    ---------------------------*/
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('.js-check-email').on('change', function(event) {
        event.preventDefault();
        var val = $(this).val();
        var parent = $(this).parents('.form-group');
        $(this).removeClass('not-valid');
        parent.find('.error').remove();

        if ( val ) {
            if ( !isEmail(val) ) {
                parent.append('<span class="error"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>Некоректый формат почты</span>');
                $(this).addClass('not-valid');
            }    
        }
        
    });


    /*---------------------------
                                  Compare-table
    ---------------------------*/
    $('.df-link').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $('.df-link').not($(this)).removeClass('active');
        $('.compare-table').find('.c-row').removeClass('hidden');

        if ( !$(this).hasClass('active') ) {
            if ( $(this).hasClass('js-similar') ) {
                $('.compare-table').find('.c-row.similar').addClass('hidden');
            } else if ( $(this).hasClass('js-different') ) {
                $('.compare-table').find('.c-row.different').addClass('hidden');
            }
        }

        $(this).toggleClass('active');
        
    });



    /*---------------------------
                                  Show password
    ---------------------------*/
    $('.js-show-password').on('click', function(event) {
        event.preventDefault();
        var input = $(this).siblings('input');

        if ( $(this).hasClass('active') ) {
            input.attr('type', 'password');
        } else {
            input.attr('type', 'text');
        }

        $(this).toggleClass('active');
    });


    /*---------------------------
                                  Load more button
    ---------------------------*/
    $('.load-more').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('loading');
        if ( $(this).hasClass('loading') ) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });





    /*---------------------------
                                  Product slider
    ---------------------------*/
    // On after slide change
    $('.product-slider').on('afterChange', function(event, slick, currentSlide){
        $('.product-thumbnails .thumbnail').removeClass('active');
        $('.product-thumbnails .thumbnail[data-index="'+currentSlide+'"]').addClass('active')
    });

    $('.product-slider').slick({
        arrows: true,
        dots: false,
        lazyLoad: 'ondemand',
        infinite: false,
        fade: true
    })

    $('.product-thumbnails .thumbnail').on('click', function(event) {
        event.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        $('.product-slider').slick( 'slickGoTo', $(this).attr('data-index') );
    });


    /*---------------------------
                                  Toggle mail instrucntions
    ---------------------------*/
    $('.js-toggle-instructions').on('click', function(event) {
        event.preventDefault();
        $(this).siblings('.instructions').slideToggle();
    });



    /*---------------------------
                                  Form submit
    ---------------------------*/
    $('.ajax-form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*---------------------------
                                  Google map init
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var styles = [];

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 16,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        var styledMapType=new google.maps.StyledMapType(styles,{name:'Styled'});
        map.mapTypes.set('Styled',styledMapType);
        map.setMapTypeId('Styled');

        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Site Title"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }

}); // end file