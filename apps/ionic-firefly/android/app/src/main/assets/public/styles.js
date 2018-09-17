(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/global.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/global.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Shared across all platforms and apps\n * You may define a set of global variables accessible across entire workspace here\n */\n/*\nToDo: Figure this out\n$gm-text-wrap-header-4:           @include ellipsis;\n$gm-text-wrap-header-3:           @include ellipsis;\n$gm-text-wrap-header-2:           normal;\n$gm-text-wrap-header-1:           normal;\n$gm-text-wrap-headline:           normal;\n$gm-text-wrap-title:              @include ellipsis;\n$gm-text-wrap-subhead:            normal;\n$gm-text-wrap-body:               normal;\n$gm-text-wrap-caption:            @include ellipsis;\n$gm-text-wrap-button:             @include ellipsis;\n*/\n/** Ionic CSS Variables **/\n.mapboxgl-map {\n    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;\n    overflow: hidden;\n    position: relative;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.mapboxgl-map:-webkit-full-screen {\n    width: 100%;\n    height: 100%;\n}\n.mapboxgl-canary {\n    background-color: salmon;\n}\n.mapboxgl-canvas-container.mapboxgl-interactive,\n.mapboxgl-ctrl-group > button.mapboxgl-ctrl-compass {\n    cursor: -webkit-grab;\n    cursor: grab;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.mapboxgl-canvas-container.mapboxgl-interactive:active,\n.mapboxgl-ctrl-group > button.mapboxgl-ctrl-compass:active {\n    cursor: -webkit-grabbing;\n    cursor: grabbing;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas {\n    touch-action: pan-x pan-y;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-drag-pan,\n.mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas {\n    touch-action: pinch-zoom;\n}\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,\n.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas {\n    touch-action: none;\n}\n.mapboxgl-ctrl-top-left,\n.mapboxgl-ctrl-top-right,\n.mapboxgl-ctrl-bottom-left,\n.mapboxgl-ctrl-bottom-right { position: absolute; pointer-events: none; z-index: 2; }\n.mapboxgl-ctrl-top-left     { top: 0; left: 0; }\n.mapboxgl-ctrl-top-right    { top: 0; right: 0; }\n.mapboxgl-ctrl-bottom-left  { bottom: 0; left: 0; }\n.mapboxgl-ctrl-bottom-right { right: 0; bottom: 0; }\n.mapboxgl-ctrl { clear: both; pointer-events: auto; }\n.mapboxgl-ctrl-top-left .mapboxgl-ctrl     { margin: 10px 0 0 10px; float: left; }\n.mapboxgl-ctrl-top-right .mapboxgl-ctrl    { margin: 10px 10px 0 0; float: right; }\n.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl  { margin: 0 0 10px 10px; float: left; }\n.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl { margin: 0 10px 10px 0; float: right; }\n.mapboxgl-ctrl-group {\n    border-radius: 4px;\n    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    background: #fff;\n}\n.mapboxgl-ctrl-group > button {\n    width: 30px;\n    height: 30px;\n    display: block;\n    padding: 0;\n    outline: none;\n    border: 0;\n    box-sizing: border-box;\n    background-color: transparent;\n    cursor: pointer;\n}\n.mapboxgl-ctrl-group > button + button {\n    border-top: 1px solid #ddd;\n}\n/* https://bugzilla.mozilla.org/show_bug.cgi?id=140562 */\n.mapboxgl-ctrl > button::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n.mapboxgl-ctrl > button:hover {\n    background-color: rgba(0, 0, 0, 0.05);\n}\n.mapboxgl-ctrl-icon,\n.mapboxgl-ctrl-icon > .mapboxgl-ctrl-compass-arrow {\n    speak: none;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.mapboxgl-ctrl-icon {\n    padding: 5px;\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-out {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath style='fill:%23333333;' d='m 7,9 c -0.554,0 -1,0.446 -1,1 0,0.554 0.446,1 1,1 l 6,0 c 0.554,0 1,-0.446 1,-1 0,-0.554 -0.446,-1 -1,-1 z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath style='fill:%23333333;' d='M 10 6 C 9.446 6 9 6.4459904 9 7 L 9 9 L 7 9 C 6.446 9 6 9.446 6 10 C 6 10.554 6.446 11 7 11 L 9 11 L 9 13 C 9 13.55401 9.446 14 10 14 C 10.554 14 11 13.55401 11 13 L 11 11 L 13 11 C 13.554 11 14 10.554 14 10 C 14 9.446 13.554 9 13 9 L 11 9 L 11 7 C 11 6.4459904 10.554 6 10 6 z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate:disabled {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23aaa'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E %3Cpath d='M 10,4 C 9,4 9,5 9,5 L 9,5.1 C 7.0357113,5.5006048 5.5006048,7.0357113 5.1,9 L 5,9 c 0,0 -1,0 -1,1 0,1 1,1 1,1 l 0.1,0 c 0.4006048,1.964289 1.9357113,3.499395 3.9,3.9 L 9,15 c 0,0 0,1 1,1 1,0 1,-1 1,-1 l 0,-0.1 c 1.964289,-0.400605 3.499395,-1.935711 3.9,-3.9 l 0.1,0 c 0,0 1,0 1,-1 C 16,9 15,9 15,9 L 14.9,9 C 14.499395,7.0357113 12.964289,5.5006048 11,5.1 L 11,5 c 0,0 0,-1 -1,-1 z m 0,2.5 c 1.932997,0 3.5,1.5670034 3.5,3.5 0,1.932997 -1.567003,3.5 -3.5,3.5 C 8.0670034,13.5 6.5,11.932997 6.5,10 6.5,8.0670034 8.0670034,6.5 10,6.5 Z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E %3Cpath d='M 10,4 C 9,4 9,5 9,5 L 9,5.1 C 7.0357113,5.5006048 5.5006048,7.0357113 5.1,9 L 5,9 c 0,0 -1,0 -1,1 0,1 1,1 1,1 l 0.1,0 c 0.4006048,1.964289 1.9357113,3.499395 3.9,3.9 L 9,15 c 0,0 0,1 1,1 1,0 1,-1 1,-1 l 0,-0.1 c 1.964289,-0.400605 3.499395,-1.935711 3.9,-3.9 l 0.1,0 c 0,0 1,0 1,-1 C 16,9 15,9 15,9 L 14.9,9 C 14.499395,7.0357113 12.964289,5.5006048 11,5.1 L 11,5 c 0,0 0,-1 -1,-1 z m 0,2.5 c 1.932997,0 3.5,1.5670034 3.5,3.5 0,1.932997 -1.567003,3.5 -3.5,3.5 C 8.0670034,13.5 6.5,11.932997 6.5,10 6.5,8.0670034 8.0670034,6.5 10,6.5 Z'/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting {\n    -webkit-animation: mapboxgl-spin 2s infinite linear;\n    animation: mapboxgl-spin 2s infinite linear;\n}\n@-webkit-keyframes mapboxgl-spin {\n    0% { -webkit-transform: rotate(0deg); }\n    100% { -webkit-transform: rotate(360deg); }\n}\n@keyframes mapboxgl-spin {\n    0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n    100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-fullscreen {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M 5 4 C 4.5 4 4 4.5 4 5 L 4 6 L 4 9 L 4.5 9 L 5.7773438 7.296875 C 6.7771319 8.0602131 7.835765 8.9565728 8.890625 10 C 7.8257121 11.0633 6.7761791 11.951675 5.78125 12.707031 L 4.5 11 L 4 11 L 4 15 C 4 15.5 4.5 16 5 16 L 9 16 L 9 15.5 L 7.2734375 14.205078 C 8.0428931 13.187886 8.9395441 12.133481 9.9609375 11.068359 C 11.042371 12.14699 11.942093 13.2112 12.707031 14.21875 L 11 15.5 L 11 16 L 14 16 L 15 16 C 15.5 16 16 15.5 16 15 L 16 14 L 16 11 L 15.5 11 L 14.205078 12.726562 C 13.177985 11.949617 12.112718 11.043577 11.037109 10.009766 C 12.151856 8.981061 13.224345 8.0798624 14.228516 7.3046875 L 15.5 9 L 16 9 L 16 5 C 16 4.5 15.5 4 15 4 L 11 4 L 11 4.5 L 12.703125 5.7773438 C 11.932647 6.7864834 11.026693 7.8554712 9.9707031 8.9199219 C 8.9584739 7.8204943 8.0698767 6.7627188 7.3046875 5.7714844 L 9 4.5 L 9 4 L 6 4 L 5 4 z '/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-shrink {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath style='fill:%23000000;' d='M 4.2421875 3.4921875 A 0.750075 0.750075 0 0 0 3.71875 4.78125 L 5.9648438 7.0273438 L 4 8.5 L 4 9 L 8 9 C 8.500001 8.9999988 9 8.4999992 9 8 L 9 4 L 8.5 4 L 7.0175781 5.9550781 L 4.78125 3.71875 A 0.750075 0.750075 0 0 0 4.2421875 3.4921875 z M 15.734375 3.4921875 A 0.750075 0.750075 0 0 0 15.21875 3.71875 L 12.984375 5.953125 L 11.5 4 L 11 4 L 11 8 C 11 8.4999992 11.499999 8.9999988 12 9 L 16 9 L 16 8.5 L 14.035156 7.0273438 L 16.28125 4.78125 A 0.750075 0.750075 0 0 0 15.734375 3.4921875 z M 4 11 L 4 11.5 L 5.9648438 12.972656 L 3.71875 15.21875 A 0.75130096 0.75130096 0 1 0 4.78125 16.28125 L 7.0273438 14.035156 L 8.5 16 L 9 16 L 9 12 C 9 11.500001 8.500001 11.000001 8 11 L 4 11 z M 12 11 C 11.499999 11.000001 11 11.500001 11 12 L 11 16 L 11.5 16 L 12.972656 14.035156 L 15.21875 16.28125 A 0.75130096 0.75130096 0 1 0 16.28125 15.21875 L 14.035156 12.972656 L 16 11.5 L 16 11 L 12 11 z '/%3E %3C/svg%3E\");\n}\n.mapboxgl-ctrl-icon.mapboxgl-ctrl-compass > .mapboxgl-ctrl-compass-arrow {\n    width: 20px;\n    height: 20px;\n    margin: 5px;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpolygon fill='%23333333' points='6,9 10,1 14,9'/%3E %3Cpolygon fill='%23CCCCCC' points='6,11 10,19 14,11 '/%3E %3C/svg%3E\");\n    background-repeat: no-repeat;\n    display: inline-block;\n}\na.mapboxgl-ctrl-logo {\n    width: 85px;\n    height: 21px;\n    margin: 0 0 -3px -3px;\n    display: block;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 84.49 21' style='enable-background:new 0 0 84.49 21;' xml:space='preserve'%3E%3Cg%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M83.25,14.26c0,0.12-0.09,0.21-0.21,0.21h-1.61c-0.13,0-0.24-0.06-0.3-0.17l-1.44-2.39l-1.44,2.39 c-0.06,0.11-0.18,0.17-0.3,0.17h-1.61c-0.04,0-0.08-0.01-0.12-0.03c-0.09-0.06-0.13-0.19-0.06-0.28l0,0l2.43-3.68L76.2,6.84 c-0.02-0.03-0.03-0.07-0.03-0.12c0-0.12,0.09-0.21,0.21-0.21h1.61c0.13,0,0.24,0.06,0.3,0.17l1.41,2.36l1.4-2.35 c0.06-0.11,0.18-0.17,0.3-0.17H83c0.04,0,0.08,0.01,0.12,0.03c0.09,0.06,0.13,0.19,0.06,0.28l0,0l-2.37,3.63l2.43,3.67 C83.24,14.18,83.25,14.22,83.25,14.26z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M66.24,9.59c-0.39-1.88-1.96-3.28-3.84-3.28c-1.03,0-2.03,0.42-2.73,1.18V3.51c0-0.13-0.1-0.23-0.23-0.23h-1.4 c-0.13,0-0.23,0.11-0.23,0.23v10.72c0,0.13,0.1,0.23,0.23,0.23h1.4c0.13,0,0.23-0.11,0.23-0.23V13.5c0.71,0.75,1.7,1.18,2.73,1.18 c1.88,0,3.45-1.41,3.84-3.29C66.37,10.79,66.37,10.18,66.24,9.59L66.24,9.59z M62.08,13c-1.32,0-2.39-1.11-2.41-2.48v-0.06 c0.02-1.38,1.09-2.48,2.41-2.48s2.42,1.12,2.42,2.51S63.41,13,62.08,13z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M71.67,6.32c-1.98-0.01-3.72,1.35-4.16,3.29c-0.13,0.59-0.13,1.19,0,1.77c0.44,1.94,2.17,3.32,4.17,3.3 c2.35,0,4.26-1.87,4.26-4.19S74.04,6.32,71.67,6.32z M71.65,13.01c-1.33,0-2.42-1.12-2.42-2.51s1.08-2.52,2.42-2.52 c1.33,0,2.42,1.12,2.42,2.51S72.99,13,71.65,13.01L71.65,13.01z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M62.08,7.98c-1.32,0-2.39,1.11-2.41,2.48v0.06C59.68,11.9,60.75,13,62.08,13s2.42-1.12,2.42-2.51 S63.41,7.98,62.08,7.98z M62.08,11.76c-0.63,0-1.14-0.56-1.17-1.25v-0.04c0.01-0.69,0.54-1.25,1.17-1.25 c0.63,0,1.17,0.57,1.17,1.27C63.24,11.2,62.73,11.76,62.08,11.76z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M71.65,7.98c-1.33,0-2.42,1.12-2.42,2.51S70.32,13,71.65,13s2.42-1.12,2.42-2.51S72.99,7.98,71.65,7.98z M71.65,11.76c-0.64,0-1.17-0.57-1.17-1.27c0-0.7,0.53-1.26,1.17-1.26s1.17,0.57,1.17,1.27C72.82,11.21,72.29,11.76,71.65,11.76z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M45.74,6.53h-1.4c-0.13,0-0.23,0.11-0.23,0.23v0.73c-0.71-0.75-1.7-1.18-2.73-1.18 c-2.17,0-3.94,1.87-3.94,4.19s1.77,4.19,3.94,4.19c1.04,0,2.03-0.43,2.73-1.19v0.73c0,0.13,0.1,0.23,0.23,0.23h1.4 c0.13,0,0.23-0.11,0.23-0.23V6.74c0-0.12-0.09-0.22-0.22-0.22C45.75,6.53,45.75,6.53,45.74,6.53z M44.12,10.53 C44.11,11.9,43.03,13,41.71,13s-2.42-1.12-2.42-2.51s1.08-2.52,2.4-2.52c1.33,0,2.39,1.11,2.41,2.48L44.12,10.53z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M41.71,7.98c-1.33,0-2.42,1.12-2.42,2.51S40.37,13,41.71,13s2.39-1.11,2.41-2.48v-0.06 C44.1,9.09,43.03,7.98,41.71,7.98z M40.55,10.49c0-0.7,0.52-1.27,1.17-1.27c0.64,0,1.14,0.56,1.17,1.25v0.04 c-0.01,0.68-0.53,1.24-1.17,1.24C41.08,11.75,40.55,11.19,40.55,10.49z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M52.41,6.32c-1.03,0-2.03,0.42-2.73,1.18V6.75c0-0.13-0.1-0.23-0.23-0.23h-1.4c-0.13,0-0.23,0.11-0.23,0.23 v10.72c0,0.13,0.1,0.23,0.23,0.23h1.4c0.13,0,0.23-0.1,0.23-0.23V13.5c0.71,0.75,1.7,1.18,2.74,1.18c2.17,0,3.94-1.87,3.94-4.19 S54.58,6.32,52.41,6.32z M52.08,13.01c-1.32,0-2.39-1.11-2.42-2.48v-0.07c0.02-1.38,1.09-2.49,2.4-2.49c1.32,0,2.41,1.12,2.41,2.51 S53.4,13,52.08,13.01L52.08,13.01z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M52.08,7.98c-1.32,0-2.39,1.11-2.42,2.48v0.06c0.03,1.38,1.1,2.48,2.42,2.48s2.41-1.12,2.41-2.51 S53.4,7.98,52.08,7.98z M52.08,11.76c-0.63,0-1.14-0.56-1.17-1.25v-0.04c0.01-0.69,0.54-1.25,1.17-1.25c0.63,0,1.17,0.58,1.17,1.27 S52.72,11.76,52.08,11.76z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M36.08,14.24c0,0.13-0.1,0.23-0.23,0.23h-1.41c-0.13,0-0.23-0.11-0.23-0.23V9.68c0-0.98-0.74-1.71-1.62-1.71 c-0.8,0-1.46,0.7-1.59,1.62l0.01,4.66c0,0.13-0.11,0.23-0.23,0.23h-1.41c-0.13,0-0.23-0.11-0.23-0.23V9.68 c0-0.98-0.74-1.71-1.62-1.71c-0.85,0-1.54,0.79-1.6,1.8v4.48c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23V6.74 c0.01-0.13,0.1-0.22,0.23-0.22h1.4c0.13,0,0.22,0.11,0.23,0.22V7.4c0.5-0.68,1.3-1.09,2.16-1.1h0.03c1.09,0,2.09,0.6,2.6,1.55 c0.45-0.95,1.4-1.55,2.44-1.56c1.62,0,2.93,1.25,2.9,2.78L36.08,14.24z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M84.34,13.59l-0.07-0.13l-1.96-2.99l1.94-2.95c0.44-0.67,0.26-1.56-0.41-2.02c-0.02,0-0.03,0-0.04-0.01 c-0.23-0.15-0.5-0.22-0.78-0.22h-1.61c-0.56,0-1.08,0.29-1.37,0.78L79.72,6.6l-0.34-0.56C79.09,5.56,78.57,5.27,78,5.27h-1.6 c-0.6,0-1.13,0.37-1.35,0.92c-2.19-1.66-5.28-1.47-7.26,0.45c-0.35,0.34-0.65,0.72-0.89,1.14c-0.9-1.62-2.58-2.72-4.5-2.72 c-0.5,0-1.01,0.07-1.48,0.23V3.51c0-0.82-0.66-1.48-1.47-1.48h-1.4c-0.81,0-1.47,0.66-1.47,1.47v3.75 c-0.95-1.36-2.5-2.18-4.17-2.19c-0.74,0-1.46,0.16-2.12,0.47c-0.24-0.17-0.54-0.26-0.84-0.26h-1.4c-0.45,0-0.87,0.21-1.15,0.56 c-0.02-0.03-0.04-0.05-0.07-0.08c-0.28-0.3-0.68-0.47-1.09-0.47h-1.39c-0.3,0-0.6,0.09-0.84,0.26c-0.67-0.3-1.39-0.46-2.12-0.46 c-1.83,0-3.43,1-4.37,2.5c-0.2-0.46-0.48-0.89-0.83-1.25c-0.8-0.81-1.89-1.25-3.02-1.25h-0.01c-0.89,0.01-1.75,0.33-2.46,0.88 c-0.74-0.57-1.64-0.88-2.57-0.88H28.1c-0.29,0-0.58,0.03-0.86,0.11c-0.28,0.06-0.56,0.16-0.82,0.28c-0.21-0.12-0.45-0.18-0.7-0.18 h-1.4c-0.82,0-1.47,0.66-1.47,1.47v7.5c0,0.82,0.66,1.47,1.47,1.47h1.4c0.82,0,1.48-0.66,1.48-1.48l0,0V9.79 c0.03-0.36,0.23-0.59,0.36-0.59c0.18,0,0.38,0.18,0.38,0.47v4.57c0,0.82,0.66,1.47,1.47,1.47h1.41c0.82,0,1.47-0.66,1.47-1.47 l-0.01-4.57c0.06-0.32,0.25-0.47,0.35-0.47c0.18,0,0.38,0.18,0.38,0.47v4.57c0,0.82,0.66,1.47,1.47,1.47h1.41 c0.82,0,1.47-0.66,1.47-1.47v-0.38c0.96,1.29,2.46,2.06,4.06,2.06c0.74,0,1.46-0.16,2.12-0.47c0.24,0.17,0.54,0.26,0.84,0.26h1.39 c0.3,0,0.6-0.09,0.84-0.26v2.01c0,0.82,0.66,1.47,1.47,1.47h1.4c0.82,0,1.47-0.66,1.47-1.47v-1.77c0.48,0.15,0.99,0.23,1.49,0.22 c1.7,0,3.22-0.87,4.17-2.2v0.52c0,0.82,0.66,1.47,1.47,1.47h1.4c0.3,0,0.6-0.09,0.84-0.26c0.66,0.31,1.39,0.47,2.12,0.47 c1.92,0,3.6-1.1,4.49-2.73c1.54,2.65,4.95,3.53,7.58,1.98c0.18-0.11,0.36-0.22,0.53-0.36c0.22,0.55,0.76,0.91,1.35,0.9H78 c0.56,0,1.08-0.29,1.37-0.78l0.37-0.61l0.37,0.61c0.29,0.48,0.81,0.78,1.38,0.78h1.6c0.81,0,1.46-0.66,1.45-1.46 C84.49,14.02,84.44,13.8,84.34,13.59L84.34,13.59z M35.86,14.47h-1.41c-0.13,0-0.23-0.11-0.23-0.23V9.68 c0-0.98-0.74-1.71-1.62-1.71c-0.8,0-1.46,0.7-1.59,1.62l0.01,4.66c0,0.13-0.1,0.23-0.23,0.23h-1.41c-0.13,0-0.23-0.11-0.23-0.23 V9.68c0-0.98-0.74-1.71-1.62-1.71c-0.85,0-1.54,0.79-1.6,1.8v4.48c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23 V6.74c0.01-0.13,0.11-0.22,0.23-0.22h1.4c0.13,0,0.22,0.11,0.23,0.22V7.4c0.5-0.68,1.3-1.09,2.16-1.1h0.03 c1.09,0,2.09,0.6,2.6,1.55c0.45-0.95,1.4-1.55,2.44-1.56c1.62,0,2.93,1.25,2.9,2.78l0.01,5.16C36.09,14.36,35.98,14.46,35.86,14.47 L35.86,14.47z M45.97,14.24c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23V13.5c-0.7,0.76-1.69,1.18-2.72,1.18 c-2.17,0-3.94-1.87-3.94-4.19s1.77-4.19,3.94-4.19c1.03,0,2.02,0.43,2.73,1.18V6.74c0-0.13,0.1-0.23,0.23-0.23h1.4 c0.12-0.01,0.22,0.08,0.23,0.21c0,0.01,0,0.01,0,0.02v7.51h-0.01V14.24z M52.41,14.67c-1.03,0-2.02-0.43-2.73-1.18v3.97 c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.1-0.23-0.23V6.75c0-0.13,0.1-0.22,0.23-0.22h1.4c0.13,0,0.23,0.11,0.23,0.23v0.73 c0.71-0.76,1.7-1.18,2.73-1.18c2.17,0,3.94,1.86,3.94,4.18S54.58,14.67,52.41,14.67z M66.24,11.39c-0.39,1.87-1.96,3.29-3.84,3.29 c-1.03,0-2.02-0.43-2.73-1.18v0.73c0,0.13-0.1,0.23-0.23,0.23h-1.4c-0.13,0-0.23-0.11-0.23-0.23V3.51c0-0.13,0.1-0.23,0.23-0.23 h1.4c0.13,0,0.23,0.11,0.23,0.23v3.97c0.71-0.75,1.7-1.18,2.73-1.17c1.88,0,3.45,1.4,3.84,3.28C66.37,10.19,66.37,10.8,66.24,11.39 L66.24,11.39L66.24,11.39z M71.67,14.68c-2,0.01-3.73-1.35-4.17-3.3c-0.13-0.59-0.13-1.19,0-1.77c0.44-1.94,2.17-3.31,4.17-3.3 c2.36,0,4.26,1.87,4.26,4.19S74.03,14.68,71.67,14.68L71.67,14.68z M83.04,14.47h-1.61c-0.13,0-0.24-0.06-0.3-0.17l-1.44-2.39 l-1.44,2.39c-0.06,0.11-0.18,0.17-0.3,0.17h-1.61c-0.04,0-0.08-0.01-0.12-0.03c-0.09-0.06-0.13-0.19-0.06-0.28l0,0l2.43-3.68 L76.2,6.84c-0.02-0.03-0.03-0.07-0.03-0.12c0-0.12,0.09-0.21,0.21-0.21h1.61c0.13,0,0.24,0.06,0.3,0.17l1.41,2.36l1.41-2.36 c0.06-0.11,0.18-0.17,0.3-0.17h1.61c0.04,0,0.08,0.01,0.12,0.03c0.09,0.06,0.13,0.19,0.06,0.28l0,0l-2.38,3.64l2.43,3.67 c0.02,0.03,0.03,0.07,0.03,0.12C83.25,14.38,83.16,14.47,83.04,14.47L83.04,14.47L83.04,14.47z'/%3E %3Cpath class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' d='M10.5,1.24c-5.11,0-9.25,4.15-9.25,9.25s4.15,9.25,9.25,9.25s9.25-4.15,9.25-9.25 C19.75,5.38,15.61,1.24,10.5,1.24z M14.89,12.77c-1.93,1.93-4.78,2.31-6.7,2.31c-0.7,0-1.41-0.05-2.1-0.16c0,0-1.02-5.64,2.14-8.81 c0.83-0.83,1.95-1.28,3.13-1.28c1.27,0,2.49,0.51,3.39,1.42C16.59,8.09,16.64,11,14.89,12.77z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M10.5-0.01C4.7-0.01,0,4.7,0,10.49s4.7,10.5,10.5,10.5S21,16.29,21,10.49C20.99,4.7,16.3-0.01,10.5-0.01z M10.5,19.74c-5.11,0-9.25-4.15-9.25-9.25s4.14-9.26,9.25-9.26s9.25,4.15,9.25,9.25C19.75,15.61,15.61,19.74,10.5,19.74z'/%3E %3Cpath class='st1' style='opacity:0.35; enable-background:new;' d='M14.74,6.25C12.9,4.41,9.98,4.35,8.23,6.1c-3.16,3.17-2.14,8.81-2.14,8.81s5.64,1.02,8.81-2.14 C16.64,11,16.59,8.09,14.74,6.25z M12.47,10.34l-0.91,1.87l-0.9-1.87L8.8,9.43l1.86-0.9l0.9-1.87l0.91,1.87l1.86,0.9L12.47,10.34z'/%3E %3Cpolygon class='st0' style='opacity:0.9; fill: %23FFFFFF; enable-background: new;' points='14.33,9.43 12.47,10.34 11.56,12.21 10.66,10.34 8.8,9.43 10.66,8.53 11.56,6.66 12.47,8.53 '/%3E%3C/g%3E%3C/svg%3E\");\n}\na.mapboxgl-ctrl-logo.mapboxgl-compact {\n    width: 21px;\n    height: 21px;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 21 21' style='enable-background:new 0 0 21 21;' xml:space='preserve'%3E%3Cg transform='translate(0,0.01)'%3E%3Cpath d='m 10.5,1.24 c -5.11,0 -9.25,4.15 -9.25,9.25 0,5.1 4.15,9.25 9.25,9.25 5.1,0 9.25,-4.15 9.25,-9.25 0,-5.11 -4.14,-9.25 -9.25,-9.25 z m 4.39,11.53 c -1.93,1.93 -4.78,2.31 -6.7,2.31 -0.7,0 -1.41,-0.05 -2.1,-0.16 0,0 -1.02,-5.64 2.14,-8.81 0.83,-0.83 1.95,-1.28 3.13,-1.28 1.27,0 2.49,0.51 3.39,1.42 1.84,1.84 1.89,4.75 0.14,6.52 z' style='opacity:0.9;fill:%23ffffff;enable-background:new' class='st0'/%3E%3Cpath d='M 10.5,-0.01 C 4.7,-0.01 0,4.7 0,10.49 c 0,5.79 4.7,10.5 10.5,10.5 5.8,0 10.5,-4.7 10.5,-10.5 C 20.99,4.7 16.3,-0.01 10.5,-0.01 Z m 0,19.75 c -5.11,0 -9.25,-4.15 -9.25,-9.25 0,-5.1 4.14,-9.26 9.25,-9.26 5.11,0 9.25,4.15 9.25,9.25 0,5.13 -4.14,9.26 -9.25,9.26 z' style='opacity:0.35;enable-background:new' class='st1'/%3E%3Cpath d='M 14.74,6.25 C 12.9,4.41 9.98,4.35 8.23,6.1 5.07,9.27 6.09,14.91 6.09,14.91 c 0,0 5.64,1.02 8.81,-2.14 C 16.64,11 16.59,8.09 14.74,6.25 Z m -2.27,4.09 -0.91,1.87 -0.9,-1.87 -1.86,-0.91 1.86,-0.9 0.9,-1.87 0.91,1.87 1.86,0.9 z' style='opacity:0.35;enable-background:new' class='st1'/%3E%3Cpolygon points='11.56,12.21 10.66,10.34 8.8,9.43 10.66,8.53 11.56,6.66 12.47,8.53 14.33,9.43 12.47,10.34 ' style='opacity:0.9;fill:%23ffffff;enable-background:new' class='st0'/%3E%3C/g%3E%3C/svg%3E\");\n}\n.mapboxgl-ctrl.mapboxgl-ctrl-attrib {\n    padding: 0 5px;\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 0;\n}\n@media screen {\n    .mapboxgl-ctrl-attrib.mapboxgl-compact {\n        padding-top: 2px;\n        padding-bottom: 2px;\n        margin: 0 10px 10px;\n        position: relative;\n        padding-right: 24px;\n        background-color: #fff;\n        border-radius: 3px 12px 12px 3px;\n        visibility: hidden;\n    }\n\n    .mapboxgl-ctrl-attrib.mapboxgl-compact:hover {\n        visibility: visible;\n    }\n\n    .mapboxgl-ctrl-attrib.mapboxgl-compact::after {\n        content: '';\n        cursor: pointer;\n        position: absolute;\n        bottom: 0;\n        right: 0;\n        background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill='%23333333' fill-rule='evenodd' d='M4,10a6,6 0 1,0 12,0a6,6 0 1,0 -12,0 M9,7a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M9,10a1,1 0 1,1 2,0l0,3a1,1 0 1,1 -2,0'/%3E %3C/svg%3E\");\n        background-color: rgba(255, 255, 255, 0.5);\n        width: 24px;\n        height: 24px;\n        box-sizing: border-box;\n        visibility: visible;\n        border-radius: 12px;\n    }\n}\n.mapboxgl-ctrl-attrib a {\n    color: rgba(0, 0, 0, 0.75);\n    text-decoration: none;\n}\n.mapboxgl-ctrl-attrib a:hover {\n    color: inherit;\n    text-decoration: underline;\n}\n/* stylelint-disable-next-line selector-class-pattern */\n.mapboxgl-ctrl-attrib .mapbox-improve-map {\n    font-weight: bold;\n    margin-left: 2px;\n}\n.mapboxgl-attrib-empty {\n    display: none;\n}\n.mapboxgl-ctrl-scale {\n    background-color: rgba(255, 255, 255, 0.75);\n    font-size: 10px;\n    border-width: medium 2px 2px;\n    border-style: none solid solid;\n    border-color: #333;\n    padding: 0 5px;\n    color: #333;\n    box-sizing: border-box;\n}\n.mapboxgl-popup {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: flex;\n    will-change: transform;\n    pointer-events: none;\n}\n.mapboxgl-popup-anchor-top,\n.mapboxgl-popup-anchor-top-left,\n.mapboxgl-popup-anchor-top-right {\n    flex-direction: column;\n}\n.mapboxgl-popup-anchor-bottom,\n.mapboxgl-popup-anchor-bottom-left,\n.mapboxgl-popup-anchor-bottom-right {\n    flex-direction: column-reverse;\n}\n.mapboxgl-popup-anchor-left {\n    flex-direction: row;\n}\n.mapboxgl-popup-anchor-right {\n    flex-direction: row-reverse;\n}\n.mapboxgl-popup-tip {\n    width: 0;\n    height: 0;\n    border: 10px solid transparent;\n    z-index: 1;\n}\n.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {\n    -ms-grid-row-align: center;\n        align-self: center;\n    border-top: none;\n    border-bottom-color: #fff;\n}\n.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {\n    align-self: flex-start;\n    border-top: none;\n    border-left: none;\n    border-bottom-color: #fff;\n}\n.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {\n    align-self: flex-end;\n    border-top: none;\n    border-right: none;\n    border-bottom-color: #fff;\n}\n.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {\n    -ms-grid-row-align: center;\n        align-self: center;\n    border-bottom: none;\n    border-top-color: #fff;\n}\n.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {\n    align-self: flex-start;\n    border-bottom: none;\n    border-left: none;\n    border-top-color: #fff;\n}\n.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {\n    align-self: flex-end;\n    border-bottom: none;\n    border-right: none;\n    border-top-color: #fff;\n}\n.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {\n    -ms-grid-row-align: center;\n        align-self: center;\n    border-left: none;\n    border-right-color: #fff;\n}\n.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {\n    -ms-grid-row-align: center;\n        align-self: center;\n    border-right: none;\n    border-left-color: #fff;\n}\n.mapboxgl-popup-close-button {\n    position: absolute;\n    right: 0;\n    top: 0;\n    border: 0;\n    border-radius: 0 3px 0 0;\n    cursor: pointer;\n    background-color: transparent;\n}\n.mapboxgl-popup-close-button:hover {\n    background-color: rgba(0, 0, 0, 0.05);\n}\n.mapboxgl-popup-content {\n    position: relative;\n    background: #fff;\n    border-radius: 3px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n    padding: 10px 10px 15px;\n    pointer-events: auto;\n}\n.mapboxgl-popup-anchor-top-left .mapboxgl-popup-content {\n    border-top-left-radius: 0;\n}\n.mapboxgl-popup-anchor-top-right .mapboxgl-popup-content {\n    border-top-right-radius: 0;\n}\n.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content {\n    border-bottom-left-radius: 0;\n}\n.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content {\n    border-bottom-right-radius: 0;\n}\n.mapboxgl-marker {\n    position: absolute;\n    top: 0;\n    left: 0;\n    will-change: transform;\n}\n.mapboxgl-user-location-dot {\n    background-color: #1da1f2;\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);\n}\n.mapboxgl-user-location-dot::before {\n    background-color: #1da1f2;\n    content: '';\n    width: 15px;\n    height: 15px;\n    border-radius: 50%;\n    position: absolute;\n    -webkit-animation: mapboxgl-user-location-dot-pulse 2s infinite;\n    animation: mapboxgl-user-location-dot-pulse 2s infinite;\n}\n.mapboxgl-user-location-dot::after {\n    border-radius: 50%;\n    border: 2px solid #fff;\n    content: '';\n    height: 19px;\n    left: -2px;\n    position: absolute;\n    top: -2px;\n    width: 19px;\n    box-sizing: border-box;\n}\n@-webkit-keyframes mapboxgl-user-location-dot-pulse {\n    0%   { -webkit-transform: scale(1); opacity: 1; }\n    70%  { -webkit-transform: scale(3); opacity: 0; }\n    100% { -webkit-transform: scale(1); opacity: 0; }\n}\n@keyframes mapboxgl-user-location-dot-pulse {\n    0%   { -webkit-transform: scale(1); transform: scale(1); opacity: 1; }\n    70%  { -webkit-transform: scale(3); transform: scale(3); opacity: 0; }\n    100% { -webkit-transform: scale(1); transform: scale(1); opacity: 0; }\n}\n.mapboxgl-user-location-dot-stale {\n    background-color: #aaa;\n}\n.mapboxgl-user-location-dot-stale::after {\n    display: none;\n}\n.mapboxgl-crosshair,\n.mapboxgl-crosshair .mapboxgl-interactive,\n.mapboxgl-crosshair .mapboxgl-interactive:active {\n    cursor: crosshair;\n}\n.mapboxgl-boxzoom {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    background: #fff;\n    border: 2px dotted #202020;\n    opacity: 0.5;\n}\n@media print {\n    /* stylelint-disable-next-line selector-class-pattern */\n    .mapbox-improve-map {\n        display: none;\n    }\n}\n/* Basics */\n.mapboxgl-ctrl-geocoder,\n.mapboxgl-ctrl-geocoder *,\n.mapboxgl-ctrl-geocoder *:after,\n.mapboxgl-ctrl-geocoder *:before {\n  box-sizing:border-box;\n  }\n.mapboxgl-ctrl-geocoder {\n  font:15px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  position:relative;\n  background-color:white;\n  width:33.3333%;\n  min-width:240px;\n  max-width:360px;\n  z-index:1;\n  border-radius:3px;\n  }\n.mapboxgl-ctrl-geocoder input[type='text'] {\n  font-size:12px;\n  width:100%;\n  border:0;\n  background-color:transparent;\n  height:40px;\n  margin:0;\n  color:rgba(0,0,0,.5);\n  padding:10px 10px 10px 40px;\n  text-overflow:ellipsis;\n  white-space:nowrap;\n  overflow:hidden;\n  }\n.mapboxgl-ctrl-geocoder input:focus {\n    color:rgba(0,0,0,.75);\n    outline:0;\n    box-shadow:none;\n    outline:thin dotted\\8;\n    }\n.mapboxgl-ctrl-geocoder .geocoder-icon-search {\n  position:absolute;\n  top:10px;\n  left:10px;\n  }\n.mapboxgl-ctrl-geocoder button {\n  padding:0;\n  margin:0;\n  background-color:#fff;\n  border:none;\n  cursor:pointer;\n  }\n.mapboxgl-ctrl-geocoder .geocoder-pin-right * {\n  background-color:#fff;\n  z-index:2;\n  position:absolute;\n  right:10px;\n  top:10px;\n  display:none;\n  }\n.mapboxgl-ctrl-geocoder,\n.mapboxgl-ctrl-geocoder ul {\n  box-shadow: 0 0 0 2px rgba(0,0,0,0.1);\n  }\n/* Suggestions */\n.mapboxgl-ctrl-geocoder ul {\n  background-color:#fff;\n  border-radius: 0 0 3px 3px;\n  left:0;\n  list-style:none;\n  margin:0;\n  padding:0;\n  position:absolute;\n  width:100%;\n  top:100%;\n  z-index:1000;\n  overflow:hidden;\n  font-size:12px;\n  }\n.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl-geocoder ul,\n  .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl-geocoder ul {\n    top:auto;\n    bottom:100%;\n    }\n.mapboxgl-ctrl-geocoder ul > li > a {\n    clear:both;\n    cursor:default;\n    display:block;\n    padding:5px 10px;\n    white-space:nowrap;\n    overflow:hidden;\n    text-overflow:ellipsis;\n    white-space:nowrap;\n    border-bottom:1px solid rgba(0,0,0,0.1);\n    color:#404040;\n    }\n.mapboxgl-ctrl-geocoder ul > li:last-child > a { border-bottom:none; }\n.mapboxgl-ctrl-geocoder ul > li > a:hover {\n      color:#202020;\n      background-color:#f3f3f3;\n      text-decoration:none;\n      cursor:pointer;\n      }\n.mapboxgl-ctrl-geocoder ul > li.active > a {\n      color:#202020;\n      background-color:#e3e3e3;\n      text-decoration:none;\n      cursor:pointer;\n      }\n@-webkit-keyframes rotate { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } }\n@keyframes rotate { from { -webkit-transform: rotate(0deg); transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }\n/* icons */\n.geocoder-icon {\n  display:inline-block;\n  width:20px;\n  height:20px;\n  vertical-align:middle;\n  speak:none;\n  background-repeat:no-repeat;\n  }\n.geocoder-icon-search {\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIj4NCiAgPHBhdGggZD0iTTguNSA0QzYgNCA0IDYgNCA4LjUgNCAxMSA2IDEzIDguNSAxMyA5LjQgMTMgMTAuMiAxMi44IDEwLjggMTIuM0wxMC45IDEyLjMgMTQuMyAxNS43QzE0LjUgMTUuOSAxNC43IDE2IDE1IDE2IDE1LjYgMTYgMTYgMTUuNiAxNiAxNSAxNiAxNC43IDE1LjkgMTQuNSAxNS43IDE0LjNMMTIuMyAxMC45IDEyLjMgMTAuOEMxMi44IDEwLjIgMTMgOS40IDEzIDguNSAxMyA2IDExIDQgOC41IDR6TTguNSA1LjVDMTAuMiA1LjUgMTEuNSA2LjggMTEuNSA4LjUgMTEuNSAxMC4yIDEwLjIgMTEuNSA4LjUgMTEuNSA2LjggMTEuNSA1LjUgMTAuMiA1LjUgOC41IDUuNSA2LjggNi44IDUuNSA4LjUgNS41eiIgZmlsbD0iIzAwMCIvPg0KPC9zdmc+);\n    }\n.geocoder-icon-close {\n    background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjIwIiB3aWR0aD0iMjAiPg0KICA8cGF0aCBkPSJtNSA1IDAgMS41IDMuNSAzLjUtMy41IDMuNSAwIDEuNSAxLjUgMCAzLjUtMy41IDMuNSAzLjUgMS41IDAgMC0xLjUtMy41LTMuNSAzLjUtMy41IDAtMS41LTEuNSAwLTMuNSAzLjUtMy41LTMuNS0xLjUgMHoiIGZpbGw9IiMwMDAiLz4NCjwvc3ZnPg==);\n    }\n.geocoder-icon-loading {\n    background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPjxwYXRoIGQ9Im0xMCAyIDAgMy4zYzIuNiAwIDQuNyAyLjEgNC43IDQuN2wzLjMgMGMwLTQuNC0zLjYtOC04LTh6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEwIDJDNi44IDIgMy43IDQuMSAyLjYgNy4xIDEuNCAxMCAyLjEgMTMuNiA0LjUgMTUuOGMyLjQgMi40IDYuNCAyLjkgOS40IDEuMiAyLjUtMS40IDQuMi00LjIgNC4yLTctMS4xIDAtMi4yIDAtMy4zIDAgMC4xIDIuMi0xLjcgNC4zLTMuOCA0LjZDOC43IDE1IDYuNCAxMy44IDUuNyAxMS43IDQuOCA5LjcgNS42IDcuMSA3LjYgNiA4LjMgNS42IDkuMSA1LjMgMTAgNS4zYzAtMS4xIDAtMi4yIDAtMy4zeiIgc3R5bGU9ImZpbGw6IzAwMDtvcGFjaXR5OjAuMiIvPjwvc3ZnPg==);\n    -webkit-animation: rotate 400ms linear infinite;\n            animation: rotate 400ms linear infinite;\n    }\n:root {\n  /** primary **/\n  --ion-color-primary: $app-color-primary;\n  --ion-color-primary-rgb: 72,138,255;\n  --ion-color-primary-contrast: #fff;\n  --ion-color-primary-contrast-rgb: 255,255,255;\n  --ion-color-primary-shade: #3f79e0;\n  --ion-color-primary-tint: #5a96ff;\n  /** secondary **/\n  --ion-color-secondary: $app-color-accent;\n  --ion-color-secondary-rgb: 50,219,100;\n  --ion-color-secondary-contrast: #fff;\n  --ion-color-secondary-contrast-rgb: 255,255,255;\n  --ion-color-secondary-shade: #2cc158;\n  --ion-color-secondary-tint: #47df74;\n  /** tertiary **/\n  --ion-color-tertiary: #f4a942;\n  --ion-color-tertiary-rgb: 244,169,66;\n  --ion-color-tertiary-contrast: #fff;\n  --ion-color-tertiary-contrast-rgb: 255,255,255;\n  --ion-color-tertiary-shade: #d7953a;\n  --ion-color-tertiary-tint: #f5b255;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16,220,96;\n  --ion-color-success-contrast: #fff;\n  --ion-color-success-contrast-rgb: 255,255,255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255,206,0;\n  --ion-color-warning-contrast: #000;\n  --ion-color-warning-contrast-rgb: 0,0,0;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f53d3d;\n  --ion-color-danger-rgb: 245,61,61;\n  --ion-color-danger-contrast: #fff;\n  --ion-color-danger-contrast-rgb: 255,255,255;\n  --ion-color-danger-shade: #d83636;\n  --ion-color-danger-tint: #f65050;\n  /** light **/\n  --ion-color-light: #f4f4f4;\n  --ion-color-light-rgb: 244,244,244;\n  --ion-color-light-contrast: #000;\n  --ion-color-light-contrast-rgb: 0,0,0;\n  --ion-color-light-shade: #d7d7d7;\n  --ion-color-light-tint: #f5f5f5;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152,154,162;\n  --ion-color-medium-contrast: #000;\n  --ion-color-medium-contrast-rgb: 0,0,0;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** dark **/\n  --ion-color-dark: $app-color-dark;\n  --ion-color-dark-rgb: 34,34,34;\n  --ion-color-dark-contrast: #fff;\n  --ion-color-dark-contrast-rgb: 255,255,255;\n  --ion-color-dark-shade: #1e1e1e;\n  --ion-color-dark-tint: #383838; }\n/**\n * The following are shared across all platforms and apps\n */\n/**\n * Shared across all platforms and apps\n * You may define a set of global variables accessible across entire workspace here\n */\n/*\nToDo: Figure this out\n$gm-text-wrap-header-4:           @include ellipsis;\n$gm-text-wrap-header-3:           @include ellipsis;\n$gm-text-wrap-header-2:           normal;\n$gm-text-wrap-header-1:           normal;\n$gm-text-wrap-headline:           normal;\n$gm-text-wrap-title:              @include ellipsis;\n$gm-text-wrap-subhead:            normal;\n$gm-text-wrap-body:               normal;\n$gm-text-wrap-caption:            @include ellipsis;\n$gm-text-wrap-button:             @include ellipsis;\n*/\n/**\n * The following are web specific (used with any web app targets)\n */\n/**\n * Convenient spacing classes\n * These match what is found from nativescript-theme-core but adapt them for web usage\n */\n/**\n * Margin and Padding\n * The following creates this pattern:\n * .m-0{margin:0}.m-t-0{margin-top:0}.m-r-0{margin-right:0}.m-b-0{margin-bottom:0}.m-l-0{margin-left:0}.m-x-0{margin-right:0;margin-left:0}.m-y-0{margin-top:0;margin-bottom:0}\n * Same for Padding (using the 'p' abbreviation)\n * From 0, 2, 5, 10, 15, 20, 25, 30\n**/\n.m-0 {\n  margin: 0px; }\n.m-t-0 {\n  margin-top: 0px; }\n.m-r-0 {\n  margin-right: 0px; }\n.m-b-0 {\n  margin-bottom: 0px; }\n.m-l-0 {\n  margin-left: 0px; }\n.m-x-0 {\n  margin-right: 0px;\n  margin-left: 0px; }\n.m-y-0 {\n  margin-top: 0px;\n  margin-bottom: 0px; }\n.m-2 {\n  margin: 2px; }\n.m-t-2 {\n  margin-top: 2px; }\n.m-r-2 {\n  margin-right: 2px; }\n.m-b-2 {\n  margin-bottom: 2px; }\n.m-l-2 {\n  margin-left: 2px; }\n.m-x-2 {\n  margin-right: 2px;\n  margin-left: 2px; }\n.m-y-2 {\n  margin-top: 2px;\n  margin-bottom: 2px; }\n.m-4 {\n  margin: 4px; }\n.m-t-4 {\n  margin-top: 4px; }\n.m-r-4 {\n  margin-right: 4px; }\n.m-b-4 {\n  margin-bottom: 4px; }\n.m-l-4 {\n  margin-left: 4px; }\n.m-x-4 {\n  margin-right: 4px;\n  margin-left: 4px; }\n.m-y-4 {\n  margin-top: 4px;\n  margin-bottom: 4px; }\n.m-5 {\n  margin: 5px; }\n.m-t-5 {\n  margin-top: 5px; }\n.m-r-5 {\n  margin-right: 5px; }\n.m-b-5 {\n  margin-bottom: 5px; }\n.m-l-5 {\n  margin-left: 5px; }\n.m-x-5 {\n  margin-right: 5px;\n  margin-left: 5px; }\n.m-y-5 {\n  margin-top: 5px;\n  margin-bottom: 5px; }\n.m-8 {\n  margin: 8px; }\n.m-t-8 {\n  margin-top: 8px; }\n.m-r-8 {\n  margin-right: 8px; }\n.m-b-8 {\n  margin-bottom: 8px; }\n.m-l-8 {\n  margin-left: 8px; }\n.m-x-8 {\n  margin-right: 8px;\n  margin-left: 8px; }\n.m-y-8 {\n  margin-top: 8px;\n  margin-bottom: 8px; }\n.m-10 {\n  margin: 10px; }\n.m-t-10 {\n  margin-top: 10px; }\n.m-r-10 {\n  margin-right: 10px; }\n.m-b-10 {\n  margin-bottom: 10px; }\n.m-l-10 {\n  margin-left: 10px; }\n.m-x-10 {\n  margin-right: 10px;\n  margin-left: 10px; }\n.m-y-10 {\n  margin-top: 10px;\n  margin-bottom: 10px; }\n.m-12 {\n  margin: 12px; }\n.m-t-12 {\n  margin-top: 12px; }\n.m-r-12 {\n  margin-right: 12px; }\n.m-b-12 {\n  margin-bottom: 12px; }\n.m-l-12 {\n  margin-left: 12px; }\n.m-x-12 {\n  margin-right: 12px;\n  margin-left: 12px; }\n.m-y-12 {\n  margin-top: 12px;\n  margin-bottom: 12px; }\n.m-15 {\n  margin: 15px; }\n.m-t-15 {\n  margin-top: 15px; }\n.m-r-15 {\n  margin-right: 15px; }\n.m-b-15 {\n  margin-bottom: 15px; }\n.m-l-15 {\n  margin-left: 15px; }\n.m-x-15 {\n  margin-right: 15px;\n  margin-left: 15px; }\n.m-y-15 {\n  margin-top: 15px;\n  margin-bottom: 15px; }\n.m-16 {\n  margin: 16px; }\n.m-t-16 {\n  margin-top: 16px; }\n.m-r-16 {\n  margin-right: 16px; }\n.m-b-16 {\n  margin-bottom: 16px; }\n.m-l-16 {\n  margin-left: 16px; }\n.m-x-16 {\n  margin-right: 16px;\n  margin-left: 16px; }\n.m-y-16 {\n  margin-top: 16px;\n  margin-bottom: 16px; }\n.m-20 {\n  margin: 20px; }\n.m-t-20 {\n  margin-top: 20px; }\n.m-r-20 {\n  margin-right: 20px; }\n.m-b-20 {\n  margin-bottom: 20px; }\n.m-l-20 {\n  margin-left: 20px; }\n.m-x-20 {\n  margin-right: 20px;\n  margin-left: 20px; }\n.m-y-20 {\n  margin-top: 20px;\n  margin-bottom: 20px; }\n.m-24 {\n  margin: 24px; }\n.m-t-24 {\n  margin-top: 24px; }\n.m-r-24 {\n  margin-right: 24px; }\n.m-b-24 {\n  margin-bottom: 24px; }\n.m-l-24 {\n  margin-left: 24px; }\n.m-x-24 {\n  margin-right: 24px;\n  margin-left: 24px; }\n.m-y-24 {\n  margin-top: 24px;\n  margin-bottom: 24px; }\n.m-25 {\n  margin: 25px; }\n.m-t-25 {\n  margin-top: 25px; }\n.m-r-25 {\n  margin-right: 25px; }\n.m-b-25 {\n  margin-bottom: 25px; }\n.m-l-25 {\n  margin-left: 25px; }\n.m-x-25 {\n  margin-right: 25px;\n  margin-left: 25px; }\n.m-y-25 {\n  margin-top: 25px;\n  margin-bottom: 25px; }\n.m-28 {\n  margin: 28px; }\n.m-t-28 {\n  margin-top: 28px; }\n.m-r-28 {\n  margin-right: 28px; }\n.m-b-28 {\n  margin-bottom: 28px; }\n.m-l-28 {\n  margin-left: 28px; }\n.m-x-28 {\n  margin-right: 28px;\n  margin-left: 28px; }\n.m-y-28 {\n  margin-top: 28px;\n  margin-bottom: 28px; }\n.m-30 {\n  margin: 30px; }\n.m-t-30 {\n  margin-top: 30px; }\n.m-r-30 {\n  margin-right: 30px; }\n.m-b-30 {\n  margin-bottom: 30px; }\n.m-l-30 {\n  margin-left: 30px; }\n.m-x-30 {\n  margin-right: 30px;\n  margin-left: 30px; }\n.m-y-30 {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n.p-0 {\n  padding: 0px; }\n.p-t-0 {\n  padding-top: 0px; }\n.p-r-0 {\n  padding-right: 0px; }\n.p-b-0 {\n  padding-bottom: 0px; }\n.p-l-0 {\n  padding-left: 0px; }\n.p-x-0 {\n  padding-right: 0px;\n  padding-left: 0px; }\n.p-y-0 {\n  padding-top: 0px;\n  padding-bottom: 0px; }\n.p-2 {\n  padding: 2px; }\n.p-t-2 {\n  padding-top: 2px; }\n.p-r-2 {\n  padding-right: 2px; }\n.p-b-2 {\n  padding-bottom: 2px; }\n.p-l-2 {\n  padding-left: 2px; }\n.p-x-2 {\n  padding-right: 2px;\n  padding-left: 2px; }\n.p-y-2 {\n  padding-top: 2px;\n  padding-bottom: 2px; }\n.p-4 {\n  padding: 4px; }\n.p-t-4 {\n  padding-top: 4px; }\n.p-r-4 {\n  padding-right: 4px; }\n.p-b-4 {\n  padding-bottom: 4px; }\n.p-l-4 {\n  padding-left: 4px; }\n.p-x-4 {\n  padding-right: 4px;\n  padding-left: 4px; }\n.p-y-4 {\n  padding-top: 4px;\n  padding-bottom: 4px; }\n.p-5 {\n  padding: 5px; }\n.p-t-5 {\n  padding-top: 5px; }\n.p-r-5 {\n  padding-right: 5px; }\n.p-b-5 {\n  padding-bottom: 5px; }\n.p-l-5 {\n  padding-left: 5px; }\n.p-x-5 {\n  padding-right: 5px;\n  padding-left: 5px; }\n.p-y-5 {\n  padding-top: 5px;\n  padding-bottom: 5px; }\n.p-8 {\n  padding: 8px; }\n.p-t-8 {\n  padding-top: 8px; }\n.p-r-8 {\n  padding-right: 8px; }\n.p-b-8 {\n  padding-bottom: 8px; }\n.p-l-8 {\n  padding-left: 8px; }\n.p-x-8 {\n  padding-right: 8px;\n  padding-left: 8px; }\n.p-y-8 {\n  padding-top: 8px;\n  padding-bottom: 8px; }\n.p-10 {\n  padding: 10px; }\n.p-t-10 {\n  padding-top: 10px; }\n.p-r-10 {\n  padding-right: 10px; }\n.p-b-10 {\n  padding-bottom: 10px; }\n.p-l-10 {\n  padding-left: 10px; }\n.p-x-10 {\n  padding-right: 10px;\n  padding-left: 10px; }\n.p-y-10 {\n  padding-top: 10px;\n  padding-bottom: 10px; }\n.p-12 {\n  padding: 12px; }\n.p-t-12 {\n  padding-top: 12px; }\n.p-r-12 {\n  padding-right: 12px; }\n.p-b-12 {\n  padding-bottom: 12px; }\n.p-l-12 {\n  padding-left: 12px; }\n.p-x-12 {\n  padding-right: 12px;\n  padding-left: 12px; }\n.p-y-12 {\n  padding-top: 12px;\n  padding-bottom: 12px; }\n.p-15 {\n  padding: 15px; }\n.p-t-15 {\n  padding-top: 15px; }\n.p-r-15 {\n  padding-right: 15px; }\n.p-b-15 {\n  padding-bottom: 15px; }\n.p-l-15 {\n  padding-left: 15px; }\n.p-x-15 {\n  padding-right: 15px;\n  padding-left: 15px; }\n.p-y-15 {\n  padding-top: 15px;\n  padding-bottom: 15px; }\n.p-16 {\n  padding: 16px; }\n.p-t-16 {\n  padding-top: 16px; }\n.p-r-16 {\n  padding-right: 16px; }\n.p-b-16 {\n  padding-bottom: 16px; }\n.p-l-16 {\n  padding-left: 16px; }\n.p-x-16 {\n  padding-right: 16px;\n  padding-left: 16px; }\n.p-y-16 {\n  padding-top: 16px;\n  padding-bottom: 16px; }\n.p-20 {\n  padding: 20px; }\n.p-t-20 {\n  padding-top: 20px; }\n.p-r-20 {\n  padding-right: 20px; }\n.p-b-20 {\n  padding-bottom: 20px; }\n.p-l-20 {\n  padding-left: 20px; }\n.p-x-20 {\n  padding-right: 20px;\n  padding-left: 20px; }\n.p-y-20 {\n  padding-top: 20px;\n  padding-bottom: 20px; }\n.p-24 {\n  padding: 24px; }\n.p-t-24 {\n  padding-top: 24px; }\n.p-r-24 {\n  padding-right: 24px; }\n.p-b-24 {\n  padding-bottom: 24px; }\n.p-l-24 {\n  padding-left: 24px; }\n.p-x-24 {\n  padding-right: 24px;\n  padding-left: 24px; }\n.p-y-24 {\n  padding-top: 24px;\n  padding-bottom: 24px; }\n.p-25 {\n  padding: 25px; }\n.p-t-25 {\n  padding-top: 25px; }\n.p-r-25 {\n  padding-right: 25px; }\n.p-b-25 {\n  padding-bottom: 25px; }\n.p-l-25 {\n  padding-left: 25px; }\n.p-x-25 {\n  padding-right: 25px;\n  padding-left: 25px; }\n.p-y-25 {\n  padding-top: 25px;\n  padding-bottom: 25px; }\n.p-28 {\n  padding: 28px; }\n.p-t-28 {\n  padding-top: 28px; }\n.p-r-28 {\n  padding-right: 28px; }\n.p-b-28 {\n  padding-bottom: 28px; }\n.p-l-28 {\n  padding-left: 28px; }\n.p-x-28 {\n  padding-right: 28px;\n  padding-left: 28px; }\n.p-y-28 {\n  padding-top: 28px;\n  padding-bottom: 28px; }\n.p-30 {\n  padding: 30px; }\n.p-t-30 {\n  padding-top: 30px; }\n.p-r-30 {\n  padding-right: 30px; }\n.p-b-30 {\n  padding-bottom: 30px; }\n.p-l-30 {\n  padding-left: 30px; }\n.p-x-30 {\n  padding-right: 30px;\n  padding-left: 30px; }\n.p-y-30 {\n  padding-top: 30px;\n  padding-bottom: 30px; }\n/**\n * Element tag overrides\n */\nbody {\n  padding: 0;\n  margin: 0; }\n/**\n * The following are Ionic specific\n */\nbody {\n  padding-top: constant(safe-area-inset-top);\n  padding-top: env(safe-area-inset-top); }\n@font-face {\n  font-family: \"Font Awesome\";\n  src: url('font-awesome.ttf'); }\n@font-face {\n  font-family: \"Ionicons 2\";\n  src: url('ionicons.eot') format(\"embedded-opentype\"), url('ionicons.ttf') format(\"truetype\"), url('ionicons.woff') format(\"woff\"), url('ionicons.svg') format(\"svg\"); }\n@font-face {\n  font-family: \"Firefly\";\n  src: url(data:font/ttf;base64,AAEAAAANAIAAAwBQRkZUTXDrmmQAAAYgAAAAHEdERUYAMQAGAAAGAAAAACBPUy8yT/hcoQAAAVgAAABWY21hcAPWA1wAAAHAAAABSmdhc3D//wADAAAF+AAAAAhnbHlmjmLFbgAAAxgAAADEaGVhZAXLOI8AAADcAAAANmhoZWEEJwIFAAABFAAAACRobXR4BgAAAQAAAbAAAAAQbG9jYQBiAAAAAAMMAAAACm1heHAASgBIAAABOAAAACBuYW1l4zhgtwAAA9wAAAHmcG9zdOh3epsAAAXEAAAAMQABAAAAAQAAUXPEy18PPPUACwIAAAAAANJW+8oAAAAA0lb7ygABAAQB/gH6AAAACAACAAAAAAAAAAEAAAH6AAAALgIAAAAAAAH+AAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAEAEUABAAAAAAAAgAAAAEAAQAAAEAAAAAAAAAAAQIAAZAABQAIAUwBZgAAAEcBTAFmAAAA9QAZAIQAAAIABQkAAAAAAAAAAAABAAAAAAAAAAAAAAAAUGZFZABAAGIAYgHg/+AALgH6//wAAAABAAAAAAAAAgAAAAAAAAACAAAAAgAAAQAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAgAAAGL//wAAAAAAYv//AAD/oQABAAAAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYgAAAAQAAQAEAf4B+gAVACoAOABEAAABMhYVFCsBIjU0JiMiBwYnLgEnJjc2JzY1NCYjIj0BNDMyFhUUBwYnJicmDwEnLgEnIzc2MzIWFRQnMhYVFAYjIiY1NDYBoyY1BA4FJx0bEgQDAQYCAgMZNwonHAUFJjUPAwQBCgUMBAEJSDEEAh09KTzcPFVVPD1VVQFzNSYEBBwoEgQFAgcCBAIXBxAVHCcFDgU2JR0VBQQBBwLDAgUyRwkENjsqPVdVPD1VVT08VQAAAAwAlgABAAAAAAABAA8AIAABAAAAAAACAAYAPgABAAAAAAADACwAnwABAAAAAAAEAA8A7AABAAAAAAAFAAsBFAABAAAAAAAGAA8BQAADAAEECQABAB4AAAADAAEECQACAAwAMAADAAEECQADAFgARQADAAEECQAEAB4AzAADAAEECQAFABYA/AADAAEECQAGAB4BIAB1AG4AdABpAHQAbABlAGQALQBmAG8AbgB0AC0AMQAAdW50aXRsZWQtZm9udC0xAABmAG8AbgB0AC0AMQAAZm9udC0xAABGAG8AbgB0AEYAbwByAGcAZQAgADIALgAwACAAOgAgAHUAbgB0AGkAdABsAGUAZAAtAGYAbwBuAHQALQAxACAAOgAgADIAOAAtADEAMAAtADIAMAAxADUAAEZvbnRGb3JnZSAyLjAgOiB1bnRpdGxlZC1mb250LTEgOiAyOC0xMC0yMDE1AAB1AG4AdABpAHQAbABlAGQALQBmAG8AbgB0AC0AMQAAdW50aXRsZWQtZm9udC0xAABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAAB1AG4AdABpAHQAbABlAGQALQBmAG8AbgB0AC0AMQAAdW50aXRsZWQtZm9udC0xAAAAAAIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAABAAAAAEAAgECBmZvbnQyeAAAAAAAAAH//wACAAEAAAAOAAAAGAAAAAAAAgABAAMAAwABAAQAAAACAAAAAAABAAAAAMw9os8AAAAA0lb7ygAAAADSVvvK); }\n/**\n * Shared across all platforms and apps\n * You may define a set of global variables accessible across entire workspace here\n */\n/*\nToDo: Figure this out\n$gm-text-wrap-header-4:           @include ellipsis;\n$gm-text-wrap-header-3:           @include ellipsis;\n$gm-text-wrap-header-2:           normal;\n$gm-text-wrap-header-1:           normal;\n$gm-text-wrap-headline:           normal;\n$gm-text-wrap-title:              @include ellipsis;\n$gm-text-wrap-subhead:            normal;\n$gm-text-wrap-body:               normal;\n$gm-text-wrap-caption:            @include ellipsis;\n$gm-text-wrap-button:             @include ellipsis;\n*/\nion-header ion-toolbar {\n  --padding-top: 20px; }\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/theme/variables.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./node_modules/sass-loader/lib/loader.js??ref--15-3!./src/theme/variables.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Shared across all platforms and apps\n * You may define a set of global variables accessible across entire workspace here\n */\n/*\nToDo: Figure this out\n$gm-text-wrap-header-4:           @include ellipsis;\n$gm-text-wrap-header-3:           @include ellipsis;\n$gm-text-wrap-header-2:           normal;\n$gm-text-wrap-header-1:           normal;\n$gm-text-wrap-headline:           normal;\n$gm-text-wrap-title:              @include ellipsis;\n$gm-text-wrap-subhead:            normal;\n$gm-text-wrap-body:               normal;\n$gm-text-wrap-caption:            @include ellipsis;\n$gm-text-wrap-button:             @include ellipsis;\n*/\n/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: $app-color-primary;\n  --ion-color-primary-rgb: 72,138,255;\n  --ion-color-primary-contrast: #fff;\n  --ion-color-primary-contrast-rgb: 255,255,255;\n  --ion-color-primary-shade: #3f79e0;\n  --ion-color-primary-tint: #5a96ff;\n  /** secondary **/\n  --ion-color-secondary: $app-color-accent;\n  --ion-color-secondary-rgb: 50,219,100;\n  --ion-color-secondary-contrast: #fff;\n  --ion-color-secondary-contrast-rgb: 255,255,255;\n  --ion-color-secondary-shade: #2cc158;\n  --ion-color-secondary-tint: #47df74;\n  /** tertiary **/\n  --ion-color-tertiary: #f4a942;\n  --ion-color-tertiary-rgb: 244,169,66;\n  --ion-color-tertiary-contrast: #fff;\n  --ion-color-tertiary-contrast-rgb: 255,255,255;\n  --ion-color-tertiary-shade: #d7953a;\n  --ion-color-tertiary-tint: #f5b255;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16,220,96;\n  --ion-color-success-contrast: #fff;\n  --ion-color-success-contrast-rgb: 255,255,255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255,206,0;\n  --ion-color-warning-contrast: #000;\n  --ion-color-warning-contrast-rgb: 0,0,0;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f53d3d;\n  --ion-color-danger-rgb: 245,61,61;\n  --ion-color-danger-contrast: #fff;\n  --ion-color-danger-contrast-rgb: 255,255,255;\n  --ion-color-danger-shade: #d83636;\n  --ion-color-danger-tint: #f65050;\n  /** light **/\n  --ion-color-light: #f4f4f4;\n  --ion-color-light-rgb: 244,244,244;\n  --ion-color-light-contrast: #000;\n  --ion-color-light-contrast-rgb: 0,0,0;\n  --ion-color-light-shade: #d7d7d7;\n  --ion-color-light-tint: #f5f5f5;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152,154,162;\n  --ion-color-medium-contrast: #000;\n  --ion-color-medium-contrast-rgb: 0,0,0;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** dark **/\n  --ion-color-dark: $app-color-dark;\n  --ion-color-dark-rgb: 34,34,34;\n  --ion-color-dark-contrast: #fff;\n  --ion-color-dark-contrast-rgb: 255,255,255;\n  --ion-color-dark-shade: #1e1e1e;\n  --ion-color-dark-tint: #383838; }\n"

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/global.scss":
/*!*************************!*\
  !*** ./src/global.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/raw-loader!../node_modules/postcss-loader/lib??embedded!../node_modules/sass-loader/lib/loader.js??ref--15-3!./global.scss */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/global.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/theme/variables.scss":
/*!**********************************!*\
  !*** ./src/theme/variables.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/raw-loader!../../node_modules/postcss-loader/lib??embedded!../../node_modules/sass-loader/lib/loader.js??ref--15-3!./variables.scss */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/theme/variables.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 2:
/*!**********************************************************!*\
  !*** multi ./src/theme/variables.scss ./src/global.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/andredavcev/Files/Theory/apps/ionic-firefly/src/theme/variables.scss */"./src/theme/variables.scss");
module.exports = __webpack_require__(/*! /Users/andredavcev/Files/Theory/apps/ionic-firefly/src/global.scss */"./src/global.scss");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map