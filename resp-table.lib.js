(function (){
    'use strict'

    if (typeof Swiper !== 'undefined') {
        const selectors = {
            tableRoot: '.resp-table',
            tableHeader: '.resp-table__header',
            tableBody: '.resp-table__body',
            tableCol: '.resp-table__col',
            swiper: {
                headerSwiper: '.resp-table__header-swiper',
                headerSwiperNavPrev: '.resp-table__prev',
                headerSwiperNavNext: '.resp-table__next',
                bodySwiper: '.resp-table__body-swiper'
            }
        }

        const tableRoot = document.querySelectorAll(selectors.tableRoot)

        const swiperParams = {
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            touchEventsTarget: 'container',
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '@1.00': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                '@1.50': {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        }

        tableRoot.forEach(tableRootElement => {
            let bodySwipersArray = []

            const isOneColumn = (length) => length < 2 ? tableRootElement.classList.add('--one-column') : tableRootElement.classList.remove('--one-column')
            const setHeight = () => {
                let heightParams = {
                    tableHeight: tableRootElement.getBoundingClientRect().height,
                    highestHeightOfHeaderColumns: Math.max(...Array.from(tableRootElement.querySelector(selectors.swiper.headerSwiper).querySelectorAll(selectors.tableCol)).map(column => column.getBoundingClientRect().height))
                }

                // Swipe anywhere on mobile
                if (window.innerWidth < 992) {
                    tableRootElement.querySelector(selectors.swiper.headerSwiper).style.height = `${heightParams.tableHeight}px`
                }

                tableRootElement.querySelector(selectors.tableHeader).style.height = `${heightParams.highestHeightOfHeaderColumns}px`
            }

            const headerSwiperInst = new Swiper(tableRootElement.querySelector(selectors.swiper.headerSwiper), {
                ...swiperParams,
                navigation: {
                    nextEl: tableRootElement.querySelector(selectors.swiper.headerSwiperNavNext),
                    prevEl: tableRootElement.querySelector(selectors.swiper.headerSwiperNavPrev),
                },
                on: {
                    init: () => setHeight(),
                    observerUpdate: () => setHeight(),
                    resize: () => setHeight(),
                    slidesLengthChange: swiperInstance => isOneColumn(swiperInstance.slides.length),
                }
            });

            tableRootElement.querySelectorAll(selectors.swiper.bodySwiper).forEach((bodySwiper) => {
                let bodySwiperInst = new Swiper(bodySwiper, {
                    ...swiperParams,
                    on: {
                        init: () => setHeight(),
                        observerUpdate: () => setHeight()
                    }
                });

                bodySwipersArray.push(bodySwiperInst);

                bodySwiperInst.controller.control = headerSwiperInst;
            });

            headerSwiperInst.controller.control = bodySwipersArray;
        })
    } else {
        console.info('Resp table has stopped, the Swiper library is missing.')
    }
})();