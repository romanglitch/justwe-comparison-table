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

        const elements = {
            root: document.querySelectorAll(selectors.tableRoot)
        }

        const swiperParams = {
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
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

        elements.root.forEach(tableRootElement => {
            const headerSwiperElement = tableRootElement.querySelector(selectors.swiper.headerSwiper)
            const bodySwiperElements = tableRootElement.querySelectorAll(selectors.swiper.bodySwiper)

            const tableHeader = tableRootElement.querySelector(selectors.tableHeader)
            const tableHeaderCol = headerSwiperElement.querySelectorAll(selectors.tableCol)

            let bodySwipersProcessed = 0
            let bodySwipersArray = []

            const isOneColumn = (length) => length < 2 ? tableRootElement.classList.add('--one-column') : tableRootElement.classList.remove('--one-column')

            const setHeight = () => {
                let heightParams = {
                    tableHeight: tableRootElement.getBoundingClientRect().height,
                    highestHeightOfHeaderColumns: Math.max(...Array.from(tableHeaderCol).map(column => column.getBoundingClientRect().height))
                }

                if (window.innerWidth < 768) {
                    headerSwiperElement.style.height = `${heightParams.tableHeight}px`
                }

                tableHeader.style.height = `${heightParams.highestHeightOfHeaderColumns}px`
            }

            bodySwiperElements.forEach(bodySwiper => {
                bodySwipersProcessed++

                new Swiper(bodySwiper, {
                    ...swiperParams,
                    allowTouchMove: false,
                    on: {
                        init: swiperInstance => {
                            bodySwipersArray.push(swiperInstance)
                            setHeight()
                        },
                        observerUpdate: () => setHeight()
                    }
                })

                if(bodySwipersProcessed === bodySwiperElements.length) {
                    new Swiper(headerSwiperElement, {
                        ...swiperParams,
                        touchEventsTarget: 'container',
                        controller: {
                            control: bodySwipersArray
                        },
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
                    })
                }
            })
        })
    } else {
        console.info('Resp table has stopped, the Swiper library is missing.')
    }
})();