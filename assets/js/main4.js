!(function($) {
    "use strict";
  
    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 1;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();
  
          var scrollto = target.offset().top - scrolltoOffset;
  
          if ($(this).attr("href") == '#header') {
            scrollto = 0;
          }
  
          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');
  
          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }
  
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
          return false;
        }
      }
    });
  
    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
      if (window.location.hash) {
        var initial_nav = window.location.hash;
        if ($(initial_nav).length) {
          var scrollto = $(initial_nav).offset().top - scrolltoOffset;
          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');
        }
      }
    });
  
    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, .mobile-nav');
  
    $(window).on('scroll', function() {
      var cur_pos = $(this).scrollTop() + 200;
  
      nav_sections.each(function() {
        var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();
  
        if (cur_pos >= top && cur_pos <= bottom) {
          if (cur_pos <= bottom) {
            main_nav.find('li').removeClass('active');
          }
          main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
        }
        if (cur_pos < 300) {
          $(".nav-menu ul:first li:first").addClass('active');
        }
      });
    });
  
    // Mobile Navigation
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
  
      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
      });
  
      $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
      });
  
      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }
  
    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
      } else {
        $('#header').removeClass('header-scrolled');
      }
    });
  
    if ($(window).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    }
  
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#index-a-tg').css("color", "rgb(48, 48, 48)");
      } else {
        $('#index-a-tg').css("color", "white");
      }
    });
  
    // if ($(window).scrollTop() > 100) {
    //   $('#index-a-tg').css("color", "white");
    // }
  
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.nav-menu a.index-a-tg').css("color", "rgb(48, 48, 48)");
      } else {
        $('.nav-menu a.index-a-tg').css("color", "white");
      }
    });
  
    // if ($(window).scrollTop() > 100) {
    //   $('.nav-menu a').css("color", "white");
    // }
  
    // Stick the header at top on scroll
    $("#header").sticky({
      topSpacing: 0,
      zIndex: '50'
    });
  
    // Back to top button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
  
    $('.back-to-top').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });
    // Initiate the venobox plugin
    $(window).on('load', function() {
      $('.venobox').venobox();
    });
  
    // Clients carousel (uses the Owl Carousel library)
    $(".clients-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 2
        },
        768: {
          items: 4
        },
        900: {
          items: 6
        }
      }
    });
  
    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  
    // Porfolio isotope and filter
    $(window).on('load', function() {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
  
      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');
  
        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
        aos_init();
      });
  
      // Initiate venobox (lightbox feature used in portofilo)
      $(document).ready(function() {
        $('.venobox').venobox();
      });
    });
  
    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  
    // Init AOS
    function aos_init() {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out-back",
        once: true
      });
    }
    $(window).on('load', function() {
      aos_init();
    });
  
  })(jQuery);
  
  //Carousel-Aniversary
  
  const { useState, useRef, useEffect } = React;
  
  const useTilt = active => {
    const ref = useRef(null);
  
    useEffect(() => {
      if (!ref.current || !active) {
        return;
      }
  
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined };
  
  
      let el = ref.current;
  
      const handleMouseMove = e => {
        if (!el) {
          return;
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;
  
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };
  
      el.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    }, [active]);
  
    return ref;
  };
  
  const Slide = ({
    image,
    title,
    subtitle,
    description,
    offset,
    isPageBackground }) =>
  {
    const active = offset === 0 ? true : null,
    ref = useTilt(active);
  
    return /*#__PURE__*/(
      React.createElement("div", {
        ref: ref,
        className: "slide",
        "data-active": active,
        style: {
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1 } },
  
      
      /*isPageBackground && /*#__PURE__*/
      /*React.createElement("div", {
        className: "slideBackground",
        style: {
          backgroundImage: `url("../assets/img/carousel4.jpeg")` } }),*/
  
      React.createElement("div", {
        className: "slideContent",
        style: {
          backgroundImage: `url('${image}')` } }, /*#__PURE__*/
      
  
  
      React.createElement("div", { className: "slideContentInner" },
      title && /*#__PURE__*/
      React.createElement("h2", { className: "slideTitle", dir: "auto" },
      title),
  
  
      subtitle && /*#__PURE__*/
      React.createElement("h3", { className: "slideSubtitle", dir: "auto" },
      subtitle),
  
  
      description && /*#__PURE__*/
      React.createElement("p", { className: "slideDescription", dir: "auto" },
      description)))));
  
  
  
  
  
  
  };
  
  Slide.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    offset: PropTypes.number.isRequired,
    isPageBackground: PropTypes.bool };
  
  
  const Carousel = ({ slides, isPageBackground }) => {
    const [slideIndex, setSlideIndex] = useState(0);
  
    const handlePrevSlide = () => {
      setSlideIndex(prev => prev === 0 ? slides.length - 1 : prev - 1);
    };
  
    const handleNextSlide = () => {
      setSlideIndex(prev => (prev + 1) % slides.length);
    };
  
    return /*#__PURE__*/(
      React.createElement("section", { className: "slidesWrapper" }, /*#__PURE__*/
      React.createElement("div", { className: "slides" }, /*#__PURE__*/
      React.createElement("button", { className: "prevSlideBtn", onClick: handlePrevSlide }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-chevron-left" })),
  
  
      [...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (slideIndex - i);
  
        if (typeof slide === "string") {
          return /*#__PURE__*/(
            React.createElement(Slide, {
              image: slide,
              offset: offset,
              isPageBackground: isPageBackground,
              key: i }));
  
  
        } else {
          return /*#__PURE__*/(
            React.createElement(Slide, {
              image: slide.image,
              title: slide.title,
              subtitle: slide.subtitle,
              description: slide.description,
              offset: offset,
              isPageBackground: isPageBackground,
              key: i }));
  
  
        }
      }), /*#__PURE__*/
      React.createElement("button", { className: "nextSlideBtn", onClick: handleNextSlide }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-chevron-right" })))));
  
  
  
  
  };
  
  Carousel.propTypes = {
    slides: PropTypes.array.isRequired,
    isPageBackground: PropTypes.bool };
  
  
  const slides = [
  {
    id: 1,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic1.webp" },
  
  {
    id: 2,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic2.webp" },
  
  {
    id: 3,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic3.webp" },
    
  {
    id: 4,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic4.webp" },

  {
    id: 5,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic5.webp" },
  
  {
    id: 6,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic6.webp" },
  
  {
    id: 7,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic7.webp" },
  
  {
    id: 8,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic8.webp" },
    
  {
    id: 9,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic9.webp" },

  {
    id: 10,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic10.webp" },

  {
    id: 11,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic11.webp" },

{
    id: 12,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic12.webp" },
  
  {
    id: 13,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic13.webp" },
  
  {
    id: 14,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic14.webp" },
    
  {
    id: 15,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic15.webp" },

  {
    id: 16,
    image: "../assets/img/Alterdime/alterdime22/alterdime2022_pic16.webp" },
  
  
  ];
      
    
  
  
  
  
  const app = /*#__PURE__*/React.createElement(Carousel, { slides: slides, isPageBackground: true });
  
  ReactDOM.render(app, document.querySelector("#app"));
  
  
  //Contact-Us
  $("#contact").validate({
    rules: {
      website: {
        required: true,
        url: true
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
   });
  
  