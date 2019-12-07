# goatpi project
Monitoring system for my goats.  Raspberry pi, sensors, camera.

## goat pi project
* goatpi_nanny
* goatpi_billy
* goatpi_kid

## goatpi_nanny
* Running on a rapsberry pi v3, collects data from the goatpi_kid(s).
* Collects images and live video feed from the cameras.
* Provides the main display for monitoring via local lan.
* Pushes images and data along to goatpi_billy.

## goatpi_billy (goatpi.com)
* cloud based, collects data and images from goatpi_nanny for monitoring via internet.

## goatpi_kid
* Running on a raspberry pi zero w, collects data from attached sensors and pushes data to goatpi_nanny.