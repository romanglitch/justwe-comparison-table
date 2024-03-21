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
                '@0.75': {
                    slidesPerView: 2,
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

            const setHeight = () => {
                let heightParams = {
                    tableHeight: tableRootElement.getBoundingClientRect().height,
                    highestHeightOfHeaderColumns: Math.max(...Array.from(tableHeaderCol).map(column => column.getBoundingClientRect().height))
                }

                headerSwiperElement.style.height = `${heightParams.tableHeight}px`
                tableHeader.style.height = `${heightParams.highestHeightOfHeaderColumns}px`
            }

            const setStickyTrigger = () => {
                const stickyElement = tableHeader

                const observer = new IntersectionObserver(
                    ([e]) => e.target.classList.toggle('--css-sticky', e.intersectionRatio < 1),
                    {
                        threshold: [1],
                        rootMargin: '-1px 0px 0px 0px',
                    }
                );

                observer.observe(stickyElement)
            }

            let bodySwipersProcessed = 0
            let bodySwipersArray = []

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
                        observerUpdate: () => {
                            setHeight()
                        }
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
                            nextEl: selectors.swiper.headerSwiperNavNext,
                            prevEl: selectors.swiper.headerSwiperNavPrev,
                        },
                        on: {
                            init: () => {
                                setHeight()
                                setStickyTrigger()
                            },
                            observerUpdate: () => {
                                setHeight()
                            }
                        }
                    })
                }
            })
        })
    } else {
        console.info('Resp table has stopped, the Swiper library is missing.')
    }
})();