<?php
include '../include/functions.php';

header("Content-type: text/css");
?>
:root {
  --lightColor: #ffffff;
  --darkColor: #2F2F2F;
}

.courseRow{background-color: <?=$localeInfo["colorMain2"]?>;width: 100%;}
.desktopIndexPad{background-color: <?=$localeInfo["colorMain2"]?>;}
.bg-menu-header{background-image: url(../img/<?=$idLocale?>/<?=$localeInfo["background"]?>);}

#modalTimer .modal-footer button{
    background-color: <?=$localeInfo["colorMain1"]?>;
    border-color: <?=$localeInfo["colorMain1"]?>;
}
div.scrollmenu a:focus,.nav-link,.navbar-nav .nav-link.active, .navbar-nav .show>.nav-link,div.scrollmenu a  {color: var(--darkColor)!important;}
body,.navbar-collapse{background-color: #EDEBE7;}
div.scrollmenu a{opacity: 0.6;}
.bg-head {background-color: <?=$localeInfo["colorMain2"]?>;}
<?php
if ($idLocale==2){
    //customizzazioni THE LAB
?>
@font-face {
    font-family: 'Century Gothic Bold'; /*a name to be used later*/
    src: url('/font/CenturyGothicPaneuropeanBold.ttf'); /*URL to font*/
}
@font-face {
    font-family: 'Century Gothic Light'; /*a name to be used later*/
    src: url('/font/CenturyGothicPaneuropeanLight.ttf'); /*URL to font*/
}
@font-face {
    font-family: 'Century Gothic Semibold'; /*a name to be used later*/
    src: url('/font/CenturyGothicPaneuropeanSemiBold.ttf'); /*URL to font*/
}
@font-face {
    font-family: 'Century Gothic Paneuropean';
    src: url('/font/CenturyGothicPaneuropean-Light.woff2') format('woff2'),
        url('/font/CenturyGothicPaneuropean-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}
.stickyNavScroll{background-image: url(../img/<?=$idLocale?>/bg-ardesia-mobile-3.jpg);}
body{background-image: url(../img/<?=$idLocale?>/bg-ardesia-mobile-3.jpg);background-size: cover;background-repeat: no-repeat;min-height: 100vh;}

#modalTimer .modal-footer button,.boxAlert p b {font-family: 'Century Gothic Bold';}
div.scrollmenu a,.container.whiteBoxCourse b{font-family: 'Century Gothic Semibold', sans-serif;}
.courseBox p{font-family: 'Century Gothic Paneuropean', sans-serif;}
body,.boxAlert p,.boxAlert {font-family: 'Century Gothic Light';}
div.scrollmenu a:focus,.nav-link,.navbar-nav .nav-link.active, .navbar-nav .show>.nav-link,div.scrollmenu a  {color: var(--lightColor)!important;}

@media (max-width: 496px) and (max-height: 1000px){
    .logoNav {width: 15vw;}
}
<?
}
?>