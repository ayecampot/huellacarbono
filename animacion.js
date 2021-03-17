$(document).ready(function () {
    var mySwipper = new Swiper('.swiper-container', {
        effect: "fade",
        speed: 1500,

        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
    })

    mySwipper.on('slideChangeTransitionStart', function () {
        anime({
            targets: '.swiper-slide-active .slide-right img',
            scale: [1.2, 1],
            opacity: [0, 1],
            easing: 'easeInOutQuart'
        });
        anime({
            targets: '.swiper-slide-active .slide-left .element',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(150, {
                start: 500
            }),
            easing: 'easeInOutQuart'
        });
    })


    mySwipper.on('slideNextTransitionStart', function () {
        animeForwardNavigation(this);
    })

    mySwipper.on('slidePrevTransitionStart', function () {
        animeBackwardsNavigation(this);
    })

    anime({
        targets: 'header',
        scaleX: [0, 1],
        translateX: [-400, 0],
        opacity: [0, 1],
        easing: 'easeInOutQuart'
    });

    anime({
        targets: '.logo img',
        rotate: 360,
        opacity: [0, 1],
        delay: 500,
        easing: 'easeInOutQuart'
    });

    anime({
        targets: '.menu li',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {
            start: 700
        }),
        easing: 'easeInOutQuart'
    });

    anime({
        targets: '.slide-right img',
        scale: [1.2, 1],
        opacity: [0, 1],
        delay: anime.stagger(200, {
            start: 2000,
            from: 'last',
        }),
        easing: 'easeInOutQuart',
    });

    anime({
        targets: '.swiper-slide-active .slide-left .element',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(250, {
            start: 1700
        }),
        easing: 'easeInOutQuart',
    });

    anime({
        targets: '.swiper-button-prev',
        translateY: [-100, 0],
        opacity: [0, 1],
        delay: 3000,
        easing: 'easeInOutQuart',
    });

    anime({
        targets: '.swiper-button-next',
        translateY: [100, 0],
        opacity: [0, 1],
        delay: 3000,
        easing: 'easeInOutQuart',
    });

})

function animeForwardNavigation(navigation) {
    switch (navigation.activeIndex) {
        case 4:
            animeNewIcon("reload")
            toggleRightIcon("reload")
            toggleRightIcon("calculo");
            break;
        case 3:
            animeNewIcon("calculo")
            toggleRightIcon("next-slide-arrow");
            toggleRightIcon("calculo");
            break;
        case 1:
            animeClickedIcon("next-slide-arrow")
            animeNewIcon("prev-slide-arrow")
            toggleLeftIcon("prev-slide-arrow")
            break;
        default:
            animeClickedIcon("next-slide-arrow")
    }
}

function animeBackwardsNavigation(navigation) {
    switch (navigation.activeIndex) {
        case 3:
            animeNewIcon("calculo")
            toggleRightIcon("calculo")
            toggleRightIcon("reload")
            break;
        case 2:
            animeNewIcon("next-slide-arrow")
            toggleRightIcon("next-slide-arrow")
            toggleRightIcon("calculo")
            break;
        case 0:
            toggleLeftIcon("prev-slide-arrow")
            break;
        default:
            break;
    }
    animeClickedIcon("prev-slide-arrow")
}

function animeNewIcon(target) {
    anime({
        targets: "#" + target,
        scale: [1.2, 1],
        opacity: [0.5, 1],
        easing: 'easeInOutQuart'
    });
}

function animeClickedIcon(target) {
    anime({
        targets: "#" + target,
        opacity: [0.5, 1],
        easing: 'easeInOutQuart'
    });
}

function toggleRightIcon(target) {
    $("#" + target).toggleClass('swiper-button-hidden swiper-button-next');
}

function toggleLeftIcon(target) {
    $("#" + target).toggleClass('swiper-button-hidden swiper-button-prev');
}