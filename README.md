#Responsive comparison table [DEMO](https://romanglitch.gitlab.io/repsonsive-table "DEMO")

##Usage:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- !!!Required Swiper CSS library!!! -->
    <link rel="stylesheet" href="swiper-bundle.min.css"/>

    <!-- !!!Required RespTable CSS library!!! -->
    <link rel="stylesheet" href="dist/resp-table.lib.css">
</head>
<body>

<!-- Table start -->
<div class="resp-table">
    <!-- Table header -->
    <div class="resp-table__header">
        <div class="swiper resp-table__header-swiper">
            <div class="swiper-wrapper resp-table__wrapper">

                <!-- Table header columns -->
                <div class="swiper-slide resp-table__col">
                    Header column content...
                </div>

                <!-- other columns... -->

            </div>
        </div>
        <!-- Table header navigation -->
        <div class="swiper-button-prev resp-table__prev"></div>
        <div class="swiper-button-next resp-table__next"></div>
    </div>

    <!-- Table body -->
    <div class="resp-table__body">

        <!-- Table section -->
        <div class="resp-table__row">
            <!-- Table section heading -->
            <div class="resp-table__row-heading">
                Table section heading...
            </div>

            <!-- Table section rows -->
            <div class="resp-table__row-content">
                <div class="resp-table__row-content-heading">
                    Row sub-heading
                </div>
                <div class="swiper resp-table__body-swiper">
                    <div class="swiper-wrapper resp-table__wrapper">
                        <!-- Row collumns -->
                        <div class="swiper-slide resp-table__col">
                            Row column content...
                        </div>

                        <!-- other row columns... -->
                    </div>
                </div>
            </div>

            <!-- other section rows -->
        </div>

        <!-- other sections... -->
    </div>
</div>
<!-- Table end -->

<!-- !!!Required Swiper JS library!!! -->
<script src="inc/swiper-bundle.min.js"></script>

<!-- !!!Required RespTable JS library!!! -->
<script src="dist/resp-table.lib.js"></script>
</body>
</html>
```